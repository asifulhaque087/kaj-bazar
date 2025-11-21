import { getSellerReviews } from "@/features/review/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

interface Props {
  sellerId?: string;
}

export const useSellerReviews = (props: Props) => {
  const { sellerId } = props;

  return useQueryWithSideEffects({
    queryKey: ["seller-reviews", sellerId],
    queryFn: () => getSellerReviews(sellerId!),
    enabled: !!sellerId,
    refetchOnWindowFocus: false,
  });
};
