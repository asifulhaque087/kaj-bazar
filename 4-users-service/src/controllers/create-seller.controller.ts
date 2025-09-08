import { ConnectionError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import {
  CertificatesTable,
  EducationsTable,
  ExperiencesTable,
  LanguagesTable,
  SellersTable,
  SkillsTable,
  SocialLinksTable,
} from "@src/drizzle/schemas";
import type { CreateSellerInput } from "@src/validations/create-serller.validation";
import { eq, or } from "drizzle-orm";
import type { Request, Response } from "express";

const createSeller = async (req: Request, res: Response) => {
  // extract the data

  // return res.json({ m: " Iam from create seller !!!!" });

  // const {
  //   fullName,
  //   username,
  //   email,
  //   profilePicture,
  //   description,
  //   oneliner,
  //   country,
  // } = req.body as CreateSellerInput;

  const formData = req.body as CreateSellerInput;

  console.log("I am from ********************************** ", formData);

  // 1. Start a transaction
  // This ensures that if any part of the insertion fails, all changes are rolled back.
  const result = await handleAsync(
    db.transaction(async (tx) => {
      // 2. Insert into the main 'sellers' table first
      // We need the ID of the newly created seller to link the related data.

      // ** --- create seller ---

      const check = await handleAsync(
        db
          .select()
          .from(SellersTable)
          .where(
            or(
              eq(SellersTable.username, formData.username),
              eq(SellersTable.email, formData.email)
            )
          )
          .limit(1)
          .then((res) => res[0])
      );

      console.log("check is ", check);

      const [newSeller] = await tx
        .insert(SellersTable)
        .values({
          id: formData.id,
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          profilePicture: formData.profilePicture,
          description: formData.description,
          oneliner: formData.oneliner,
          country: formData.country,
        })
        .returning({ id: SellersTable.id });

      if (!newSeller) throw new ConnectionError("Database connection error");

      const sellerId = newSeller.id;

      // ** ---insert languages ---
      if (formData.languages && formData.languages.length > 0) {
        const languagesToInsert = formData.languages.map((lang) => ({
          sellerId: sellerId,
          language: lang.language,
          level: lang.level,
        }));
        await tx.insert(LanguagesTable).values(languagesToInsert);
      }

      // ** --- Skills ---
      if (formData.skills && formData.skills.length > 0) {
        const skillsToInsert = formData.skills.map((skill) => ({
          sellerId: sellerId,
          name: skill.name,
        }));
        await tx.insert(SkillsTable).values(skillsToInsert);
      }

      // ** --- insert experience ----
      if (formData.experience && formData.experience.length > 0) {
        const experienceToInsert = formData.experience.map((exp) => ({
          sellerId: sellerId,
          company: exp.company,
          title: exp.title,
          startDate: exp.startDate,
          endDate: exp.endDate,
          description: exp.description,
          currentlyWorkingHere: exp.currentlyWorkingHere,
        }));
        await tx.insert(ExperiencesTable).values(experienceToInsert);
      }

      // ** --- insert education ---
      if (formData.education && formData.education.length > 0) {
        const educationToInsert = formData.education.map((edu) => ({
          sellerId: sellerId,
          country: edu.country,
          university: edu.university,
          title: edu.title,
          major: edu.major,
          year: edu.year,
        }));
        await tx.insert(EducationsTable).values(educationToInsert);
      }

      // ** ---craete social links ---
      if (formData.socialLinks && formData.socialLinks.length > 0) {
        const socialLinksToInsert = formData.socialLinks.map((sl) => ({
          sellerId: sellerId,
          platform: sl.platform,
          link: sl.link,
        }));
        await tx.insert(SocialLinksTable).values(socialLinksToInsert);
      }

      // ** --- create certificates ---
      if (formData.certificates && formData.certificates.length > 0) {
        const certificatesToInsert = formData.certificates.map((cert) => ({
          sellerId: sellerId,
          name: cert.name,
          from: cert.from,
          year: cert.year,
        }));
        await tx.insert(CertificatesTable).values(certificatesToInsert);
      }

      // Return the ID of the newly created seller
      return { id: sellerId };
    })
  );

  return res.json({ message: "Seller Created Successfully" });

  // return result;

  // return res.json({ m: "I am from create seller" });
};

export default createSeller;
