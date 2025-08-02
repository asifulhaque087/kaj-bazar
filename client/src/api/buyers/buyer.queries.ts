import { currentBuyer, getBuyerByName } from "@/api/buyers/buyer.service";
import { UseBuyerByNameProps } from "@/api/buyers/buyer.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useQuery } from "@tanstack/react-query";

export const useCurrentBuyer = (authId: string | undefined) => {
  return useQuery({
    queryKey: ["current_buyer"],
    queryFn: () => currentBuyer(),
    // staleTime: 20000,
    // staleTime: 5 * 60 * 1000,
    enabled: !!authId,
  });
};

export const useBuyerByName = (props: UseBuyerByNameProps) => {
  const { isBuyer, username, authUser } = props;

  return useQueryWithSideEffects({
    queryKey: ["buyer", username],
    queryFn: () => getBuyerByName(username),
    enabled: !!authUser && !isBuyer,
    onSuccess: (data) => {
      // console.log("@@@@@@@@@@ buyer data is ", data);
      // todo - setOtherBuyer to the zustand store
    },
  });
};
