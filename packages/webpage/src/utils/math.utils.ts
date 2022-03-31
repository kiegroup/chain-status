export const calculateAverage = (numbers: number[]) => {
  return numbers.length > 0
    ? numbers.reduce((acc, curr) => (acc += curr), 0) / numbers.length
    : undefined;
};
