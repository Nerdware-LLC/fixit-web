/**
 * Returns a "random" integer between the provided number args (inclusive).
 */
export const randomIntBetween = (num1: number, num2: number) => {
  const lowerBound = Math.min(num1, num2);
  const upperBound = Math.max(num1, num2);

  return Math.round(
    Math.max(
      lowerBound,
      Math.round(Math.random() * upperBound) // prettier-ignore
    )
  );
};
