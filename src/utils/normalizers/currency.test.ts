import { normalizeCurrencyStrToInt } from "./currency";

describe("normalizers/normalizeCurrencyStrToInt()", () => {
  test("returns the correct integer value for a currency string arg with two decimal places", () => {
    expect(normalizeCurrencyStrToInt("123.45")).toBe(12345);
  });

  test("returns the correct integer value for a currency string arg without decimal places", () => {
    expect(normalizeCurrencyStrToInt("123")).toBe(12300);
  });

  test("returns NaN for a non-numeric string arg", () => {
    expect(normalizeCurrencyStrToInt("abc")).toBeNaN();
  });

  test("returns 0 for an empty string arg", () => {
    expect(normalizeCurrencyStrToInt("")).toBe(0);
  });
});
