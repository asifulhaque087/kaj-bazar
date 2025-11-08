import { getCurrentSeller } from "@/features/seller/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useCurrentSeller = () => {
  // ** --- Store ---
  const { setSeller, setActiveRole } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["current-seller"],
    queryFn: () => getCurrentSeller(),
    staleTime: Infinity, // ✅ don’t refetch unnecessarily
    gcTime: Infinity,
    onSuccess: (data) => {
      setSeller(data);
      setActiveRole("seller");
    },
  });
};
