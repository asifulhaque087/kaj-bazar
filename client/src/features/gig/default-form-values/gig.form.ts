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
    // images: [],

    // images: [
    //   {
    //     url: "https://final-gallery.netlify.app/images/image-1.webp",
    //     orderId: 1,
    //   },
    //   {
    //     url: "https://final-gallery.netlify.app/images/image-2.webp",
    //     orderId: 2,
    //   },
    //   {
    //     url: "https://final-gallery.netlify.app/images/image-4.webp",
    //     orderId: 3,
    //   },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-5.webp",
    //   //   orderId: 4,
    //   // },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-6.webp",
    //   //   orderId: 5,
    //   // },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-7.webp",
    //   //   orderId: 6,
    //   // },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-8.webp",
    //   //   orderId: 7,
    //   // },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-9.webp",
    //   //   orderId: 8,
    //   // },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-10.jpeg",
    //   //   orderId: 9,
    //   // },
    //   // {
    //   //   url: "https://final-gallery.netlify.app/images/image-11.jpeg",
    //   //   orderId: 10,
    //   // },
    // ],

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
