"use client";

import CategoryTab from "@/components/CategoryTab";
import Hero from "@/components/Hero";
import MainSlider from "@/components/main-slider";
import Navigation from "@/components/Navigation";
import { useState } from "react";

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState<string>();

  console.log("curren category is ", currentCategory);

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
        <CategoryTab setActiveCategory={setCurrentCategory} />
      </div>
      <div className="mt-[24px]">
        <MainSlider />
      </div>
    </div>
  );
}
