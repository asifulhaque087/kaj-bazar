// "use client";

import CategoryTab from "@/app/components/CategoryTab";
import Hero from "@/app/components/Hero";
import MainSlider from "@/app/components/main-slider";
import Navigation from "@/app/components/Navigation";

export default function Home() {
  return (
    <div className="px-[12px]">
      {/* Navigation */}

      <div className="mt-[24px]">
        <Navigation />
      </div>

      <div className="mt-[24px]">
        <Hero />
      </div>

      <div className="mt-[24px]">
        <CategoryTab />
      </div>
      <div className="mt-[24px]">
        <MainSlider />
      </div>
    </div>
  );
}
