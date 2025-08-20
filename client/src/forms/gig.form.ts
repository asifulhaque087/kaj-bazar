// createGigDefaultForm

import { Auth, CreateGigForm } from "@/schemas";

export const createGigDefaultForm = (
  authUser: Auth | null
): Partial<CreateGigForm> => {
  let baseDefaults: Partial<CreateGigForm> = {
    sellerId: authUser?.id ?? "",
    username: authUser?.username ?? "",
    email: authUser?.email ?? "",
    profilePicture: authUser?.profilePicture ?? "",
    title: "",
    description: "",
    basicTitle: "",
    basicDescription: "",
    category: "",
    subCategories: [], // No change here, but the type is now { title: string }[]
    expectedDelivery: "",
    coverImage: "",
    price: 0,

    // optional
    tags: [],
  };

  return baseDefaults;
};
