// ** --- DataType ---

import {
  createOrder,
  deliverWork,
  startOrder,
} from "@/api/orders/order.service";
import {
  CreateOrderPayload,
  DeliveredWorkPayload,
  StartOrderPayload,
} from "@/schemas";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";

export const useCreateOrder = () => {
  // ** Props
  // const { reset, setError } = props;

  // ** hooks
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => createOrder(data),

    onSuccess: (order) => {
      // toast.success("");
      // reset();
      router.push(`/order/${order.id}/start-order`);
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      // errors.forEach((err) =>
      //   setError(err.field as "root", { message: err.message })
      // );
    },
  });
};

export const useStartOrder = () => {
  // ** hooks
  const router = useRouter();

  return useMutation({
    mutationFn: (data: StartOrderPayload) => startOrder(data),

    onSuccess: (order) => {
      router.push(`/order/${order.id}/activity`);
    },

    onError: (error: AxiosError) => {},
  });
};

export const useDeliverWork = () => {
  // ** hooks
  // const router = useRouter();

  return useMutation({
    mutationFn: (data: DeliveredWorkPayload) => deliverWork(data),

    onSuccess: (order) => {
      // router.push(`/order/${order.id}/activity`);
    },

    onError: (error: AxiosError) => {},
  });
};
