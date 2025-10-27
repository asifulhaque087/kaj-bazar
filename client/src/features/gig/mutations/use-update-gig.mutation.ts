import { updateGig } from "@/features/gig/api/mutations.api";
import {
  UpdateGigForm,
  UpdateGigPayload,
} from "@/features/gig/schemas/gig.schema";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

interface UseUpdateGigProps {
  setError: UseFormSetError<UpdateGigForm>;
  // reset: UseFormReset<CreateGigForm>;
}

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
