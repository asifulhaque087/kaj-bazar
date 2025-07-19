import { handleAsync } from "@fvoid/shared-lib";
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
import type { InferInsertModel } from "drizzle-orm";
import type { Request, Response } from "express";

// Define the insert types for Drizzle
type NewSeller = InferInsertModel<typeof SellersTable>;
type NewLanguage = InferInsertModel<typeof LanguagesTable>;
type NewSkill = InferInsertModel<typeof SkillsTable>;
type NewExperience = InferInsertModel<typeof ExperiencesTable>;
type NewEducation = InferInsertModel<typeof EducationsTable>;
type NewSocialLink = InferInsertModel<typeof SocialLinksTable>;
type NewCertificate = InferInsertModel<typeof CertificatesTable>;

const createSeller = async (req: Request, res: Response) => {
  // extract the data

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

  // 1. Start a transaction
  // This ensures that if any part of the insertion fails, all changes are rolled back.
  const result = await handleAsync(
    db.transaction(async (tx) => {
      // 2. Insert into the main 'sellers' table first
      // We need the ID of the newly created seller to link the related data.
      const [newSeller] = await tx
        .insert(SellersTable)
        .values({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          profilePicture: formData.profilePicture,
          description: formData.description,
          // profilePublicId: formData.profilePublicId,
          oneliner: formData.oneliner,
          country: formData.country,
          // ratingCategories will use its default value if not provided, or you can send it if the form allows
          // ratingsCount, ratingSum, responseTime, recentDelivery, ongoingJobs, completedJobs, cancelledJobs, totalEarnings, totalGigs
          // will use their default values
        })
        .returning({ id: SellersTable.id }); // Crucially, return the ID of the new seller

      if (!newSeller) {
        throw new Error("Failed to create seller");
      }

      const sellerId = newSeller.id;

      // 3. Insert into related tables for arrays of objects
      // For each array, map the data to the Drizzle schema and insert in bulk.

      // Languages
      if (formData.languages && formData.languages.length > 0) {
        const languagesToInsert: NewLanguage[] = formData.languages.map(
          (lang) => ({
            sellerId: sellerId,
            language: lang.language,
            level: lang.level,
          })
        );
        await tx.insert(LanguagesTable).values(languagesToInsert);
      }

      // Skills
      if (formData.skills && formData.skills.length > 0) {
        const skillsToInsert: NewSkill[] = formData.skills.map((skill) => ({
          sellerId: sellerId,
          skill: skill,
        }));
        await tx.insert(SkillsTable).values(skillsToInsert);
      }

      // Experience
      if (formData.experience && formData.experience.length > 0) {
        const experienceToInsert: NewExperience[] = formData.experience.map(
          (exp) => ({
            sellerId: sellerId,
            company: exp.company,
            title: exp.title,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description,
            currentlyWorkingHere: exp.currentlyWorkingHere,
          })
        );
        await tx.insert(ExperiencesTable).values(experienceToInsert);
      }

      // Education
      if (formData.education && formData.education.length > 0) {
        const educationToInsert: NewEducation[] = formData.education.map(
          (edu) => ({
            sellerId: sellerId,
            country: edu.country,
            university: edu.university,
            title: edu.title,
            major: edu.major,
            year: edu.year,
          })
        );
        await tx.insert(EducationsTable).values(educationToInsert);
      }

      // Social Links
      if (formData.socialLinks && formData.socialLinks.length > 0) {
        const socialLinksToInsert: NewSocialLink[] = formData.socialLinks.map(
          (sl) => ({
            sellerId: sellerId,
            platform: sl.platform,
            link: sl.link,
          })
        );
        await tx.insert(SocialLinksTable).values(socialLinksToInsert);
      }

      // Certificates
      if (formData.certificates && formData.certificates.length > 0) {
        const certificatesToInsert: NewCertificate[] =
          formData.certificates.map((cert) => ({
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

  // console.log("Seller and related data inserted successfully:", result.id);

  return res.json({ message: "Seller Created Successfully" });

  // return result;

  // return res.json({ m: "I am from create seller" });
};

export default createSeller;
