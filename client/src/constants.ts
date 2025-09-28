import ActiveGigs from "@/app/seller/profile/[id]/active-gigs";
import Overview from "@/app/seller/profile/[id]/overview";
import RaitingAndReviews from "@/app/seller/profile/[id]/rating-and-review";

export const categories: string[] = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Photography",
  "Data",
  "Business",
];
export const expectedDelivery: string[] = [
  "1 Day Delivery",
  "2 Days Delivery",
  "3 Days Delivery",
  "4 Days Delivery",
  "5 Days Delivery",
];

export const gigsLimit = "10";

export const steps = [
  {
    heading: "Create a Gig",
    subheading:
      "Sign up for free, set up your Gig, and offer your work to our global audience.",
  },
  {
    heading: "Deliver great work",
    subheading:
      "Get notified when you get an order and use our system to discuss details with customers.",
  },
  {
    heading: "Get paid",
    subheading:
      "Get paid on time, every time. Payment is available for withdrawal as soon as it clears.",
  },
  {
    heading: "Happy Client !",
    subheading:
      "Get paid on time, every time. Payment is available for withdrawal as soon as it clears.",
  },
];

export const footerData = [
  {
    heading: "RESOURCES",
    links: ["eBooks", "Tutorial", "Blog", "Playlist"],
  },

  {
    heading: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    heading: "HELP",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    heading: "FAQ",
    links: ["Account", "Deliveries", "Orders", "Payments"],
  },
];

export const alltabs = [
  {
    title: "overview",
    component: Overview,
  },
  {
    title: "active gigs",
    component: ActiveGigs,
  },

  {
    title: "ratings & reviews",
    component: RaitingAndReviews,
  },
];
