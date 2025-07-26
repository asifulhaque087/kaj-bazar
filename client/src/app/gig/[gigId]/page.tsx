"use client";

import { Star, StarHalf } from "lucide-react"; // Import the Star icon from lucide-react

import { useGetGigById } from "@/api/gigs/queries/use-get-gig-by-id.query";
import { rating } from "@/utils/rating.util";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import MiniChatRoom from "@/components/mini-chat-room";

const page = () => {
  const params = useParams<{ gigId: string }>();

  // console.log("The param is ", params.gigId);

  const {
    data: gig,
    isLoading,
    error,
  } = useGetGigById({
    id: parseInt(params.gigId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gig) return <div>Error: No gigs found</div>;

  return (
    <div>
      {/* <h2 className="mb-4 px-4 text-xl font-bold text-[#404145] lg:text-3xl">
        title: {gig.title}
      </h2> */}
      <div>title: {gig.title}</div>
      <div>
        image:
        <img
          className="flex h-8 w-8 self-center rounded-full object-cover"
          src={gig.profilePicture!}
          alt=""
        />
      </div>
      <div>username: {gig.username} </div>

      <div>
        avg rating:
        <span className="text-orange-400">
          {rating(gig.ratingSum / gig.ratingsCount)}
        </span>
      </div>

      <div>
        total rating:
        <span className="">({gig.ratingsCount})</span>
      </div>

      <div>
        <ProductRating
          ratingCategories={gig.ratingCategories}
          ratingSum={gig.ratingSum}
          ratingsCount={gig.ratingsCount}
        />
      </div>

      <div>
        gig image:
        <img
          src={gig.coverImage}
          alt="Gig Image"
          className="object-contains h-[200px] w-[200px] transition-all duration-500 hover:scale-105"
        />
      </div>
      {/* <HtmlParser input={gig.description ?? ""} /> */}
      <div>description: {gig.description}</div>
      <div>category: {gig.category}</div>

      <div>
        subcategories:{" "}
        {gig.subCategories &&
          gig.subCategories.map((category: string, index: number) => (
            <span className="font-normal" key={index}>{`${category}${
              index !== gig.subCategories.length - 1 ? "," : ""
            }`}</span>
          ))}
      </div>

      <div>price : ${gig.price}</div>

      <div> basicTitle: {gig.basicTitle}</div>
      <div> basicDescription: {gig.basicDescription}</div>
      <div>expected delivery: {gig.expectedDelivery}</div>

      <div>
        contact: <Button>contact</Button>
      </div>

      <div>
        <MiniChatRoom />
      </div>
    </div>
  );
};

interface IRatingData {
  ratingsCount: number;
  ratingSum: number;
  ratingCategories: {
    five: { star: number; count: number };
    four: { star: number; count: number };
    three: { star: number; count: number };
    two: { star: number; count: number };
    one: { star: number; count: number };
  };
}

const ProductRating = (props: IRatingData) => {
  const { ratingsCount, ratingSum, ratingCategories } = props;

  // Destructure relevant data from props
  // const { ratingsCount, ratingSum, ratingCategories } = ratingData;

  // Calculate the average rating
  const averageRating = parseFloat((ratingSum / ratingsCount).toFixed(1));

  console.log("asldkjfasdafd ", averageRating);

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    const maxStars = 5; // Assuming a 5-star rating system

    for (let i = 1; i <= maxStars; i++) {
      if (i <= averageRating) {
        // Full star
        stars.push(
          <Star
            key={i}
            size={20}
            fill="currentColor"
            stroke="currentColor"
            className="text-yellow-500"
          />
        );
      } else if (i - 0.5 <= averageRating) {
        // Half star (optional, requires a half-star icon or a creative approach with CSS)
        // For simplicity, we'll just show a full star if it's 0.5 or more.
        // If you need true half stars, you might need a separate icon or CSS masking.
        stars.push(
          <div className="relative  w-[16px]">
            <Star
              key={i}
              size={20}
              fill="none"
              stroke="currentColor"
              className="text-gray-300 absolute"
            />

            <StarHalf
              key={i}
              size={20}
              fill="currentColor"
              stroke="currentColor"
              className="text-yellow-500 absolute"
            />
          </div>
        ); // You might want a different icon or styling for half
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            size={20}
            fill="none"
            stroke="currentColor"
            className="text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <div className="flex">{renderStars()}</div>
      <span className="text-gray-600">
        {averageRating} ({ratingsCount} reviews)
      </span>

      {/* Optional: Display detailed rating categories */}
      {ratingsCount > 0 && (
        <div className="mt-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">Rating Breakdown:</h3>
          {Object.values(ratingCategories)
            .sort((a, b) => b.star - a.star) // Sort by star count descending (5-star first)
            .map((category) => (
              <div key={category.star} className="flex items-center mb-1">
                <span className="w-4 text-right mr-2">
                  {category.star} Star:
                </span>
                <div className="relative w-48 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(category.count / ratingsCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2">{category.count}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default page;
