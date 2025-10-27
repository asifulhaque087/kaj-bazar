import { useFindOrCreateConversation } from "@/features/chats/mutations/use-get-or-create-conversation.mutation";
import GigSellerCard from "@/features/gigs/components/gig-seller-card";
import { Gig } from "@/schemas";

interface Props {
  gig: Gig;
}

const GigAndSeller = (props: Props) => {
  const { gig } = props;

  const { isPending, mutate: findOrCreateConversation } =
    useFindOrCreateConversation();

  // const { isPending, mutate: createSeller } = useCreateSeller({
  //   reset: form.reset,
  //   setError: form.setError,
  // });

  return (
    <div className="grid grid-cols-12 rounded-[4px] bg-[#FEFEFF] gap-[12px] p-[12px]">
      <div className="col-span-12 md:col-span-7 xl:col-span-8 rounded-[4px] min-h-[400px] overflow-hidden h-[458px]">
        <img
          className="w-full h-full object-cover object-center"
          src={gig.coverImage}
          alt="gig"
        />
      </div>

      <GigSellerCard sellerId={gig.sellerId} className="col-span-12 md:col-span-5 xl:col-span-4 h-[458px]" />
    </div>
  );
};

export default GigAndSeller;
