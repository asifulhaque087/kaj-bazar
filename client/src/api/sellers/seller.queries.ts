import { getSellerById, getSellerByName } from "@/api/sellers/seller.service";
import {
  UseSellerByIdProps,
  UseSellerByNameProps,
} from "@/api/sellers/seller.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";
import { toast } from "sonner";

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

export const useSellerById = (props: UseSellerByIdProps) => {
  // ** --- Props ---
  const { sellerId } = props;

  // ** --- Store ---
  // const { setSeller} = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["seller", sellerId],
    queryFn: () => getSellerById(sellerId),
    enabled: !!sellerId,
    // onSuccess: (data) => {
    //   toast.success("Profile updated successfully");
    // },
  });
};
