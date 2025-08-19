import StarRatingBar from "@/components/start-rating-bar";
import { rating } from "@/utils/rating.util";

type RatingCategories = {
  five: {
    star: number;
    count: number;
  };
  four: {
    star: number;
    count: number;
  };
  three: {
    star: number;
    count: number;
  };
  two: {
    star: number;
    count: number;
  };
  one: {
    star: number;
    count: number;
  };
};

// The full type for the schema, including the optional modifier
interface ReviewCardProps {
  ratingCategories?: RatingCategories;
  ratingsCount: number;
  ratingSum: number;
  // averageRating: number;
  // totalReviews: number;
}
const ReviewCard = (props: ReviewCardProps) => {
  // Mock review data. In a real application, this would come from an API.

  // const reviewData = props;
  const { ratingsCount, ratingSum, ratingCategories } = props;

  // const reviewData = {
  //   totalReviews: 50,
  //   ratingCategories: {
  //     five: { value: 5, count: 25 },
  //     four: { value: 4, count: 15 },
  //     three: { value: 3, count: 5 },
  //     two: { value: 2, count: 3 },
  //     one: { value: 1, count: 2 },
  //   },
  // };

  // Helper function to calculate the width percentage for the bars.

  const calculateWidth = (count: number) => {
    // Check if totalReviews is not zero to prevent division by zero errors.
    return ratingsCount > 0 ? (count / ratingsCount) * 100 : 0;
  };

  // Main card layout
  return (
    <div className="bg-white p-6 rounded-[10px] w-full shadow flex flex-col h-full justify-center items-center">
      {/* Overall rating section */}
      <div className="flex flex-col items-center justify-center">
        <div className="">
          <span className="text-7xl font-light text-gray-800">
            {/* {reviewData.averageRating.toString().replace(".", ",")} */}
            {/* {averageRating.toString()} */}
            {/* {ratingSum / ratingsCount} */}

            {rating(ratingSum! / ratingsCount!)}
          </span>
          <span className="text-xl text-gray-500">/5</span>
        </div>
        {/* Review count section */}
        <p className="text-sm text-gray-500 mb-6 font-medium">
          ({ratingsCount} New Reviews)
        </p>
      </div>

      {/* Star breakdown section */}
      <div className="w-full">
        <StarRatingBar
          stars={5}
          width={calculateWidth(ratingCategories?.five.count!)}
        />
        <StarRatingBar
          stars={4}
          width={calculateWidth(ratingCategories?.four.count!)}
        />
        <StarRatingBar
          stars={3}
          width={calculateWidth(ratingCategories?.three.count!)}
        />
        <StarRatingBar
          stars={2}
          width={calculateWidth(ratingCategories?.two.count!)}
        />
        <StarRatingBar
          stars={1}
          width={calculateWidth(ratingCategories?.one.count!)}
        />
      </div>
    </div>
  );
};

export default ReviewCard;
