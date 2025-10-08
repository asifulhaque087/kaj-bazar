import { currentBuyer } from "@/features/buyers/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useCurrentBuyer = () => {
  // ** --- Store ---
  const {
    setBuyer,
    setRole,
    role,
    authUser,
    initialRender,
    setInitialRenderFalse,
  } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["current_buyer"],
    queryFn: () => currentBuyer(),
    enabled: !!authUser?.id && role !== "seller" && initialRender,
    staleTime: Infinity, // ✅ don’t refetch unnecessarily
    gcTime: Infinity,
    onSuccess: (data) => {
      setBuyer(data);
      setRole("buyer");
      setInitialRenderFalse();
    },
  });
};
