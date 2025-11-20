import Overview from "@/features/seller/components/overview";
import RaitingAndReviews from "@/features/seller/components/rating-and-review";
import { LayoutDashboard, PackagePlus, UserCog } from "lucide-react";
import SellerGigs from "@/features/seller/components/seller-gigs";

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

// export const categories = [
//   {
//     title: "Graphics & Design",
//   },
//   {
//     title: "Digital Marketing",
//   },
//   {
//     title: "Writing & Translation",
//   },
//   {
//     title: "Video & Animation",
//   },
//   {
//     title: "Music & Audio",
//   },
//   {
//     title: "Programming & Tech",
//   },
//   {
//     title: "Photography",
//   },
//   {
//     title: "Data",
//   },
//   {
//     title: "Business",
//   },
// ];

export const expectedDelivery: string[] = [
  "1 Day Delivery",
  "2 Days Delivery",
  "3 Days Delivery",
  "4 Days Delivery",
  "5 Days Delivery",
];

export const expectedDeliveryOptions = [
  { value: 1, label: "1 Day Delivery" },
  { value: 2, label: "2 Days Delivery" },
  { value: 3, label: "3 Days Delivery" },
  { value: 4, label: "4 Days Delivery" },
  { value: 5, label: "5 Days Delivery" },
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
    title: "gigs",
    component: SellerGigs,
  },

  {
    title: "ratings & reviews",
    component: RaitingAndReviews,
  },
];

export const gigDetailsTabs = [
  {
    title: "description",
  },

  {
    title: "ratings & reviews",
  },
];

export const testReviewDescriptions = [
  {
    description: "Mastering Google My Business (GMB) profiles.",
  },
  {
    description: "Deep dive into local citation cleanup strategies.",
  },
  {
    description: "Advanced keyword research for small businesses.",
  },
  {
    description:
      "The fundamentals of schema markup for local pages and businesses.",
  },
  {
    description: "Building a high-quality, local link profile from scratch.",
  },
  {
    description: "Analyzing competitor SEO strategies and identifying gaps.",
  },
  {
    description:
      "Developing a content calendar focused on geo-targeted queries and intent.",
  },
  {
    description:
      "Understanding and responding to customer reviews and review signals to boost ranking.",
  },
  {
    description: "Technical SEO audit checklist for local business websites.",
  },
  {
    description:
      "Using Google Search Console and Analytics for performance tracking and troubleshooting.",
  },
  {
    description:
      "Optimizing website speed and mobile responsiveness for better local search visibility.",
  },
  {
    description:
      "Introduction to pay-per-click (PPC) advertising on Google Ads for local lead generation.",
  },
  {
    description:
      "Creating compelling meta descriptions and title tags for service area pages.",
  },
  {
    description:
      "A comprehensive guide to leveraging video content for local search engagement and rankings, including YouTube optimization.",
  },
  {
    description:
      "Strategies for recovering from a Google local algorithm update penalty or ranking drop.",
  },
  {
    description:
      "The art of effective storytelling in marketing for small business owners and entrepreneurs to connect with the local community.",
  },
  {
    description:
      "Hands-on workshop: building and optimizing dedicated service pages for specific geographic locations and service types. This session focuses heavily on content quality and avoiding common thin-content pitfalls that can hurt SEO performance in competitive markets.",
  },
  {
    description:
      "An intensive one-day course covering the entire local SEO landscape, from the initial setup of your Google Business Profile to advanced link-building tactics and sophisticated review management systems. You'll learn to diagnose common local pack issues, implement critical NAP consistency across all platforms, and track meaningful KPIs to prove ROI for your campaigns.",
  },
  {
    description:
      "Mastering the complexities of multi-location SEO: a deep dive into organizational challenges, including proper use of locator pages, canonical tags, distinct content generation for each branch, and avoiding internal content duplication issues, which is critical for national brands with a local footprint.",
  },
  {
    description:
      "Local SEO for agencies: scaling your client operations, developing effective reporting dashboards, automating routine tasks like citation building and monitoring, and pricing your services competitively in the rapidly evolving digital marketing landscape. This training also covers client communication best practices.",
  },
  {
    description:
      "Focus session on voice search optimization: how local businesses can adapt their website content and GMB listings to rank for conversational, question-based voice queries from devices like Google Assistant and Alexa. This includes restructuring FAQs and using structured data for maximum visibility.",
  },
  {
    description:
      "Advanced schema and structured data implementation for local inventory, events, and job postings. Learn to use the correct JSON-LD markup to achieve rich snippets in the search results, driving higher click-through rates (CTRs) and better visibility for specific business offerings.",
  },
  {
    description:
      "Social Media Marketing for Local SEO: Utilizing platforms like Facebook and Instagram to drive engagement, generate positive signals that influence local rankings, and manage the brand reputation through active community interaction and timely response to public feedback. The training includes creative content strategies.",
  },
  {
    description:
      "Local link building beyond citations: effective outreach tactics, partnering with non-competing local businesses, sponsoring community events, and leveraging local press mentions to secure powerful, relevant backlinks that significantly boost domain authority and local search performance.",
  },
  {
    description:
      "Effective complaint resolution and negative review management. A strategic session on turning negative customer feedback into a positive brand experience, covering communication templates, legal considerations, and the technical options for review flagging and removal across major platforms.",
  },
  {
    description:
      "The foundational principles of web design and user experience (UX) that directly impact local SEO rankings, including page speed metrics, Core Web Vitals assessment, and creating intuitive navigation that keeps local searchers engaged and reduces bounce rate.",
  },
  {
    description:
      "Analyzing your Local Search Ranking Factors: a detailed breakdown of the most influential elements, including proximity, prominence, relevance, and the impact of personalized search results on your business’s visibility in the local pack and map results.",
  },
  {
    description:
      "Integrating email marketing and SMS campaigns with your local SEO efforts to drive repeat business, encourage review generation from satisfied customers, and leverage customer loyalty data to improve the overall effectiveness of your digital strategy.",
  },
  {
    description:
      "Creating engaging and informative 'About Us' and 'Team' pages that establish trust and authority in the local community, using high-quality photography, employee bios, and authentic company history to connect with potential clients on a personal level.",
  },
  {
    description:
      "Practical session on utilizing local news and press releases for quick visibility gains and high-authority link acquisition. Learn how to craft a newsworthy story and distribute it effectively to local media outlets, maximizing your chances of being featured.",
  },
  {
    description:
      "Understanding geotargeting and Hreflang implementation for businesses serving multiple languages or international audiences with a local presence in different regions.",
  },
  {
    description:
      "A focused module on competitor analysis using various SEO tools to reverse-engineer success, identify top-performing local keywords, and benchmark your website's performance against the top three businesses in your service area.",
  },
];

export const buyerProfileTabs = [
  {
    title: "active",
  },

  {
    title: "completed",
  },

  {
    title: "cancel",
  },
];

export const sellerHeaderDropdownMenus = [
  {
    icon: UserCog,
    title: "switch to buying",
    link: "",
  },

  {
    icon: PackagePlus,
    title: "Add a new gig",
    link: "/gig/create",
  },

  {
    icon: LayoutDashboard,
    title: "Dashboard",
    link: "/seller/profile",
  },
];

export const buyerHeaderDropdownMenus = [
  {
    icon: UserCog,
    title: "switch to selling",
    link: "",
  },

  {
    icon: LayoutDashboard,
    title: "Dashboard",
    link: "/buyer/profile",
  },
];
