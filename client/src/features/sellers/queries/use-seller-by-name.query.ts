import { getSellerByName } from "@/features/sellers/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { Auth, CreateSellerForm, UpdateSellerForm } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export interface UseSellerByNameProps {
  username: string;
  isBuyer: boolean;
  authUser: Auth | null;
}

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
