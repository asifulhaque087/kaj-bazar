import { Gig } from "@/api/gigs/schemas/gig.schema";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

interface IGigCard {
  gig: Gig;
}

const GigCard = (props: IGigCard) => {
  // ** --- Props ---
  const { gig } = props;

  // console.log("gig is ", gig);

  const avgRating = gig.ratingSum / gig.ratingsCount;
  const rating = avgRating.toFixed(1);

  return (
    <>
      {/* main 200px 640 oile 150px  r tailwind a sm oise 767 porjonto mane 768 oile md suru */}
      {/* <div className="shadow-md w-[150px] sm:w-[200px]  border-[10px] border-red-500"> */}
      <div className="w-[262px] rounded-[24px] shadow-lg border border-[#E4E5E7] ">
        {/* Header */}

        <div className="flex items-center gap-x-[12px] px-[12px] py-[15px]">
          {/* left */}
          <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
            <img
              // src="https://www.shutterstock.com/image-vector/vector-bright-portrait-beautiful-brunette-600nw-2452267975.jpg"
              src={gig.profilePicture!}
              alt="profile"
              className="object-center object-cover h-full w-full"
            />
          </div>
          {/* right */}

          <div>
            <h4 className="font-inter font-[600] text-[14px] text-[#222325]">
              {/* cc__creative */}
              {gig.username}
            </h4>

            <p className="font-inter font-[500] text-[12.48px] text-[#2E90EB] mt-[4px]">
              Top Rated Seller
            </p>
          </div>
        </div>

        {/* Image Box */}

        <Link href={`/gig/${gig.id}`} className="w-full">
          <div className="px-[12px]">
            <div className="h-[148px] w-full rounded-[7px] overflow-hidden bg-red-500">
              <img
                // src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/435057859/original/b1178ebc894adffee3df9f46a3af8378c41f21c2/build-secure-and-scalable-backend-apis-with-nodejs-express.png"
                src={gig.coverImage}
                alt="gig"
                className="h-full w-full  object-center object-cover"
              />
            </div>
          </div>
        </Link>

        {/* Love Box */}

        <div className="flex items-center gap-x-[10px] px-[25px] py-[7px]">
          <Heart fill="#B5B6BA" size={22} color="#B5B6BA" />

          <span className="font-inter font-[400] text-[12.48px] text-[#B5B6BA]">
            32.4K
          </span>
        </div>

        {/* Title */}

        {/* <h1 className="font-inter  font-[400] text-[16px] leading-[1.375] text-[#222325] px-[25px] h-[42px] overflow-hidden bg-red-500">
          I will design UI UX for mobile app with figma for ios
        </h1> */}

        <h1 className="font-inter font-[400] text-[16px] leading-[1.375] text-[#222325] px-[25px] h-[42px] overflow-hidden line-clamp-2">
          {/* I will design UI UX for mobile app with figma for ios I will design UI
          UX for mobile app with figma for ios I will design UI UX for mobile
          app with figma for ios I will design UI UX for mobile app with figma
          for ios */}

          {gig.title}
        </h1>

        {/* Rating */}

        <div className="flex items-center px-[25px] mt-[4px] gap-x-[5px]">
          {/* icon */}

          <Star size={15} fill="#FFBE5B" color="#FFBE5B" />

          {/* raing */}
          <span className="font-inter text-[12px] font-[700] text-[#FFBE5B] ">
            {/* 5.0 */}
            {rating}
          </span>

          {/* reviews */}

          <span className="font-inter font-[400] text-[12.48px] text-[#B5B6BA]">
            {/* 32.4K */}
            {gig.ratingsCount}
          </span>
        </div>

        {/* pricing */}

        <div className="flex items-center  gap-x-[7px] py-[13px] px-[25px]">
          <p className="uppercase text-[#74767E] text-[7px] font-inter font-[700] tracking-[0.31px]">
            starting at
          </p>
          <span className="text-[#2E90EB] font-inter font-[400] text-[12.26px]">
            {/* $8,674 */}${gig.price}
          </span>
        </div>
      </div>
    </>
  );
};

export default GigCard;
