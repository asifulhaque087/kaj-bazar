import { Auth, LoginForm } from "@/schemas";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export const SELLER_QUERY_KEYS = {
  all: ["sellers"] as const, // Base key for all seller-related queries
  lists: () => [...SELLER_QUERY_KEYS.all, "list"] as const, // Key for a list of sellers
  detail: (sellerId: string) =>
    [...SELLER_QUERY_KEYS.all, "detail", sellerId] as const, // Key for a single seller's details
};

export interface UseLoginProps {
  setError: UseFormSetError<LoginForm>;
  reset: UseFormReset<LoginForm>;
  setShowModal: Dispatch<SetStateAction<number>>;
}

// import { useQuery } from '@tanstack/react-query';
// import { getSellers } from '../seller.service'; // Assuming this fetches a list
// import { SELLER_QUERY_KEYS } from '../seller.types';

// export function useSellersList() {
//   return useQuery({
//     queryKey: SELLER_QUERY_KEYS.lists(), // <--- Used here
//     queryFn: getSellers,
//   });
// }

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createSeller } from '../seller.service';
// import { SELLER_QUERY_KEYS } from '../seller.types';

// export function useCreateSeller() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload) => createSeller(payload),
//     onSuccess: () => {
//       // Invalidate the 'sellers' list query to trigger a refetch
//       queryClient.invalidateQueries({ queryKey: SELLER_QUERY_KEYS.lists() }); // <--- Used here
//     },
//   });
// }

// import { useQuery } from '@tanstack/react-query';
// import { getSellerById } from '../seller.service'; // Assuming this fetches a single seller
// import { SELLER_QUERY_KEYS } from '../seller.types';

// export function useSellerDetail(sellerId: string) {
//   return useQuery({
//     queryKey: SELLER_QUERY_KEYS.detail(sellerId), // <--- Used here
//     queryFn: () => getSellerById(sellerId),
//     enabled: !!sellerId, // Only fetch if ID is available
//   });
// }

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { updateSeller } from '../seller.service';
// import { SELLER_QUERY_KEYS } from '../seller.types';

// export function useUpdateSeller() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ sellerId, payload }) => updateSeller(sellerId, payload),
//     onSuccess: (updatedSeller) => {
//       // Invalidate the specific seller's detail query
//       queryClient.invalidateQueries({ queryKey: SELLER_QUERY_KEYS.detail(updatedSeller.id) }); // <--- Used here

//       // Or, perform an optimistic update on the specific seller's cache entry
//       // queryClient.setQueryData(SELLER_QUERY_KEYS.detail(updatedSeller.id), updatedSeller);
//     },
//   });
// }

// import { useQueryClient } from '@tanstack/react-query';

// // ... inside a component or function
// const queryClient = useQueryClient();
// const cachedSeller = queryClient.getQueryData(SELLER_QUERY_KEYS.detail('some-seller-id')); // <--- Used here
// if (cachedSeller) {
//   // Do something with cached data
// }

export interface LoginApi {
  message: string;
  user: Auth;
  token: string;
}
