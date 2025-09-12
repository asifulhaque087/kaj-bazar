import {
  currentBuyer,
  getBuyerById,
  getBuyerByName,
} from "@/api/buyers/buyer.service";
import {
  UseBuyerByIdProps,
  UseBuyerByNameProps,
} from "@/api/buyers/buyer.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

// export const useCurrentBuyer = (
//   authId: string | undefined,
//   role: "buyer" | "seller" | null
// ) => {
export const useCurrentBuyer = () => {
  // ** --- Store ---
  const {
    setBuyer,
    setRole,
    role,
    authUser,
    initialRender,
    setInitialRenderFalse,
  } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["current_buyer"],
    queryFn: () => currentBuyer(),
    enabled: !!authUser?.id && role !== "seller" && initialRender,
    staleTime: Infinity, // ✅ don’t refetch unnecessarily
    gcTime: Infinity,
    onSuccess: (data) => {
      setBuyer(data);
      setRole("buyer");
      setInitialRenderFalse();
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
