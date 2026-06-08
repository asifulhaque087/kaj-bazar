// export const catchError = async <T, E = Error>(
//   promise: Promise<T>
// ): Promise<[E | null, T]> => {
//   try {
//     const result = await promise;
//     return [null, result];
//   } catch (error: unknown) {
//     return [error as E, undefined as T];
//   }
// };

// export const tryit = async <T, E = Error>(
//   promise: Promise<T>,
// ): Promise<[T | null, E | null]> => {
//   try {
//     const data = await promise;
//     return [data, null];
//   } catch (error) {
//     return [null, error as E];
//   }
// };

// ============

// export type TryItResult<T, E> = [T, null] | [null, E];

// export const tryit = async <T, E = Error>(
//   promise: Promise<T>,
// ): Promise<TryItResult<T, E>> => {
//   try {
//     const data = await promise;
//     return [data, null];
//   } catch (error) {
//     return [null, error as E];
//   }
// };

export const tryit = async <T, E = Error>(
  promise: Promise<T>,
): Promise<[T, E | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    // We cast null to T to satisfy the signature.
    // This is "safe" ONLY because you promise to check the error first.
    // return [null as any, error as E];
    return [undefined as T, error as E];
  }
};
