import { getBuyerById } from "@/features/buyers/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export interface UseBuyerByIdProps {
  id: string;
}

export const useBuyerById = (props: UseBuyerByIdProps) => {
  // ** --- Props ---
  const { id } = props;

  // ** --- Store ---
  const { setBuyer, setRole } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["buyer", id],
    queryFn: () => getBuyerById(id),
    onSuccess: (data) => {
      setBuyer(data);
      setRole("buyer");
    },
  });
};
