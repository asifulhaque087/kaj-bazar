"use client";

import { ChevronDown, Star, StarHalf } from "lucide-react"; // Import the Star icon from lucide-react

// import { useGetGigById } from "@/api/gigs/queries/use-get-gig-by-id.query";
import { rating } from "@/utils/rating.util";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MiniChatRoom from "@/features/chats/components/mini-chat-room";
import { useAuthStore } from "@/store/use-auth.store";
import ReviewCard from "@/features/reviews/components/review-card";
import GigBasicDetails from "@/features/gigs/components/gig-basic-details";
import Container from "@/components/container";
import MetaDetails from "@/features/gigs/components/gig-meta-details";
import GigAndSeller from "@/features/gigs/components/gig-and-seller";
import useTabs from "@/hooks/useTabs";
import { gigDetailsTabs } from "@/constants";
import GigDescription from "@/features/gigs/components/gig-description";
import GigReviews from "@/features/gigs/components/gig-reviews";
import Tabs from "@/features/sellers/components/tabs";
import { useFindOrCreateConversation } from "@/features/chats/mutations/use-get-or-create-conversation.mutation";
import { useGetGigById } from "@/features/gigs/queries/use-gig.query";

const tags = ["ui/ux", "react", "tailwind", "figma", "responsive"];

const page = () => {
  const params = useParams<{ gigId: string }>();

  const { authUser, seller, role } = useAuthStore();

  const router = useRouter();
  // ** -- States ---

  const [isDescription, setIsDescription] = useState(false);

  // console.log("The param is ", params.gigId);

  const { mutate: findOrCreateConversation } = useFindOrCreateConversation();

  const {
    data: gig,
    isLoading,
    error,
  } = useGetGigById({
    id: params.gigId,
  });

  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: gigDetailsTabs,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gig) return <div>Error: No gigs found</div>;

  return (
    <>
      <Container className="mt-[32px]">
        <GigBasicDetails gig={gig} />
      </Container>

      <Container className="pt-[28px]">
        <div className="flex items-center justify-between flex-wrap gap-[16px]">
          <MetaDetails
            label="Delivery Time"
            value={"3 Days"}
            className="grow"
          />
          <MetaDetails
            label="number of revisions"
            value={"unlimited"}
            className="grow"
          />
          <MetaDetails
            label="include source file"
            value={"yes"}
            className="grow"
          />
        </div>
      </Container>

      <Container className="pt-[28px]">
        <GigAndSeller gig={gig} />
      </Container>

      <Container className="pt-[28px]">
        <Tabs
          currentTabIndex={currentTabIndex}
          handleTabIndex={handleTabIndex}
          tabs={tabs}
        />
      </Container>

      <Container className="pt-[28px]">
        {currentTabIndex === 0 && (
          <GigDescription description={gig.description} />
        )}
        {currentTabIndex === 1 && <GigReviews />}
      </Container>
    </>
  );
};

export default page;
