"use client";
import { currentBuyer } from "@/features/buyer/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useCurrentBuyer = () => {
  // ** --- Store ---
  const { setBuyer, setActiveRole } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["current-buyer"],
    queryFn: () => currentBuyer(),
    // enabled: !!authUser?.id && activeRole !== "seller" && initialRender,
    // enabled: !!authUser?.id && activeRole !== "seller" && initialRender,
    staleTime: Infinity, // ✅ don’t refetch unnecessarily
    gcTime: Infinity,
    onSuccess: (data) => {
      setBuyer(data);
      setActiveRole("buyer");
    },
  });
};
