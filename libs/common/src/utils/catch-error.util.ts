export const catchError = async <T, E = Error>(
  promise: Promise<T>
): Promise<[E | null, T]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error: unknown) {
    return [error as E, undefined as T];
  }
};