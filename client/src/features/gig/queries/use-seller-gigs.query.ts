import { getSellerGigs } from "@/features/gig/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

type Q = "activeGigs=true" | "activeGigs=false";

interface Props {
  sellerId?: string;
  q?: Q;
}

export const useSellerGigs = (props: Props) => {
  const { sellerId, q } = props;

  return useQueryWithSideEffects({
    queryKey: ["gig", sellerId, q],
    queryFn: () => getSellerGigs(sellerId!, q),
    enabled: !!sellerId,
    refetchOnWindowFocus: false, // ⬅️ Add this line
  });
};
