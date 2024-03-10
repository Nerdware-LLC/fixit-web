import { randomIntBetween } from "./random";

describe("numeric/random", () => {
  describe("randomIntBetween()", () => {
    test("returns a random integer between the provided number args (inclusive)", () => {
      const lowerBound = 1;

      [1, 2, 5, 10].forEach((upperBound) => {
        const randomInt = randomIntBetween(lowerBound, upperBound);
        expect(randomInt).toBeGreaterThanOrEqual(lowerBound);
        expect(randomInt).toBeLessThanOrEqual(upperBound);
      });
    });
  });
});
