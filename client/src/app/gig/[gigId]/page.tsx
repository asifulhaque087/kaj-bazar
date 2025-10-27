"use client";

// import { useGetGigById } from "@/api/gigs/queries/use-get-gig-by-id.query";
import { useParams } from "next/navigation";
import GigBasicDetails from "@/features/gig/components/gig-basic-details";
import Container from "@/components/container";
import MetaDetails from "@/features/gig/components/gig-meta-details";
import GigAndSeller from "@/features/gig/components/gig-and-seller";
import useTabs from "@/hooks/useTabs";
import { gigDetailsTabs } from "@/constants";
import GigDescription from "@/features/gig/components/gig-description";
import GigReviews from "@/features/gig/components/gig-reviews";
import Tabs from "@/features/seller/components/tabs";
import { useGetGigById } from "@/features/gig/queries/use-gig.query";

const page = () => {
  const params = useParams<{ gigId: string }>();

  // ** -- States ---

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
