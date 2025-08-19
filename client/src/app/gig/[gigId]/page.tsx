"use client";

import { ChevronDown, Star, StarHalf } from "lucide-react"; // Import the Star icon from lucide-react

// import { useGetGigById } from "@/api/gigs/queries/use-get-gig-by-id.query";
import { rating } from "@/utils/rating.util";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MiniChatRoom from "@/components/mini-chat-room";
import { useAuthStore } from "@/store/use-auth.store";
import { useGetGigById } from "@/api/gigs";
import { useFindOrCreateConversation } from "@/api/chats";
import Navigation from "@/components/Navigation";
import ReviewCard from "@/components/review-card";

const tags = ["ui/ux", "react", "tailwind", "figma", "responsive"];

const page = () => {
  const params = useParams<{ gigId: string }>();

  const { authUser, buyer } = useAuthStore();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gig) return <div>Error: No gigs found</div>;

  return (
    <div>
      <div>
        <Navigation />
      </div>

      <div className="flex h-[90vh] gap-x-[20px]">
        {/* scrollable */}
        <div className="xl:overflow-y-auto grow">
          <div className="flex gap-[20px] flex-col md:flex-row">
            {/* gig image card*/}
            <div
              className="rounded-[10px] h-[344px] w-full md:w-[60%] relative flex flex-col p-[20px] bg-white grow"
              // className="h-[344px] basis-[50%] grow rounded-[10px]  flex flex-col p-[20px] bg-white"
              style={{
                // backgroundImage: `linear-gradient(to bottom,rgba(255,255,255,.2),
                // rgba(0,0,0, .7)), url(${"https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,

                backgroundImage: `linear-gradient(to bottom,rgba(255,255,255,.2),
                rgba(0,0,0, .7)), url(${gig.coverImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              {/* <div className="mt-auto absolute w-full bottom-6 left-6 right-6"> */}
              <div className="mt-auto">
                <h1 className="font-[roboto] font-bold text-[20px] sm:text-[24px] text-white">
                  {/* Let’s Hunt for Your Dream Property */}
                  {gig.title}
                </h1>
                <div className="flex items-center gap-x-[12px] overflow-auto  scrollbar-hide">
                  {!!gig.tags &&
                    gig.tags.map((tag, i) => (
                      <div
                        key={i}
                        className="rounded-[6px] text-[12px] sm:text-[14px] p-[8px] sm:p-[12px]  bg-[rgba(99,146,216,.15)] text-white"
                      >
                        {tag}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* price card */}
            <div className="p-[30px]   w-full  grow  md:w-[30%] shadow flex flex-col gap-y-[20px]  items-center justify-center bg-white rounded-[10px]">
              {/* <div className="basis-[50%] grow shadow flex flex-col gap-y-[20px]  items-center justify-center bg-white rounded-[10px]"> */}
              <h1 className="font-[roboto] font-extrabold text-[40px] tracking-[1.6] text-[#27C9BE] leading-none">
                {/* $250 */}
                ${gig.price}
              </h1>
              <p className="font-[roboto] text-[14px] tracking-[.56] text-black text-center">
                {/* Explore our range of beautiful properties with the addition of
                separate accommodation suitable for you. */}
                {gig.basicDescription}
              </p>
              <button
                className="bg-[#6392D8] py-[6px] px-[24px] rounded-[8px] font-[roboto] text-[16px] font-medium tracking-[.64] text-white border-none outline-none cursor-pointer"
                onClick={() =>
                  findOrCreateConversation({
                    receiverUsername: gig.username,
                    senderUsername: authUser?.username!,
                  })
                }
              >
                Contact
              </button>
            </div>
          </div>

          {/* description */}
          <div
            className=" bg-[#6392D8] px-[20px] sm:px-[30px] py-[20px] w-full rounded-[10px]  flex items-center justify-between mt-[30px]"
            onClick={() => setIsDescription((prev) => !prev)}
          >
            <p className="font-[roboto] font-medium text-[20px] sm:text-[24px] tracking-[1.04] text-white capitalize">
              About the gig
            </p>
            <span>
              <ChevronDown className=" h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] text-white" />
            </span>
          </div>

          <div
            className={`w-full  p-[20px] shadow bg-white rounded-[10px] mt-[14px] ${
              !isDescription ? "hidden" : "block"
            }`}
          >
            {/* This is Description of this gig */}
            {gig.description}
          </div>

          {/* here another scroll and non scroll */}
          <div className="flex mt-[14px] gap-[14px] items-start md:h-[400px] flex-col md:flex-row">
            <div className="w-full md:w-[40%] h-full">
              <ReviewCard
                ratingSum={gig?.ratingSum!}
                ratingsCount={gig.ratingsCount!}
                ratingCategories={gig.ratingCategories}
              />
            </div>
            {/* scrollable */}
            <div className="w-full md:w-[60%] h-[400px] md:h-full   bg-white p-6 rounded-[10px]  shadow flex flex-col">
              {/* <div className="overflow-y-auto w-full  h-[400px] md:h-full"> */}
              <div className="overflow-y-auto w-full h-full">
                <div className="flex flex-col gap-y-[14px]">
                  {[...Array(90)].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#f4f3f2] rounded-[10px] p-[14px]"
                    >
                      <div className="flex flex-col gap-y-[14px]">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-x-[10px]">
                            <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden bg-amber-200">
                              <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                                alt="profile"
                              />
                            </div>

                            <div>
                              <h1 className="text-[18px] font-medium font-[roboto] text-[#333]">
                                Ayushi Keshari
                              </h1>
                              <p>rating</p>
                            </div>
                          </div>
                          <span className="text-[12px] font-[roboto] text-[#333]">
                            20 mins ago
                          </span>
                        </div>
                        <p className="text-[16px] font-[roboto] text-[#333]">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Quisquam quam omnis recusandae sequi quo magnam
                          esse atque ipsa? Ullam, doloremque veniam?
                          Dignissimos, voluptas? Nihil iure aliquid voluptates
                          doloremque ad obcaecati.
                        </p>
                      </div>

                      {/* <span>content</span> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* non scrollable*/}
        <div className="basis-[300px] hidden xl:flex shrink-0 rounded-[10px] shadow flex-col items-center py-[50px] px-[20px] bg-white">
          <div className="text-center flex flex-col gap-y-[10px]">
            <div className="w-[100px] h-[100px] rounded-[10px] bg-red-500 overflow-hidden mx-auto ">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                alt="profile"
              />
            </div>
            <h1 className="font-[roboto] font-bold text-[20px] sm:text-[24px] text-black">
              Vel Kumar P
            </h1>
            <p className="text-[14px] font-[roboto] text-[#333]">
              UI/UX Designer
            </p>
            <p className="text-[14px] font-[roboto] text-[#333]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Aspernatur aut accusantium numquam.
            </p>

            <div>{/* <ReviewCard /> */}</div>

            <div className="flex  flex-wrap gap-[10px] items-center justify-center">
              {[...Array(6)].map((item, index) => (
                <div
                  className="rounded-[6px] text-[14px] sm:text-[14px] px-[16px] py-[8px]  border border-[#6392D8]]  bg-white text-[#333] shadow"
                  key={index}
                >
                  <span>content</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );

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
          {rating(gig.ratingSum! / gig.ratingsCount!)}
        </span>
      </div>

      <div>
        total rating:
        <span className="">({gig.ratingsCount})</span>
      </div>

      <div>
        <ProductRating
          ratingCategories={gig.ratingCategories!}
          ratingSum={gig.ratingSum!}
          ratingsCount={gig.ratingsCount!}
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

      {/* About the seller */}

      <div>
        seller - name: {gig.username}
        {/* from : {gig} */}
      </div>

      <div>
        contact:{" "}
        <Button
          onClick={() =>
            findOrCreateConversation({
              receiverUsername: gig.username,
              senderUsername: authUser?.username!,
            })
          }
        >
          contact
        </Button>
      </div>

      <div>
        <MiniChatRoom gig={gig} buyer={buyer} />
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

  // console.log("asldkjfasdafd ", averageRating);

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
          <div className="relative  w-[16px]" key={i}>
            <Star
              size={20}
              fill="none"
              stroke="currentColor"
              className="text-gray-300 absolute"
            />

            <StarHalf
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
