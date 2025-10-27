import {
  Buyer,
  CreateSellerForm,
  Seller,
  UpdateSellerForm,
} from "@/features/shared";

export const createSellerDefaultForm = (
  buyer?: Buyer | null
): Partial<CreateSellerForm> => {
  // const baseDefaults: Partial<CreateSellerForm> = {
  const baseDefaults: CreateSellerForm = {
    id: buyer?.id ?? "",
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

export const updateSellerDefaultForm = (
  seller?: Seller | null
): Partial<UpdateSellerForm> => {
  // const baseDefaults: Partial<CreateSellerForm> = {
  const baseDefaults: UpdateSellerForm = {
    id: seller?.id ?? "",
    username: seller?.username ?? "",
    email: seller?.email ?? "",
    country: seller?.country ?? "",
    profilePicture: seller?.profilePicture ?? "",

    fullName: seller?.fullName ?? "",
    description: seller?.description ?? "",
    oneliner: seller?.oneliner ?? "",
    languages: seller?.languages ?? [
      {
        id: "",
        language: "",
        level: "",
      },
    ],
    removedLangIds: [],

    skills: seller?.skills ?? [{ id: "", name: "" }],
    removedSkillIds: [],

    experience: seller?.experience ?? [
      {
        id: "",
        company: "",
        currentlyWorkingHere: false,
        startDate: "",
        endDate: "",
        title: "",
      },
    ],
    removedExperienceIds: [],

    education: seller?.education ?? [
      { id: "", country: "", major: "", title: "", university: "", year: "" },
    ],
    removedEducationIds: [],

    socialLinks: seller?.socialLinks ?? [{ id: "", link: "", platform: "" }],
    removedSocialLinkIds: [],

    certificates: seller?.certificates ?? [
      { id: "", from: "", name: "", year: "" },
    ],
    removedCertificateIds: [],
  };

  return baseDefaults;
};
