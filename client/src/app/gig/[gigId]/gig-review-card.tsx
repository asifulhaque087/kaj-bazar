import { Star } from "lucide-react";

interface Props {
  className?: string;
  description: string;
}

const GigReviewCard = (props: Props) => {
  const { className, description } = props;
  return (
    <div
      className={`p-[24px] flex flex-col gap-y-[24px] rounded-[8px] bg-[#FEFEFF] ${className}`}
    >
      {/* stars */}
      <div className="flex items-center gap-x-[8px]">
        {[...Array(5)].map((item, index) => (
          <Star
            key={index}
            className="w-[20px] h-[20px]"
            fill="#F5B113"
            stroke="none"
          />
        ))}
      </div>

      <p className="font-[Roboto] font-normal text-[14px] leading-[10.71]] text-[#3E3F47] max-w-[330px]">
        {description}
      </p>

      <div className="flex gap-x-[16px]">
        <div className="w-[48px] h-[48px] rounded-full border-[2px] border-[#616BA4] overflow-hidden">
          <img
            className="w-full h-full object-center object-cover"
            src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="client"
          />
        </div>
        <div className="flex flex-col">
          <h6 className="text-[#616BA4] font-semibold text-[14px] leading-[10.71]] capitalize">
            Stephanie Newton
          </h6>
          <p className="text-[#3E3F47] font-normal text-[12px] leading-[12.5]] capitalize">
            yesterday
          </p>
        </div>
      </div>
    </div>
  );
};

export default GigReviewCard;
