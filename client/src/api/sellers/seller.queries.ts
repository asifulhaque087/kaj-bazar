import { getSellerByName } from "@/api/sellers/seller.service";
import { UseSellerByNameProps } from "@/api/sellers/seller.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useSellerByName = (props: UseSellerByNameProps) => {
  const { isBuyer, username, authUser } = props;

  return useQueryWithSideEffects({
    queryKey: ["seller", username],
    queryFn: () => getSellerByName(username),
    enabled: !!authUser && isBuyer,
    onSuccess: (data) => {
      console.log("@@@@@@@@@@@@ seller data is ", data);
      // todo - setOtherSeller to the zustand store
    },
  });
};
