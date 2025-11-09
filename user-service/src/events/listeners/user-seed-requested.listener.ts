import { faker } from "@faker-js/faker";
import {
  catchError,
  ConnectionError,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type UserSeedRequested,
} from "@fvoid/shared-lib";
import type { Channel, ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { UserSeedReturnedPublisher } from "@src/events/publishers/user-seed-returned.publisher";
import {
  BuyersTable,
  CertificatesTable,
  EducationsTable,
  ExperiencesTable,
  LanguagesTable,
  SellersTable,
  SkillsTable,
  SocialLinksTable,
} from "@src/schemas";
import { random, sampleSize } from "lodash";

export class UserSeedRequestedListener extends Listener<UserSeedRequested> {
  exchangeName: Exchanges.UserSeedRequested = Exchanges.UserSeedRequested;
  queueName: Queues.UserSeedRequested = Queues.UserSeedRequested;
  routingKey: RoutingKeys.UserSeedRequested = RoutingKeys.UserSeedRequested;

  async onMessage(data: UserSeedRequested["data"], message: ConsumeMessage) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ", data);

    const { authUsers } = data;

    const [buyers, sellers] = await seedUser(authUsers, this.channel);

    if (!buyers || !sellers) throw new ConnectionError("something went wrong");

    // ** --- publish an event ---
    // new UserSeedReturnedPublisher(this.channel).publish({
    //   buyers,
    //   sellers,
    // });

    this.channel.ack(message);
  }
}

// ** --- seed function ---

interface Auth {
  id: string;
  username: string;
  password: string;
  email: string;
  profilePublicId: string;
  profilePicture: string;

  // Optional Fields
  country: string | null;
  emailVerificationToken: string | null;
  emailVerified: boolean;
  browserName: string | null;
  deviceType: string | null;
  otp: string | null;
  otpExpiration: Date | null; // Mapped from timestamp
  passwordResetToken: string | null;
  passwordResetExpires: Date | null; // Mapped from timestamp
}

const seedUser = async (authUsers: Auth[], channel: Channel) => {
  // ** --- empty tables ---

  const tablesToDelete = [
    { table: BuyersTable, name: "Buyers" },
    { table: SellersTable, name: "Sellers" },
    { table: CertificatesTable, name: "Certificates" },
    { table: EducationsTable, name: "Educations" },
    { table: ExperiencesTable, name: "Experiences" },
    { table: LanguagesTable, name: "Languages" },
    { table: SkillsTable, name: "Skills" },
    { table: SocialLinksTable, name: "Social Links" },
  ];

  for (const { table, name } of tablesToDelete) {
    const [err] = await catchError(db.delete(table));
    if (err) throw new ConnectionError(`Error Empty ${name} !!`);
  }

  // ** --- start ---

  const buyers = [];
  const sellers = [];
  const languages = [];
  const skills = [];
  const experiences = [];
  const educations = [];
  const socialLinks = [];
  const certificates = [];

  const sellerStartIndex = Math.floor(authUsers.length / 2); // integer division

  for (let i = 0; i < authUsers.length; i++) {
    const newBuyer = createFakeBuyer(authUsers[i]!, i, sellerStartIndex);

    buyers.push(newBuyer);

    if (newBuyer.isSeller) {
      const newSeller = createFakeSeller(newBuyer);
      sellers.push(newSeller);

      languages.push(...getUniqueLanguages(newSeller.id));
      skills.push(...getUniqueSkills(newSeller.id));
      experiences.push(...getUniqueExperiences(newSeller.id));
      educations.push(...getUniqueEducations(newSeller.id));
      socialLinks.push(...getUniqueSocialLinks(newSeller.id));
      certificates.push(...getUniqueCertificates(newSeller.id));
    }
  }

  const [errBuyers, insertedBuyers] = await catchError(
    db.insert(BuyersTable).values(buyers).returning()
  );

  if (errBuyers) throw new ConnectionError("Error inserting buyers !!");

  const [errSellers, insertedSellers] = await catchError(
    db.insert(SellersTable).values(sellers).returning()
  );

  if (errSellers) throw new ConnectionError("Error inserting sellers !!");

  const [errLanguages] = await catchError(
    db.insert(LanguagesTable).values(languages).returning()
  );

  if (errLanguages) throw new ConnectionError("Error inserting languages !!");

  const [errSkills] = await catchError(
    db.insert(SkillsTable).values(skills).returning()
  );

  if (errSkills) throw new ConnectionError("Error inserting skills !!");

  const [errExperiences] = await catchError(
    db.insert(ExperiencesTable).values(experiences).returning()
  );

  if (errExperiences)
    throw new ConnectionError("Error inserting experiences !!");

  const [errEducations] = await catchError(
    db.insert(EducationsTable).values(educations).returning()
  );

  if (errEducations) throw new ConnectionError("Error inserting educations !!");

  const [errSLs] = await catchError(
    db.insert(SocialLinksTable).values(socialLinks).returning()
  );

  if (errSLs) throw new ConnectionError("Error inserting social links !!");

  const [errCertificates] = await catchError(
    db.insert(CertificatesTable).values(certificates).returning()
  );

  if (errCertificates)
    throw new ConnectionError("Error inserting certificates !!");

  // const hello =   [insertedBuyers, insertedSellers];

  return [insertedBuyers, insertedSellers];

  // return insertedUsers;
};

const createFakeBuyer = (
  authUser: Auth,
  i: number,
  sellerStartIndex: number
) => {
  return {
    // ...authUser,
    id: authUser.id,
    username: authUser.username,
    email: authUser.email,
    profilePublicId: authUser.profilePublicId,
    profilePicture: authUser.profilePicture,
    country: authUser.country,
    isSeller: i < sellerStartIndex,
    createdAt: new Date(),
  };
};

interface Buyer {
  id: string;
  username: string;
  email: string;
  profilePublicId: string;
  profilePicture: string;
  isSeller: boolean;
  createdAt: Date;
  country: string | null;
}

const createFakeSeller = (buyer: Buyer) => {
  return {
    ...buyer,
    fullName: faker.person.fullName(),
    description: faker.commerce.productDescription(),
    oneliner: faker.word.words({ count: { min: 5, max: 10 } }),
  };
};

const getUniqueSkills = (sellerId: string) => {
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

const getUniqueLanguages = (sellerId: string) => {
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

const getUniqueExperiences = (sellerId: string) => {
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

const getUniqueEducations = (sellerId: string) => {
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

const getUniqueSocialLinks = (sellerId: string) => {
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

const getUniqueCertificates = (sellerId: string) => {
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
