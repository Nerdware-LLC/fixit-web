import { getTypeSafeError } from "./getTypeSafeError.js";

describe("getTypeSafeError()", () => {
  test("returns an Error instance when called with an Error object", () => {
    const result = getTypeSafeError(new Error("test"));
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("test");
  });
  test("returns an Error instance when called with null", () => {
    const result = getTypeSafeError(null, "test");
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("test");
  });
  test("returns an Error instance when called with undefined", () => {
    const result = getTypeSafeError(undefined, "test");
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("test");
  });
  test(`returns an Error instance with "message" set to a string provided as the first argument`, () => {
    const result = getTypeSafeError("test");
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("test");
  });
  test(`returns an Error instance with a "message" of "An unknown error occurred." when called with an object that doesn't contain a "message" property`, () => {
    const input = { test: "test" };
    const result = getTypeSafeError(input);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("An unknown error occurred.");
  });
});
