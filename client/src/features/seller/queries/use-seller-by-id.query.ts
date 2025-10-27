import { getSellerById } from "@/features/seller/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export interface UseSellerByIdProps {
  sellerId: string;
}

export const useSellerById = (props: UseSellerByIdProps) => {
  // ** --- Props ---
  const { sellerId } = props;

  // ** --- Store ---
  const { setSeller, setRole } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["seller", sellerId],
    queryFn: () => getSellerById(sellerId),
    enabled: !!sellerId,
    onSuccess: (data) => {
      setSeller(data);
      setRole("seller");
    },
  });
};
