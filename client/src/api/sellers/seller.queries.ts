import { getSellerByName } from "@/api/sellers/seller.service";
import { UseSellerByNameProps } from "@/api/sellers/seller.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useSellerByName = (props: UseSellerByNameProps) => {
  // ** --- Props ---
  const { isBuyer, username, authUser } = props;

  // ** --- Store ---
  const { setOtherSeller } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["seller", username],
    queryFn: () => getSellerByName(username),
    enabled: !!authUser && isBuyer,
    onSuccess: (data) => {
      setOtherSeller(data);
    },
  });
};
