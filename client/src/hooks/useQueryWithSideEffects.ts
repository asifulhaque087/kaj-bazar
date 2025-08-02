import { useEffect, useRef } from "react";
import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  QueryFunction,
  QueryObserverResult,
  DefaultError,
} from "@tanstack/react-query";

interface QuerySideEffectsCallbacks<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
}

export function useQueryWithSideEffects<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> &
    QuerySideEffectsCallbacks<TData, TError>
): QueryObserverResult<TData, TError> {
  const queryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>(options);

  const { isSuccess, isError, data, error } = queryResult;

  const onSuccessRef = useRef<((data: TData) => void) | undefined>(
    options.onSuccess
  );
  const onErrorRef = useRef<((error: TError) => void) | undefined>(
    options.onError
  );
  const onSettledRef = useRef<
    ((data: TData | undefined, error: TError | null) => void) | undefined
  >(options.onSettled);

  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
    onSettledRef.current = options.onSettled;
  }, [options.onSuccess, options.onError, options.onSettled]);

  useEffect(() => {
    if (isSuccess || isError) {
      if (onSettledRef.current) {
        onSettledRef.current(data, error);
      }
    }

    if (isSuccess && onSuccessRef.current) {
      onSuccessRef.current(data);
    }

    if (isError && onErrorRef.current) {
      onErrorRef.current(error);
    }
  }, [isSuccess, isError, data, error]);

  return queryResult;
}
