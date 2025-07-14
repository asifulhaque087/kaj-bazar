// "use client";

import CategoryTab from "@/components/CategoryTab";
import Hero from "@/components/Hero";
import MainSlider from "@/components/main-slider";
import Navigation from "@/components/Navigation";

export default function Home() {
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
        <CategoryTab />
      </div>
      <div className="mt-[24px]">
        <MainSlider />
      </div>
    </div>
  );
}
