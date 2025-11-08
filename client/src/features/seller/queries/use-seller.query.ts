import { getSellerById } from "@/features/seller/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export interface Props {
  sellerId: string;
}

export const useSellerQuery = (props: Props) => {
  // ** --- Props ---
  const { sellerId } = props;

  // ** --- Store ---
  const { setSeller, setActiveRole } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["seller", sellerId],
    queryFn: () => getSellerById(sellerId),
    enabled: !!sellerId,
    onSuccess: (data) => {
      setSeller(data);
      setActiveRole("seller");
    },
  });
};
