"use client";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/how-it-works";
import Container from "@/components/container";
import GigsBox from "@/features/gig/components/gigs-box";
import { useSearch } from "@/features/gig/queries/use-gigs.query";
import useTabs from "@/hooks/useTabs";
import { categories } from "@/constants";

export default function Home() {
  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: categories,
  });

  const { data } = useSearch({
    q: `category=${encodeURIComponent(tabs[currentTabIndex])}`,
    page: 1,
    limit: 10,
  });

  return (
    <>
      {/* --- Hero --- */}
      <Container className="pt-[52px] bg-[#F7F7FA]">
        <Hero />
      </Container>

      <Container className="py-[52px] pb-[80px] ppb-[116px] bg-[#F7F7FA]">
        {data && (
          <GigsBox
            tabs={tabs}
            currentTabIndex={currentTabIndex}
            gigs={data.data}
            handleTabIndex={handleTabIndex}
            isSlider
          />
        )}
      </Container>

      <Container className="pt-[52px]  pb-[116px] bg-[#DFE1ED]">
        <HowItWorks />
      </Container>
    </>
  );
}
