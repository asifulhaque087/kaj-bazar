"use client";

import CategoryTab from "@/components/CategoryTab";
import Hero from "@/components/Hero";
import { useState } from "react";
import GigSlider from "@/components/gig-slider";
import { useSearch } from "@/api/gigs";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  const [currentCategory, setCurrentCategory] =
    useState<string>("Graphics & Design");

  const { isLoading, data, error } = useSearch({
    q: `category=${encodeURIComponent(currentCategory)}`,
    page: 1,
    limit: 10,
  });

  // console.log("curren category is ", currentCategory);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* --- Hero --- */}
      <div className="mt-[24px]">
        <Hero />
      </div>

      {/* --- Category Tab --- */}
      <div className="mt-[24px]">
        <CategoryTab
          setActiveCategory={setCurrentCategory}
          activeCategory={currentCategory}
        />
      </div>
      {/* --- Gig Slider --- */}
      <div className="mt-[24px]">
        <GigSlider gigs={data?.data || []} currentCategory={currentCategory} />
      </div>

      <div className="mt-[100px]">
        <HowItWorks />
      </div>
    </>
  );
}
