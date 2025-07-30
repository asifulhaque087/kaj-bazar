export const rating = (num: number): number => {
  if (num) {
    return Math.round(num * 10) / 10;
  }
  return 0.0;
};
export const shortenLargeNumbers = (data: number | undefined): string => {
  if (data === undefined) {
    return '0';
  }
  return millify(data, { precision: 0 });
};
