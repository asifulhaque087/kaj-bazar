import { LoginForm } from "@/schemas";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}

export interface UseLoginProps {
  setError: UseFormSetError<LoginForm>;
  reset: UseFormReset<LoginForm>;
  setShowModal: Dispatch<SetStateAction<number>>;
}
