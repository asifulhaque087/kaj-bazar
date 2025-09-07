import { Buyer, CreateSellerForm } from "@/schemas";

export const createSellerDefaultForm = (
  buyer?: Buyer | null
): Partial<CreateSellerForm> => {
  const baseDefaults: Partial<CreateSellerForm> = {
    username: buyer?.username ?? "",
    email: buyer?.email ?? "",
    country: buyer?.country ?? "",
    profilePicture: buyer?.profilePicture ?? "",

    fullName: "",
    description: "",
    oneliner: "",
    languages: [
      {
        language: "",
        level: "",
      },
    ],
    skills: [{ name: "" }],
    experience: [
      {
        company: "",
        currentlyWorkingHere: false,
        startDate: "",
        endDate: "",
        title: "",
      },
    ],
    education: [
      { country: "", major: "", title: "", university: "", year: "" },
    ],
    socialLinks: [{ link: "", platform: "" }],
    certificates: [{ from: "", name: "", year: "" }],
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
