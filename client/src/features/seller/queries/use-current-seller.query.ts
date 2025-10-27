import { getCurrentSeller } from "@/features/seller/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useCurrentSeller = () => {
  // ** --- Store ---
  const {
    setSeller,
    setRole,
    role,
    authUser,
    initialRender,
    setInitialRenderFalse,
  } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["current-seller"],
    queryFn: () => getCurrentSeller(),
    enabled: !!authUser?.id && role == "seller" && initialRender,
    staleTime: Infinity, // ✅ don’t refetch unnecessarily
    gcTime: Infinity,
    onSuccess: (data) => {
      setSeller(data);
      setRole("seller");
      setInitialRenderFalse();
      // toast.success("Profile updated successfully");
    },
  });
};
