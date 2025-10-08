import GigReviewCard from "@/features/gigs/components/gig-review-card";
import { testReviewDescriptions } from "@/constants";

const GigReviews = () => {
  return (
    <div className="columns-1 sm:columns-2  lg:columns-3 xl:columns-4 gap-[16px]">
      {testReviewDescriptions.map((item, index) => (
        <GigReviewCard
          key={index}
          description={item.description}
          className="w-full break-inside-avoid mb-[16px]"
        />
      ))}
    </div>
  );
};

export default GigReviews;
