import { createGig, updateGig } from "@/api/gigs/gig.service";
import { UseCreateGigProps, UseUpdateGigProps } from "@/api/gigs/gig.types";
import { CreateGigPayload, UpdateGigPayload } from "@/schemas";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

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

export const useUpdateGig = (props: UseUpdateGigProps) => {
  // ** Props
  const { setError } = props;

  return useMutation({
    mutationFn: (data: UpdateGigPayload) => updateGig(data),

    onSuccess: (data) => {
      toast.success("Gig updated successfully");
      // reset();
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },
  });
};
