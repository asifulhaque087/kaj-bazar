import { Buyer, CreateSellerForm } from "@/schemas";

export const createSellerDefaultForm = (
  buyer?: Buyer | null
): Partial<CreateSellerForm> => {
  const baseDefaults: Partial<CreateSellerForm> = {
    fullName: "John Doe",
    username: "john.doe.seller",
    email: "john.doe@example.com",
    country: "United States",
    profilePicture: "https://placehold.co/150x150/000000/FFFFFF?text=JD",
    description:
      "Experienced web developer specializing in full-stack solutions with a strong focus on user experience and performance. Passionate about building scalable and maintainable applications.",
    oneliner: "Your go-to full-stack developer for robust web apps!",
    languages: [
      {
        language: "English",
        level: "Native",
      },
      {
        language: "Spanish",
        level: "Conversational",
      },
    ],
    skills: [
      { name: "JavaScript" }, // Each skill is now an object
      { name: "TypeScript" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PostgreSQL" },
      { name: "Drizzle ORM" },
      { name: "Git" },
      { name: "Cloud Deployment" },
    ],
    experience: [
      {
        company: "Tech Solutions Inc.",
        title: "Senior Software Engineer",
        startDate: "2020-01-15",
        endDate: "2024-06-30",
        description:
          "Led development of scalable microservices, optimized database queries, and mentored junior developers.",
        currentlyWorkingHere: false,
      },
      {
        company: "Web Innovations LLC",
        title: "Junior Developer",
        startDate: "2018-07-01",
        endDate: "2019-12-31",
        description:
          "Assisted in front-end development and bug fixing for various client projects.",
        currentlyWorkingHere: false,
      },
    ],
    education: [
      {
        country: "United States",
        university: "State University",
        title: "Bachelor of Science",
        major: "Computer Science",
        year: "2018",
      },
    ],
    socialLinks: [
      {
        link: "https://linkedin.com/in/johndoe",
        platform: "LinkedIn",
      },
      {
        link: "https://twitter.com/janedoe_tech",
        platform: "Twitter",
      },
      {
        link: "https://github.com/devmaster",
        platform: "GitHub",
      },
      {
        link: "https://facebook.com/profile.php?id=12345",
        platform: "Facebook",
      },
      {
        link: "https://instagram.com/creative_mind",
        platform: "Instagram",
      },
    ],
    certificates: [
      {
        name: "AWS Certified Developer – Associate",
        from: "Amazon Web Services",
        year: "2022",
      },
      {
        name: "Full Stack Web Development Bootcamp",
        from: "Coding Academy",
        year: "2018",
      },
    ],
  };

  // Now, merge with dynamic values from authUser if available
  if (buyer) {
    return {
      ...baseDefaults,
      username: buyer.username || baseDefaults.username,
      email: buyer.email || baseDefaults.email,
      profilePicture: buyer.profilePicture || baseDefaults.profilePicture,
      country: buyer.country || baseDefaults.country,
    };
  }

  return baseDefaults; // Return just the base defaults if no authUser is provided
};
