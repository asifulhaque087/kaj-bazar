import { currentBuyer, getBuyerByName } from "@/api/buyers/buyer.service";
import { UseBuyerByNameProps } from "@/api/buyers/buyer.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useCurrentBuyer = (authId: string | undefined) => {
  // ** --- Store ---
  const { setBuyer, setRole, role } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["current_buyer"],
    queryFn: () => currentBuyer(),
    enabled: !!authId && role !== "seller",

    onSuccess: (data) => {
      setBuyer(data);
      setRole("buyer");
    },
  });
};

export const useBuyerByName = (props: UseBuyerByNameProps) => {
  // ** --- Props ---
  const { isBuyer, username, authUser } = props;

  // ** --- Store ---
  const { setOtherBuyer } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["buyer", username],
    queryFn: () => getBuyerByName(username),
    enabled: !!authUser && !isBuyer,
    onSuccess: (data) => {
      setOtherBuyer(data);
    },
  });
};
