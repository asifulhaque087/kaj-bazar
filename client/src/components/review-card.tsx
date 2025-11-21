import { Review } from "@/features/review/schemas/review.schema";
import { format } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";

interface Props {
  className?: string;
  review: Review;
}

const ReviewCard = (props: Props) => {
  const { review, className } = props;

  return (
    <div
      className={`p-[24px] flex flex-col gap-y-[24px] rounded-[8px] bg-[#FEFEFF] ${className}`}
    >
      {/* stars */}
      <div className="flex items-center gap-x-[8px]">
        {[...Array(review.ratings)].map((item, index) => (
          <Star
            key={index}
            className="w-[20px] h-[20px]"
            fill="#F5B113"
            stroke="none"
          />
        ))}
      </div>

      {review.comment && (
        <p className="font-[Roboto] font-normal text-[14px] leading-[10.71]] text-[#3E3F47] max-w-[330px]">
          {review.comment}
        </p>
      )}

      <div className="flex gap-x-[16px]">
        <div className="relative w-[48px] h-[48px] rounded-full border-[2px] border-[#616BA4] overflow-hidden">
          <Image
            className="absolute w-full h-full object-center object-cover"
            src={review.senderImage ?? "https://robohash.org/99?size=200x200"}
            // src={"https://robohash.org/99?size=200x200"}
            alt="client"
            fill
          />
        </div>
        <div className="flex flex-col">
          <h6 className="text-[#616BA4] font-semibold text-[14px] leading-[10.71]] capitalize">
            {/* Stephanie Newton */}
            {review.senderUsername}
          </h6>
          <p className="text-[#3E3F47] font-normal text-[12px] leading-[12.5]] capitalize">
            {format(review.reivewGivenAt, "d MMMM yyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
