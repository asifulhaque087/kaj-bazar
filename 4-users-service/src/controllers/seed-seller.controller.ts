// ** --- Third Party Imports ---

import type { Request, Response } from "express";
import { sampleSize, random, sample } from "lodash";
import { ConnectionError, handleAsync } from "@fvoid/shared-lib";
import { faker } from "@faker-js/faker";
import { eq, sql } from "drizzle-orm";

// ** --- DB Imports ---

import { db } from "@src/drizzle/db";
import {
  BuyersTable,
  CertificatesTable,
  EducationsTable,
  ExperiencesTable,
  LanguagesTable,
  SellersTable,
  SkillsTable,
  SocialLinksTable,
} from "@src/drizzle/schemas";

// ** --- Seed Seller Controller ---

const seedSeller = async (req: Request, res: Response) => {
  // ** --- Extract data ---
  const { count = "10" } = req.params;

  const total = parseInt(count);

  // ** --- Empty all the tables ---
  await handleAsync(db.delete(SellersTable));
  await handleAsync(db.delete(CertificatesTable));
  await handleAsync(db.delete(EducationsTable));
  await handleAsync(db.delete(ExperiencesTable));
  await handleAsync(db.delete(LanguagesTable));
  await handleAsync(db.delete(SkillsTable));
  await handleAsync(db.delete(SocialLinksTable));

  // ** --- Select random buyers ---
  const buyers = await db
    .select()
    .from(BuyersTable)
    .orderBy(sql`RANDOM()`)
    .limit(total);

  // ** --- Iterate total numbers ---
  for (let i = 0; i < total; i++) {
    const buyer = buyers[i];

    // ** --- start a transaction ---
    await handleAsync(
      db.transaction(async (tx) => {
        // ** --- insert into seller table ---
        const [newSeller] = await handleAsync(
          tx
            .insert(SellersTable)
            .values({
              fullName: faker.person.fullName(),
              username: buyer?.username!,
              email: buyer?.email!,
              profilePicture: buyer?.profilePicture,
              description: faker.commerce.productDescription(),
              oneliner: faker.word.words({ count: { min: 5, max: 10 } }),
              country: buyer?.country,
            })
            .returning({ id: SellersTable.id })
        );

        if (!newSeller) throw new ConnectionError("Database connection error");

        // ** --- insert languages ---
        await handleAsync(
          tx.insert(LanguagesTable).values(getUniqueLanguages(newSeller.id))
        );

        // ** --- insert skills ---
        await handleAsync(
          tx.insert(SkillsTable).values(getUniqueSkills(newSeller.id))
        );

        // ** --- insert experiences ---
        await handleAsync(
          tx.insert(ExperiencesTable).values(getUniqueExperiences(newSeller.id))
        );

        // ** --- insert education ---
        await handleAsync(
          tx.insert(EducationsTable).values(getUniqueEducations(newSeller.id))
        );

        // ** --- insert sociallinks ---
        await handleAsync(
          tx.insert(SocialLinksTable).values(getUniqueSocialLinks(newSeller.id))
        );

        // ** --- insert certificates ---
        await handleAsync(
          tx
            .insert(CertificatesTable)
            .values(getUniqueCertificates(newSeller.id))
        );

        // ** --- Update Buyer is seller property ---

        // Update buyer

        await handleAsync(
          tx
            .update(BuyersTable)
            .set({ isSeller: true })
            .where(eq(BuyersTable.id, buyer?.id!))
        );

        return { id: newSeller.id };
      })
    );
  }
  return res.json({ message: "Sellers created successfully" });
};

const getUniqueSkills = (sellerId: number) => {
  const skills = [
    { sellerId: sellerId, name: "JavaScript" },
    { sellerId: sellerId, name: "React.js" },
    { sellerId: sellerId, name: "Node.js" },
    { sellerId: sellerId, name: "Python" },
    { sellerId: sellerId, name: "Data Analysis" },
    { sellerId: sellerId, name: "Machine Learning" },
    { sellerId: sellerId, name: "SQL" },
    // { sellerId: sellerId, skill: "Cloud Computing (AWS/Azure/GCP)" },
    // { sellerId: sellerId, skill: "Project Management" },
    // { sellerId: sellerId, skill: "Digital Marketing" },
    // { sellerId: sellerId, skill: "Graphic Design" },
    // { sellerId: sellerId, skill: "Content Writing" },
    // { sellerId: sellerId, skill: "Financial Modeling" },
    // { sellerId: sellerId, skill: "Cybersecurity" },
    // { sellerId: sellerId, skill: "UI/UX Design" },
    // { sellerId: sellerId, skill: "Mobile App Development" },
    // { sellerId: sellerId, skill: "DevOps" },
    // { sellerId: sellerId, skill: "Customer Service" },
    // { sellerId: sellerId, skill: "Public Speaking" },
    // { sellerId: sellerId, skill: "Strategic Planning" },
  ];

  // Return a random subset of skills for the given sellerId
  return sampleSize(skills, random(1, skills.length));
};

const getUniqueLanguages = (sellerId: number) => {
  const languages = [
    { sellerId: sellerId, language: "English", level: "Native" },
    { sellerId: sellerId, language: "Spanish", level: "Fluent" },
    { sellerId: sellerId, language: "French", level: "Intermediate" },
    { sellerId: sellerId, language: "German", level: "Basic" },
    { sellerId: sellerId, language: "Mandarin Chinese", level: "Beginner" },
    { sellerId: sellerId, language: "Japanese", level: "Intermediate" },
    // { sellerId: sellerId, language: "Korean", level: "Basic" },
    // { sellerId: sellerId, language: "Arabic", level: "Beginner" },
    // { sellerId: sellerId, language: "Russian", level: "Fluent" },
    // { sellerId: sellerId, language: "Portuguese", level: "Intermediate" },
    // { sellerId: sellerId, language: "Italian", level: "Fluent" },
    // { sellerId: sellerId, language: "Hindi", level: "Native" },
    // { sellerId: sellerId, language: "Bengali", level: "Native" },
    // { sellerId: sellerId, language: "Urdu", level: "Fluent" },
    // { sellerId: sellerId, language: "Dutch", level: "Basic" },
  ];

  // Returns a random subarray of languages for the given sellerId
  return sampleSize(languages, random(1, languages.length));
};

