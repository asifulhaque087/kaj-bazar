import StarRatingBar from "@/components/start-rating-bar";

const ReviewCard = () => {
  // Mock review data. In a real application, this would come from an API.
  const reviewData = {
    totalReviews: 50,
    averageRating: 4.5,
    ratingCategories: {
      five: { value: 5, count: 25 },
      four: { value: 4, count: 15 },
      three: { value: 3, count: 5 },
      two: { value: 2, count: 3 },
      one: { value: 1, count: 2 },
    },
  };

  // Helper function to calculate the width percentage for the bars.

  const calculateWidth = (count: number) => {
    // Check if totalReviews is not zero to prevent division by zero errors.
    return reviewData.totalReviews > 0
      ? (count / reviewData.totalReviews) * 100
      : 0;
  };

  // Main card layout
  return (
    <div className="bg-white p-6 rounded-[10px] w-full shadow flex flex-col h-full justify-center items-center">
      {/* Overall rating section */}
      <div className="flex flex-col items-center justify-center">
        <div className="">
          <span className="text-7xl font-light text-gray-800">
            {/* {reviewData.averageRating.toString().replace(".", ",")} */}
            {reviewData.averageRating.toString()}
          </span>
          <span className="text-xl text-gray-500">/5</span>
        </div>
        {/* Review count section */}
        <p className="text-sm text-gray-500 mb-6 font-medium">
          ({reviewData.totalReviews} New Reviews)
        </p>
      </div>

      {/* Star breakdown section */}
      <div className="w-full">
        <StarRatingBar
          stars={5}
          width={calculateWidth(reviewData.ratingCategories.five.count)}
        />
        <StarRatingBar
          stars={4}
          width={calculateWidth(reviewData.ratingCategories.four.count)}
        />
        <StarRatingBar
          stars={3}
          width={calculateWidth(reviewData.ratingCategories.three.count)}
        />
        <StarRatingBar
          stars={2}
          width={calculateWidth(reviewData.ratingCategories.two.count)}
        />
        <StarRatingBar
          stars={1}
          width={calculateWidth(reviewData.ratingCategories.one.count)}
        />
      </div>
    </div>
  );
};

export default ReviewCard;
