export const getDifferenceBetweenTwoDates = (
  startingDateString?: string,
  endingDateString?: string
) =>
  startingDateString && endingDateString
    ? new Date(endingDateString).getTime() -
      new Date(startingDateString).getTime()
    : 0;
