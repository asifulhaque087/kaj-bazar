import {
  AuthGrpcRequest,
  CreateSellerRequestDto,
  DRIZZLE,
  SellerByIdRequestDto,
  SellerByNameRequestDto,
  throwGrpcError,
  tryit,
  UpdateSellerRequestDto,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from '../../drizzle/drizzle';
import { faker } from '@faker-js/faker';
import { sampleSize, random } from 'lodash';

import {
  BuyersTable,
  CertificatesTable,
  EducationsTable,
  ExperiencesTable,
  LanguagesTable,
  SellersTable,
  SkillsTable,
  SocialLinksTable,
} from '../schemas';
import { eq, inArray, or, sql } from 'drizzle-orm';

@Injectable()
export class SellerService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findByName(data: SellerByNameRequestDto) {
    const [seller, sellerErr] = await tryit(
      this.db.query.SellersTable.findFirst({
        where: eq(SellersTable.username, data.username),
      }),
    );

    if (sellerErr) return throwGrpcError('INTERNAL', sellerErr.message);
    if (!seller)
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return seller;
  }

  async currentSeller(data: AuthGrpcRequest) {
    const [seller, sellerErr] = await tryit(
      this.db.query.SellersTable.findFirst({
        where: eq(SellersTable.email, data.user.email),
      }),
    );

    if (sellerErr) return throwGrpcError('INTERNAL', sellerErr.message);
    if (!seller)
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return seller;
  }

  async findById(data: SellerByIdRequestDto) {
    const [seller, sellerErr] = await tryit(
      this.db.query.SellersTable.findFirst({
        where: eq(SellersTable.id, data.id),
      }),
    );

    if (sellerErr) return throwGrpcError('INTERNAL', sellerErr.message);
    if (!seller)
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return seller;
  }

  async create(formData: CreateSellerRequestDto) {
    const [_, err] = await tryit(
      this.db.transaction(async (tx) => {
        // 2. Insert into the main 'sellers' table first
        // We need the ID of the newly created seller to link the related data.

        // ** --- create seller ---

        const [_, sellerErr] = await tryit(
          this.db
            .select()
            .from(SellersTable)
            .where(
              or(
                eq(SellersTable.username, formData.username),
                eq(SellersTable.email, formData.email),
              ),
            )
            .limit(1)
            .then((res) => res[0]),
        );

        if (sellerErr) throwGrpcError('INTERNAL', sellerErr.message);

        // console.log("check is ", check);

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

        if (!newSeller)
          return throwGrpcError('INTERNAL', 'Database connection error');

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

        await tryit(
          tx
            .update(BuyersTable)
            .set({ isSeller: true })
            .where(eq(BuyersTable.id, sellerId)),
        );

        // Return the ID of the newly created seller
        return { id: sellerId };
      }),
    );

    if (err) throwGrpcError('INTERNAL', err.message);

    return { message: 'Seller Created Successfully' };
  }

  async update(formData: UpdateSellerRequestDto) {
    const [result, err] = await tryit(
      this.db.transaction(async (tx) => {
        // ** ---process seller---

        // update seller
        await tryit(
          tx
            .update(SellersTable)
            .set({
              fullName: formData.fullName,
              description: formData.description,
              oneliner: formData.oneliner,
            })
            .where(eq(SellersTable.id, formData.id)),
        );

        // ** ---update languages ---

        // 1. remove langugages

        await tryit(
          tx
            .delete(LanguagesTable)
            .where(
              inArray(
                LanguagesTable.id,
                formData.removedLangIds.map((obj) => obj.id),
              ),
            )
            .returning(),
        );

        // 2. prepare data
        const languagesToUpsert = formData.languages.map((lang) => ({
          // Use a UUID for new records if the ID is an empty string
          id: lang.id === '' ? undefined : lang.id,
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
        await tryit(
          tx
            .delete(SkillsTable)
            .where(
              inArray(
                SkillsTable.id,
                formData.removedSkillIds.map((obj) => obj.id),
              ),
            )
            .returning(),
        );

        // 2. prepare data
        const skillsToUpsert = formData.skills.map((skill) => ({
          // Use a UUID for new records if the ID is an empty string
          id: skill.id === '' ? undefined : skill.id,
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
        await tryit(
          tx
            .delete(ExperiencesTable)
            .where(
              inArray(
                ExperiencesTable.id,
                formData.removedExperienceIds.map((obj) => obj.id),
              ),
            )
            .returning(),
        );

        // 2. prepare data
        const experiencesToUpsert = formData.experience.map((ex) => ({
          id: ex.id === '' ? undefined : ex.id,
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
        await tryit(
          tx
            .delete(EducationsTable)
            .where(
              inArray(
                EducationsTable.id,
                formData.removedEducationIds.map((obj) => obj.id),
              ),
            )
            .returning(),
        );

        // 2. prepare data
        const educationsToUpsert = formData.education.map((ed) => ({
          id: ed.id === '' ? undefined : ed.id,
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
        await tryit(
          tx
            .delete(SocialLinksTable)
            .where(
              inArray(
                SocialLinksTable.id,
                formData.removedSocialLinkIds.map((obj) => obj.id),
              ),
            )
            .returning(),
        );

        // 2. Prepare data
        const socialLinksToUpsert = formData.socialLinks.map((sl) => ({
          id: sl.id === '' ? undefined : sl.id,
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
        await tryit(
          tx
            .delete(CertificatesTable)
            .where(
              inArray(
                CertificatesTable.id,
                formData.removedCertificateIds.map((obj) => obj.id),
              ),
            )
            .returning(),
        );

        // 2. Prepare data
        const certificatesToUpsert = formData.certificates.map((cert) => ({
          id: cert.id === '' ? undefined : cert.id,
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
          //   where: (sellersTable, { eq }) => eq(sellersTable.id, formData.id),
          where: eq(SellersTable.id, formData.id),
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
      }),
    );

    if (err) throwGrpcError('INTERNAL', err.message);
    return result;
  }

  async seed(data: any) {
    // ** --- Extract data ---
    const { count = '10' } = data;

    const total = parseInt(count);

    // ** --- Empty all the tables ---
    await tryit(this.db.delete(SellersTable));
    await tryit(this.db.delete(CertificatesTable));
    await tryit(this.db.delete(EducationsTable));
    await tryit(this.db.delete(ExperiencesTable));
    await tryit(this.db.delete(LanguagesTable));
    await tryit(this.db.delete(SkillsTable));
    await tryit(this.db.delete(SocialLinksTable));

    // ** --- Select random buyers ---
    const buyers = await this.db
      .select()
      .from(BuyersTable)
      .orderBy(sql`RANDOM()`)
      .limit(total);

    // ** --- Iterate total numbers ---
    for (let i = 0; i < total; i++) {
      const buyer = buyers[i];

      // ** --- start a transaction ---
      await tryit(
        this.db.transaction(async (tx) => {
          // ** --- insert into seller table ---
          const [newSeller] = await tx
            .insert(SellersTable)
            .values({
              id: buyer?.id!,
              fullName: faker.person.fullName(),
              username: buyer?.username!,
              email: buyer?.email!,
              profilePicture: buyer?.profilePicture,
              description: faker.commerce.productDescription(),
              oneliner: faker.word.words({ count: { min: 5, max: 10 } }),
              country: buyer?.country,
            })
            .returning({ id: SellersTable.id });

          if (!newSeller) {
            return throwGrpcError('INTERNAL', 'Database connection error');
          }

          // ** --- insert languages ---
          await tryit(
            tx
              .insert(LanguagesTable)
              .values(this.getUniqueLanguages(newSeller.id)),
          );

          // ** --- insert skills ---
          await tryit(
            tx.insert(SkillsTable).values(this.getUniqueSkills(newSeller.id)),
          );

          // ** --- insert experiences ---
          await tryit(
            tx
              .insert(ExperiencesTable)
              .values(this.getUniqueExperiences(newSeller.id)),
          );

          // ** --- insert education ---
          await tryit(
            tx
              .insert(EducationsTable)
              .values(this.getUniqueEducations(newSeller.id)),
          );

          // ** --- insert sociallinks ---
          await tryit(
            tx
              .insert(SocialLinksTable)
              .values(this.getUniqueSocialLinks(newSeller.id)),
          );

          // ** --- insert certificates ---
          await tryit(
            tx
              .insert(CertificatesTable)
              .values(this.getUniqueCertificates(newSeller.id)),
          );

          // ** --- Update Buyer is seller property ---

          // Update buyer

          await tryit(
            tx
              .update(BuyersTable)
              .set({ isSeller: true })
              .where(eq(BuyersTable.id, buyer?.id!)),
          );

          return { id: newSeller.id };
        }),
      );
    }
    return { message: 'Sellers created successfully' };
  }

  getUniqueSkills(sellerId: string) {
    const skills = [
      { sellerId: sellerId, name: 'JavaScript' },
      { sellerId: sellerId, name: 'React.js' },
      { sellerId: sellerId, name: 'Node.js' },
      { sellerId: sellerId, name: 'Python' },
      { sellerId: sellerId, name: 'Data Analysis' },
      { sellerId: sellerId, name: 'Machine Learning' },
      { sellerId: sellerId, name: 'SQL' },
    ];

    // Return a random subset of skills for the given sellerId
    return sampleSize(skills, random(1, skills.length));
  }

  getUniqueLanguages(sellerId: string) {
    const languages = [
      { sellerId: sellerId, language: 'English', level: 'Native' },
      { sellerId: sellerId, language: 'Spanish', level: 'Fluent' },
      { sellerId: sellerId, language: 'French', level: 'Intermediate' },
      { sellerId: sellerId, language: 'German', level: 'Basic' },
      { sellerId: sellerId, language: 'Mandarin Chinese', level: 'Beginner' },
      { sellerId: sellerId, language: 'Japanese', level: 'Intermediate' },
    ];

    // Returns a random subarray of languages for the given sellerId
    return sampleSize(languages, random(1, languages.length));
  }

  getUniqueExperiences(sellerId: string) {
    const experiences = [
      {
        sellerId: sellerId,
        company: 'Tech Innovations Inc.',
        title: 'Software Engineer',
        startDate: '2022-01-15',
        endDate: '',
        description:
          'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        currentlyWorkingHere: true,
      },
      {
        sellerId: sellerId,
        company: 'Global Marketing Solutions',
        title: 'Digital Marketing Specialist',
        startDate: '2019-03-01',
        endDate: '2021-12-31',
        description:
          'Managed SEO/SEM campaigns, social media strategy, and content creation for diverse clients. Achieved a 25% increase in lead generation.',
        currentlyWorkingHere: false,
      },
      {
        sellerId: sellerId,
        company: 'Acme Widgets Co.',
        title: 'Operations Manager',
        startDate: '2017-06-01',
        endDate: '2019-02-28',
        description:
          'Oversaw daily operations, optimized supply chain logistics, and managed a team of 15 employees. Improved efficiency by 15%.',
        currentlyWorkingHere: false,
      },
      {
        sellerId: sellerId,
        company: 'Creative Design Studio',
        title: 'Graphic Designer',
        startDate: '2020-09-01',
        endDate: '2022-08-31',
        description:
          'Designed visual content for websites, marketing materials, and presentations. Proficient in Adobe Creative Suite.',
        currentlyWorkingHere: false,
      },
      // {
      //   sellerId: sellerId,
      //   company: "City General Hospital",
      //   title: "Registered Nurse",
      //   startDate: "2018-01-01",
      //   endDate: "",
      //   description:
      //     "Provided patient care, administered medications, and assisted doctors with medical procedures. Specialized in emergency care.",
      //   currentlyWorkingHere: true,
      // },
      // {
      //   sellerId: sellerId,
      //   company: "Financial Services Group",
      //   title: "Financial Analyst",
      //   startDate: "2021-04-01",
      //   endDate: "2023-03-31",
      //   description:
      //     "Conducted financial modeling, analyzed market trends, and prepared investment reports for high-net-worth clients.",
      //   currentlyWorkingHere: false,
      // },
      // {
      //   sellerId: sellerId,
      //   company: "EduTech Learning Platform",
      //   title: "Content Writer",
      //   startDate: "2023-01-01",
      //   endDate: "",
      //   description:
      //     "Developed engaging educational content for online courses and articles. Collaborated with subject matter experts.",
      //   currentlyWorkingHere: true,
      // },
      // {
      //   sellerId: sellerId,
      //   company: "Retail Innovations Ltd.",
      //   title: "Store Manager",
      //   startDate: "2016-07-01",
      //   endDate: "2020-06-30",
      //   description:
      //     "Managed daily store operations, supervised staff, and achieved sales targets. Implemented customer service initiatives.",
      //   currentlyWorkingHere: false,
      // },
      // {
      //   sellerId: sellerId,
      //   company: "Scientific Research Institute",
      //   title: "Research Assistant",
      //   startDate: "2022-05-01",
      //   endDate: "2024-04-30",
      //   description:
      //     "Assisted in laboratory experiments, collected and analyzed data, and prepared research findings for publication.",
      //   currentlyWorkingHere: false,
      // },
      // {
      //   sellerId: sellerId,
      //   company: "Community Outreach Programs",
      //   title: "Program Coordinator",
      //   startDate: "2019-10-01",
      //   endDate: "2022-09-30",
      //   description:
      //     "Organized and managed community events, recruited volunteers, and developed partnerships with local organizations.",
      //   currentlyWorkingHere: false,
      // },
    ];

    return sampleSize(experiences, random(1, experiences.length));
  }

  getUniqueEducations(sellerId: string) {
    const educations = [
      {
        sellerId: sellerId,
        country: 'United States',
        university: 'Stanford University',
        title: 'Master of Science',
        major: 'Computer Science',
        year: '2022',
      },
      {
        sellerId: sellerId,
        country: 'United Kingdom',
        university: 'University of Oxford',
        title: 'Bachelor of Arts',
        major: 'Philosophy, Politics, and Economics (PPE)',
        year: '2019',
      },
      {
        sellerId: sellerId,
        country: 'Canada',
        university: 'University of Toronto',
        title: 'Ph.D.',
        major: 'Biomedical Engineering',
        year: '2024',
      },
      {
        sellerId: sellerId,
        country: 'Australia',
        university: 'University of Melbourne',
        title: 'Bachelor of Commerce',
        major: 'Finance',
        year: '2020',
      },
      {
        sellerId: sellerId,
        country: 'Germany',
        university: 'Technical University of Munich (TUM)',
        title: 'Master of Engineering',
        major: 'Robotics and Artificial Intelligence',
        year: '2023',
      },
      {
        sellerId: sellerId,
        country: 'France',
        university: 'Sorbonne University',
        title: "Licence (Bachelor's Degree)",
        major: 'Literature',
        year: '2018',
      },
      // {
      //   sellerId: sellerId,
      //   country: "Japan",
      //   university: "University of Tokyo",
      //   title: "Bachelor of Engineering",
      //   major: "Electrical Engineering",
      //   year: "2021",
      // },
      // {
      //   sellerId: sellerId,
      //   country: "India",
      //   university: "Indian Institute of Technology Bombay",
      //   title: "Bachelor of Technology",
      //   major: "Computer Science and Engineering",
      //   year: "2017",
      // },
      // {
      //   sellerId: sellerId,
      //   country: "China",
      //   university: "Peking University",
      //   title: "Master of Law",
      //   major: "International Law",
      //   year: "2022",
      // },
      // {
      //   sellerId: sellerId,
      //   country: "Brazil",
      //   university: "University of São Paulo",
      //   title: "Bachelor of Science",
      //   major: "Architecture and Urbanism",
      //   year: "2019",
      // },
    ];
    const data = sampleSize(educations, random(1, educations.length));
    return data;
  }

  getUniqueSocialLinks(sellerId: string) {
    const socialLinks = [
      {
        sellerId: sellerId,
        link: 'https://linkedin.com/in/johndoe',
        platform: 'LinkedIn',
      },
      {
        sellerId: sellerId,
        link: 'https://twitter.com/janedoe_tech',
        platform: 'Twitter',
      },
      {
        sellerId: sellerId,
        link: 'https://github.com/devmaster',
        platform: 'GitHub',
      },
      {
        sellerId: sellerId,
        link: 'https://facebook.com/profile.php?id=12345',
        platform: 'Facebook',
      },
      {
        sellerId: sellerId,
        link: 'https://instagram.com/creative_mind',
        platform: 'Instagram',
      },
      // {
      //   sellerId: sellerId,
      //   link: "https://medium.com/@writer_pro",
      //   platform: "Medium",
      // },
      // {
      //   sellerId: sellerId,
      //   link: "https://pinterest.com/design_inspiration",
      //   platform: "Pinterest",
      // },
      // {
      //   sellerId: sellerId,
      //   link: "https://youtube.com/channel/UC-example", // Changed from googleusercontent to a more common YouTube link
      //   platform: "YouTube",
      // },
      // {
      //   sellerId: sellerId,
      //   link: "https://tiktok.com/@short_clips",
      //   platform: "TikTok",
      // },
      // {
      //   sellerId: sellerId,
      //   link: "https://personalwebsite.com",
      //   platform: "Website", // Generic for personal websites
      // },
    ];

    return sampleSize(socialLinks, random(1, socialLinks.length));
  }

  getUniqueCertificates(sellerId: string) {
    const certificates = [
      {
        sellerId: sellerId,
        name: 'Certified ScrumMaster (CSM)',
        from: 'Scrum Alliance',
        year: '2023',
      },
      {
        sellerId: sellerId,
        name: 'Google Cloud Professional Data Engineer',
        from: 'Google Cloud',
        year: '2022',
      },
      {
        sellerId: sellerId,
        name: 'AWS Certified Solutions Architect - Associate',
        from: 'Amazon Web Services (AWS)',
        year: '2021',
      },
      {
        sellerId: sellerId,
        name: 'Project Management Professional (PMP)',
        from: 'Project Management Institute (PMI)',
        year: '2020',
      },
      {
        sellerId: sellerId,
        name: 'CompTIA Security+',
        from: 'CompTIA',
        year: '2019',
      },
    ];

    return sampleSize(certificates, random(1, certificates.length));
  }
}
