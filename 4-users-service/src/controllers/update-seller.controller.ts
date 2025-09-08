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
import type { UpdateSellerInput } from "@src/validations/update-seller.validation";
import { eq, inArray, sql } from "drizzle-orm";
import type { Request, Response } from "express";

const updateSeller = async (req: Request, res: Response) => {
  const formData = req.body as UpdateSellerInput;

  const result = await handleAsync(
    db.transaction(async (tx) => {
      // ** ---process seller---

      // update seller
      await handleAsync(
        tx
          .update(SellersTable)
          .set({
            fullName: formData.fullName,
            description: formData.description,
            oneliner: formData.oneliner,
          })
          .where(eq(SellersTable.id, formData.id))
      );

      // ** ---update languages ---

      // 1. remove langugages
      await handleAsync(
        tx
          .delete(LanguagesTable)
          .where(inArray(LanguagesTable.id, formData.removedLangIds))
          .returning()
      );

      // 2. prepare data
      const languagesToUpsert = formData.languages.map((lang) => ({
        // Use a UUID for new records if the ID is an empty string
        id: lang.id === "" ? undefined : lang.id,
        sellerId: formData.id,
        language: lang.language,
        level: lang.level,
      }));

      // 3. upsert
      if (languagesToUpsert.length > 0) {
        await tx
          .insert(LanguagesTable)
          .values(languagesToUpsert)
          .onConflictDoUpdate({
            target: LanguagesTable.id,
            set: {
              // Update the columns based on the new values from 'excluded'
              language: sql`excluded.language`,
              level: sql`excluded.level`,
            },
          });
      }
      // ** ---update skills---

      // 1. remove skills
      await handleAsync(
        tx
          .delete(SkillsTable)
          .where(inArray(SkillsTable.id, formData.removedSkillIds))
          .returning()
      );

      // 2. prepare data
      const skillsToUpsert = formData.skills.map((skill) => ({
        // Use a UUID for new records if the ID is an empty string
        id: skill.id === "" ? undefined : skill.id,
        sellerId: formData.id,
        name: skill.name,
      }));

      // 3. upsert
      if (skillsToUpsert.length > 0) {
        await tx
          .insert(SkillsTable)
          .values(skillsToUpsert)
          .onConflictDoUpdate({
            target: SkillsTable.id,
            set: {
              // Update the columns based on the new values from 'excluded'
              name: sql`excluded.name`,
            },
          });
      }
      // ** ---update experiences---

      // 1. remove skills
      await handleAsync(
        tx
          .delete(ExperiencesTable)
          .where(inArray(ExperiencesTable.id, formData.removedExperienceIds))
          .returning()
      );

      // 2. prepare data
      const experiencesToUpsert = formData.experience.map((ex) => ({
        id: ex.id === "" ? undefined : ex.id,
        sellerId: formData.id,
        company: ex.company,
        title: ex.title,
        startDate: ex.startDate,
        endDate: ex.endDate,
        description: ex.description,
        currentlyWorkingHere: ex.currentlyWorkingHere,
      }));

      // 3. upsert
      if (experiencesToUpsert.length > 0) {
        await tx
          .insert(ExperiencesTable)
          .values(experiencesToUpsert)
          .onConflictDoUpdate({
            target: ExperiencesTable.id,
            set: {
              company: sql`excluded.company`,
              title: sql`excluded.title`,
              startDate: sql`excluded.start_date`, // Corrected
              endDate: sql`excluded.end_date`, // Corrected
              description: sql`excluded.description`,
              currentlyWorkingHere: sql`excluded.currently_working_here`, // Corrected
            },
          });
      }

      // ** ---update educations---

      // 1. remove educations
      await handleAsync(
        tx
          .delete(EducationsTable)
          .where(inArray(EducationsTable.id, formData.removedEducationIds))
          .returning()
      );

      // 2. prepare data
      const educationsToUpsert = formData.education.map((ed) => ({
        id: ed.id === "" ? undefined : ed.id,
        sellerId: formData.id,
        university: ed.university,
        title: ed.title,
        major: ed.major,
        year: ed.year,
        country: ed.country,
      }));

      // 3. upsert
      if (educationsToUpsert.length > 0) {
        await tx
          .insert(EducationsTable)
          .values(educationsToUpsert)
          .onConflictDoUpdate({
            target: EducationsTable.id,
            set: {
              university: sql`excluded.university`,
              title: sql`excluded.title`,
              major: sql`excluded.major`,
              year: sql`excluded.year`,
              country: sql`excluded.country`,
            },
          });
      }
      // ** ---update social links---

      // 1. Remove social links
      await handleAsync(
        tx
          .delete(SocialLinksTable)
          .where(inArray(SocialLinksTable.id, formData.removedSocialLinkIds))
          .returning()
      );

      // 2. Prepare data
      const socialLinksToUpsert = formData.socialLinks.map((sl) => ({
        id: sl.id === "" ? undefined : sl.id,
        sellerId: formData.id,
        platform: sl.platform,
        link: sl.link,
      }));

      // 3. Upsert
      if (socialLinksToUpsert.length > 0) {
        await tx
          .insert(SocialLinksTable)
          .values(socialLinksToUpsert)
          .onConflictDoUpdate({
            target: SocialLinksTable.id,
            set: {
              platform: sql`excluded.platform`,
              link: sql`excluded.link`,
            },
          });
      }
      // ** ---update certificates---

      // 1. Remove certificates
      await handleAsync(
        tx
          .delete(CertificatesTable)
          .where(inArray(CertificatesTable.id, formData.removedCertificateIds))
          .returning()
      );

      // 2. Prepare data
      const certificatesToUpsert = formData.certificates.map((cert) => ({
        id: cert.id === "" ? undefined : cert.id,
        sellerId: formData.id,
        name: cert.name,
        from: cert.from,
        year: cert.year,
      }));

      // 3. Upsert
      if (certificatesToUpsert.length > 0) {
        await tx
          .insert(CertificatesTable)
          .values(certificatesToUpsert)
          .onConflictDoUpdate({
            target: CertificatesTable.id,
            set: {
              name: sql`excluded.name`,
              from: sql`excluded.from`,
              year: sql`excluded.year`,
            },
          });
      }

      const sellerWithRelations = await tx.query.SellersTable.findFirst({
        where: (sellersTable, { eq }) => eq(sellersTable.id, formData.id),
        with: {
          languages: true,
          skills: true,
          experience: true,
          education: true,
          socialLinks: true,
          certificates: true,
        },
      });
      return sellerWithRelations;

      // return { id: sellerId };
      // return {seller}
    })
  );

  return res.json(result);
};

export default updateSeller;
