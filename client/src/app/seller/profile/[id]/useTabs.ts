import ActiveGigs from "@/app/seller/profile/[id]/active-gigs";
import Overview from "@/app/seller/profile/[id]/overview";
import RaitingAndReviews from "@/app/seller/profile/[id]/rating-and-review";
import { useState } from "react";

const tabs = [
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

const useTabs = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleTab = (i: number) => {
    setCurrentTab(tabs[i]);
  };

  return {
    tabs,
    currentTab,
    handleTab,
  };
};
export default useTabs;
