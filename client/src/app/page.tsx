"use client";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/how-it-works";
import Container from "@/components/container";
import GigsBox from "@/features/gigs/components/gigs-box";

export default function Home() {
  return (
    <>
      {/* --- Hero --- */}
      <Container className="mt-[72px]">
        <Hero />
      </Container>

      <Container className="mt-[72px]">
        <GigsBox />
      </Container>

      <Container className="mt-[100px]">
        <HowItWorks />
      </Container>
    </>
  );
}
