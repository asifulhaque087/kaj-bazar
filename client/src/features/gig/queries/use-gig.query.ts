import { getGigById } from "@/features/gig/api/queries.api";
import { useQuery } from "@tanstack/react-query";

export const useGetGigById = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["gig", id],
    queryFn: () => getGigById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false, // ⬅️ Add this line
  });
};
