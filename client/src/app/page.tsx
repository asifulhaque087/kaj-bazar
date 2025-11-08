"use client";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/how-it-works";
import Container from "@/components/container";
import GigsBox from "@/features/gig/components/gigs-box";

export default function Home() {
  return (
    <>
      {/* --- Hero --- */}
      <Container className="py-[52px] bg-[#F7F7FA]">
        <Hero />
      </Container>

      <Container className="pt-[52px] pb-[116px] bg-[#F7F7FA]">
        <GigsBox />
      </Container>

      <Container className="pt-[52px]  pb-[116px] bg-[#DFE1ED]">
        <HowItWorks />
      </Container>
    </>
  );
}
