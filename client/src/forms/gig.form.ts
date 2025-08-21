// createGigDefaultForm

import { Auth, CreateGigForm, Gig, UpdateGigForm } from "@/schemas";

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
export const updateGigDefaultForm = (
  gig: Gig | null
): Partial<UpdateGigForm> => {
  let baseDefaults: Partial<UpdateGigForm> = {
    id: gig?.id,
    sellerId: gig?.sellerId ?? "",
    username: gig?.username ?? "",
    email: gig?.email ?? "",
    profilePicture: gig?.profilePicture ?? "",
    title: gig?.title ?? "",
    description: gig?.description ?? "",
    basicTitle: gig?.basicTitle ?? "",
    basicDescription: gig?.basicDescription ?? "",
    category: gig?.category ?? "",
    subCategories: gig?.subCategories ?? [],
    expectedDelivery: gig?.expectedDelivery ?? "",
    coverImage: gig?.coverImage ?? "",
    price: gig?.price ?? 0,
    tags: gig?.tags ?? [],
  };

  return baseDefaults;
};
