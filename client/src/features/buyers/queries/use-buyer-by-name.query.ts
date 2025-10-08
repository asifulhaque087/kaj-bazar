import { getBuyerByName } from "@/features/buyers/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { Auth } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";

export interface UseBuyerByNameProps {
  username: string;
  isBuyer: boolean;
  authUser: Auth | null;
}

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
