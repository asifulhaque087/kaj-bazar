import { rating } from "@/utils/rating.util";
import { Star } from "lucide-react";

interface Props {
  gig: Gig;
}

const GigBasicDetails = (props: Props) => {
  const { gig } = props;
  return (
    <div className="bg-[#FEFEFF]  rounded-[8px] p-[8px]  min-h-[246px] flex">
      <div className="bg-[#EFF0F6]   rounded-[8px] grow relative z-0 overflow-hidden flex flex-col gap-y-[20px] p-[24px]">
        <h1 className="text-[#0E0F19] text-[28px] font-[Roboto] font-normal">
          {gig.title}
        </h1>

        <div className="flex flex-col">
          <span className="font-[Roboto] text-[12px] font-normal text-[#68696F]">
            starting from
          </span>

          <h1 className="text-[#0E0F19] font-[Roboto] text-[56px]">
            ${gig.price}
          </h1>
          <div className="flex gap-x-[14px] items-end">
            <p className="font-[Roboto] text-[16px] font-normal text-[#3E3F47]">
              by{" "}
              <span className="text-[#9FBB89] underline capitalize">
                {gig.username}
              </span>
            </p>

            <div className="px-[12px] py-[4px] rounded-[4px] flex gap-x-[10px] bg-[#FEFEFF]">
              <Star
                className="w-[20px] h-[20px]"
                fill="#F5B113"
                stroke="none"
              />
              <span className="font-[Roboto] text-[16px] font-normal text-[#6E6F75]">
                {rating(gig.ratingSum! / gig.ratingsCount!)}
              </span>
            </div>
          </div>
        </div>

        {/* decorative circles */}
        <div className="w-[1078px]  h-[1078px] rounded-full bg-[#C0C4DB] absolute -top-[100px] left-[50%] -z-[1]" />
      </div>
    </div>
  );
};

export default GigBasicDetails;
