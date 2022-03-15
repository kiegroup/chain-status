export const alphabeticallySort = (
  a: string | undefined,
  b: string | undefined
) => (a && b ? (a < b ? -1 : a > b ? 1 : 0) : 0);