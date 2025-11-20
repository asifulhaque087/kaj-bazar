import GigsBox from "@/features/gig/components/gigs-box";
import { useSellerGigs } from "@/features/gig/queries/use-seller-gigs.query";
import useTabs from "@/hooks/useTabs";
import React from "react";

const boxTabs = ["Active", "Paused"];

interface Props {
  sellerId: string;
}

const SellerGigs = (props: Props) => {
  const { sellerId } = props;

  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: boxTabs,
  });

  const { data: gigs, isLoading: isLoadingGigs } = useSellerGigs({
    sellerId,
    q: `activeGigs=${currentTabIndex === 0}`,
  });

  if (isLoadingGigs) return null;

  return (
    <div>
      <GigsBox
        tabs={tabs}
        currentTabIndex={currentTabIndex}
        gigs={gigs ?? []}
        // gigs={[]}
        handleTabIndex={handleTabIndex}
      />
    </div>
  );
};

export default SellerGigs;
