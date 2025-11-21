import ReviewCard from "@/components/review-card";
import { Review } from "@/features/review/schemas/review.schema";

interface Props {
  reviews?: Review[];
}

const ReviewList = (props: Props) => {
  const { reviews } = props;

  return (
    <div className="columns-1 sm:columns-2  lg:columns-3 xl:columns-4 gap-[16px]">
      {reviews &&
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            className="w-full break-inside-avoid mb-[16px]"
          />
        ))}
    </div>
  );
};

export default ReviewList;
