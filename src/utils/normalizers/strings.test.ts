import { normalizePhone } from "./strings";

describe("normalizers/normalizePhone()", () => {
  test("removes all non-numeric characters from the input", () => {
    expect(normalizePhone("  (888) 123-4567  ")).toBe("8881234567");
  });
});
