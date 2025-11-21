import { getGigReviews } from "@/features/review/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

interface Props {
  gigId?: string;
}

export const useGigReviews = (props: Props) => {
  const { gigId } = props;

  return useQueryWithSideEffects({
    queryKey: ["gig-reviews", gigId],
    queryFn: () => getGigReviews(gigId!),
    enabled: !!gigId,
    refetchOnWindowFocus: false,
  });
};
