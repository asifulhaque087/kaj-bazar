"use client";

import CategoryTab from "@/components/CategoryTab";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import GigSlider from "@/components/gig-slider";
import { useSearch } from "@/api/gigs";

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
    <div className="px-[12px]">
      {/* <Button>Click me</Button> */}

      {/* Navigation */}

      <div className="mt-[24px]">
        <Navigation />
      </div>

      <div className="mt-[24px]">
        <Hero />
      </div>

      <div className="mt-[24px]">
        <CategoryTab
          setActiveCategory={setCurrentCategory}
          activeCategory={currentCategory}
        />
      </div>
      <div className="mt-[24px]">
        <GigSlider gigs={data?.data || []} currentCategory={currentCategory} />
      </div>
    </div>
  );
}
