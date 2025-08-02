import { login } from "@/api/auth/auth.service";
import { UseLoginProps } from "@/api/auth/auth.types";
import { LoginForm } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useLogin = (props: UseLoginProps) => {
  // ** Props
  const { reset, setError, setShowModal } = props;

  // ** --- Store ---
  const { connectSocket } = useChatStore();
  const { setAuthUser } = useAuthStore();

  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginForm) => login(data),

    onSuccess: (data) => {
      // console.log("data of login is ", data.user);
      setAuthUser(data.user);
      connectSocket();

      toast.success("Login successfully");
      reset();
      setShowModal(-1);
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },

    onSettled: (_, error) => {},
  });
};

// // src/lib/api/users/users.queries.ts
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Using TanStack Query v5+
// import { getUsers, createUser, updateUser, deleteUser } from './users.service'; // Import service functions
// import { User, CreateUserPayload, UpdateUserPayload } from '@/lib/schemas';

// // Define your query keys
// export const USER_QUERY_KEYS = {
//   all: ['users'] as const,
//   lists: () => [...USER_QUERY_KEYS.all, 'list'] as const,
//   detail: (userId: string) => [...USER_QUERY_KEYS.all, 'detail', userId] as const,
// };

// export function useUsers() {
//   return useQuery({
//     queryKey: USER_QUERY_KEYS.lists(),
//     queryFn: getUsers,
//   });
// }

// export function useUser(userId: string) {
//   return useQuery({
//     queryKey: USER_QUERY_KEYS.detail(userId),
//     queryFn: () => getUsers().then(res => res.data.find(u => u.id === userId)), // Example: find from all, or make a dedicated getUserById service
//     enabled: !!userId, // Only run if userId exists
//   });
// }

// export function useCreateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: CreateUserPayload) => createUser(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() }); // Invalidate user list on successful creation
//     },
//     // Optional: onError, onSettled, etc.
//   });
// }

// export function useUpdateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ userId, payload }: { userId: string, payload: UpdateUserPayload }) => updateUser(userId, payload),
//     onSuccess: (data) => {
//       // Invalidate user list or update specific user in cache
//       queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
//       queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(data.data.id) }); // Update specific user detail
//     },
//   });
// }

// export function useDeleteUser() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (userId: string) => deleteUser(userId),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
//         },
//     });
// }
