import { useFindOrCreateConversation } from "@/features/chat/mutations/use-get-or-create-conversation.mutation";
import { useSellerQuery } from "@/features/seller/queries/use-seller.query";
import { useAuthStore } from "@/store/use-auth.store";
import { rating } from "@/utils/rating.util";
import { Star } from "lucide-react";

interface Props {
  sellerId: string;
  className?: string;
}

const GigSellerCard = (props: Props) => {
  // ** --- Props ---
  const { sellerId, className } = props;

  // ** --- Store ---
  const { authUser, setActiveModalItem } = useAuthStore();

  // ** --- Queries ---
  const { data: seller } = useSellerQuery({
    sellerId: sellerId,
  });

  // ** --- Mutations ---
  const { isPending, mutate: findOrCreateConversation } =
    useFindOrCreateConversation();

  return (
    <div className={`rounded-[4px] ${className}`}>
      {/* image box*/}
      <div className="h-[288px] rounded-[4px] overflow-hidden relative">
        <img
          className="w-full h-full object-center object-cover"
          src={seller?.profilePicture}
          alt="seller"
        />

        <div className="absolute left-[20px] top-[20px] px-[12px] py-[4px] rounded-[4px] flex gap-x-[10px] bg-[#FEFEFF]">
          <Star className="w-[20px] h-[20px]" fill="#F5B113" stroke="none" />
          <span className="font-[Roboto] text-[16px] font-normal text-[#6E6F75]">
            {!!seller && rating(seller?.ratingSum / seller?.ratingsCount)}
          </span>
        </div>
      </div>

      {/* content box */}
      <div className="relative flex flex-col gap-[16px] pt-[12px] z-0 overflow-hidden">
        <div className="absolute w-[227px] h-[227px] bg-[#EBE6DC] rounded-[100px] -z-10 left-[50%] -top-[160px]" />

        <div>
          <h4 className="capitalize font-[Roboto] text-[20px] font-normal text-[#0E0F19] mt-[18px]]">
            {seller?.username}
          </h4>
          <p className="capitalize font-[Roboto] text-[14px] font-normal text-[#35373F] mt-[10px]]">
            {/* Fullstack Developer */}
            {seller?.oneliner}
          </p>
        </div>
        <div className="flex items-center gap-[1px] overflow-x-auto scrollbar-hide mt-[28px]]">
          {seller?.skills?.map((item) => (
            <div
              key={item.id}
              className="bg-[#ECF1E7] rounded-[4px] px-[12px] py-[8px] whitespace-nowrap font-[Roboto] text-[12px] font-light text-[#3E3F47]"
            >
              {/* website Development */}
              {item.name}
            </div>
          ))}
        </div>

        <button
          className="bg-[#616BA4] outline-none border-none px-[16px] py-[8px] rounded-[4px] text-[#F7F7FA] text-[16px] font-[Roboto] font-medium  w-full cursor-pointer"
          onClick={() => {
            if (!authUser) {
              return setActiveModalItem(0);
            }

            // if (authUser) {
            findOrCreateConversation({
              receiverUsername: seller?.username!,
              receiverProfilePhoto: seller?.profilePicture!,
              senderUsername: authUser?.username!,
              senderProfilePhoto: authUser?.profilePicture!,
            });
            // }
          }}
        >
          {isPending ? "contacting..." : "contact"}
        </button>
      </div>
    </div>
  );
};

export default GigSellerCard;
