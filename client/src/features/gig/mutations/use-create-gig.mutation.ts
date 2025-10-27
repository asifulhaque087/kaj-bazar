import { createGig } from "@/features/gig/api/mutations.api";
import {
  CreateGigForm,
  CreateGigPayload,
} from "@/features/gig/schemas/gig.schema";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

interface UseCreateGigProps {
  setError: UseFormSetError<CreateGigForm>;
  reset: UseFormReset<CreateGigForm>;
}

export const useCreateGig = (props: UseCreateGigProps) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: CreateGigPayload) => createGig(data),

    onSuccess: (data) => {
      toast.success("Gig created successfully");
      reset();
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },
  });
};
