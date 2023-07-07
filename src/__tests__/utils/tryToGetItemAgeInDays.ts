/**
 * If an object with a `createdAt` Date property is provided as an argument, this
 * function returns the age of the Date in days.
 */
export const tryToGetItemAgeInDays = (maybeItem?: unknown) => {
  if (
    maybeItem &&
    typeof maybeItem === "object" &&
    "createdAt" in maybeItem &&
    maybeItem?.createdAt instanceof Date
  ) {
    return Math.round(maybeItem.createdAt.getTime() / (1000 * 3600 * 24)); // divided by milliseconds per day
  }
};