const getUniqueExperiences = (sellerId: number) => {
  const experiences = [
    {
      sellerId: sellerId,
      company: "Tech Innovations Inc.",
      title: "Software Engineer",
      startDate: "2022-01-15",
      endDate: "",
      description:
        "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      currentlyWorkingHere: true,
    },
    {
      sellerId: sellerId,
      company: "Global Marketing Solutions",
      title: "Digital Marketing Specialist",
      startDate: "2019-03-01",
      endDate: "2021-12-31",
      description:
        "Managed SEO/SEM campaigns, social media strategy, and content creation for diverse clients. Achieved a 25% increase in lead generation.",
      currentlyWorkingHere: false,
    },
    {
      sellerId: sellerId,
      company: "Acme Widgets Co.",
      title: "Operations Manager",
      startDate: "2017-06-01",
      endDate: "2019-02-28",
      description:
        "Oversaw daily operations, optimized supply chain logistics, and managed a team of 15 employees. Improved efficiency by 15%.",
      currentlyWorkingHere: false,
    },
    {
      sellerId: sellerId,
      company: "Creative Design Studio",
      title: "Graphic Designer",
      startDate: "2020-09-01",
      endDate: "2022-08-31",
      description:
        "Designed visual content for websites, marketing materials, and presentations. Proficient in Adobe Creative Suite.",
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
};

const getUniqueEducations = (sellerId: number) => {
  const educations = [
    {
      sellerId: sellerId,
      country: "United States",
      university: "Stanford University",
      title: "Master of Science",
      major: "Computer Science",
      year: "2022",
    },
    {
      sellerId: sellerId,
      country: "United Kingdom",
      university: "University of Oxford",
      title: "Bachelor of Arts",
      major: "Philosophy, Politics, and Economics (PPE)",
      year: "2019",
    },
    {
      sellerId: sellerId,
      country: "Canada",
      university: "University of Toronto",
      title: "Ph.D.",
      major: "Biomedical Engineering",
      year: "2024",
    },
    {
      sellerId: sellerId,
      country: "Australia",
      university: "University of Melbourne",
      title: "Bachelor of Commerce",
      major: "Finance",
      year: "2020",
    },
    {
      sellerId: sellerId,
      country: "Germany",
      university: "Technical University of Munich (TUM)",
      title: "Master of Engineering",
      major: "Robotics and Artificial Intelligence",
      year: "2023",
    },
    {
      sellerId: sellerId,
      country: "France",
      university: "Sorbonne University",
      title: "Licence (Bachelor's Degree)",
      major: "Literature",
      year: "2018",
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
};

const getUniqueSocialLinks = (sellerId: number) => {
  const socialLinks = [
    {
      sellerId: sellerId,
      link: "https://linkedin.com/in/johndoe",
      platform: "LinkedIn",
    },
    {
      sellerId: sellerId,
      link: "https://twitter.com/janedoe_tech",
      platform: "Twitter",
    },
    {
      sellerId: sellerId,
      link: "https://github.com/devmaster",
      platform: "GitHub",
    },
    {
      sellerId: sellerId,
      link: "https://facebook.com/profile.php?id=12345",
      platform: "Facebook",
    },
    {
      sellerId: sellerId,
      link: "https://instagram.com/creative_mind",
      platform: "Instagram",
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
};

const getUniqueCertificates = (sellerId: number) => {
  const certificates = [
    {
      sellerId: sellerId,
      name: "Certified ScrumMaster (CSM)",
      from: "Scrum Alliance",
      year: "2023",
    },
    {
      sellerId: sellerId,
      name: "Google Cloud Professional Data Engineer",
      from: "Google Cloud",
      year: "2022",
    },
    {
      sellerId: sellerId,
      name: "AWS Certified Solutions Architect - Associate",
      from: "Amazon Web Services (AWS)",
      year: "2021",
    },
    {
      sellerId: sellerId,
      name: "Project Management Professional (PMP)",
      from: "Project Management Institute (PMI)",
      year: "2020",
    },
    {
      sellerId: sellerId,
      name: "CompTIA Security+",
      from: "CompTIA",
      year: "2019",
    },
    // {
    //   sellerId: sellerId,
    //   name: "Microsoft Certified: Azure Developer Associate",
    //   from: "Microsoft",
    //   year: "2023",
    // },
    // {
    //   sellerId: sellerId,
    //   name: "Cisco Certified Network Associate (CCNA)",
    //   from: "Cisco",
    //   year: "2018",
    // },
    // {
    //   sellerId: sellerId,
    //   name: "Certified Public Accountant (CPA)",
    //   from: "AICPA",
    //   year: "2021",
    // },
    // {
    //   sellerId: sellerId,
    //   name: "HubSpot Inbound Marketing Certified",
    //   from: "HubSpot Academy",
    //   year: "2022",
    // },
    // {
    //   sellerId: sellerId,
    //   name: "Professional Scrum Product Owner I (PSPO I)",
    //   from: "Scrum.org",
    //   year: "2024",
    // },
  ];

  return sampleSize(certificates, random(1, certificates.length));
};

export default seedSeller;
