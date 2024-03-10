import { prettifyPhoneNum, prettifyBizName } from "./strings";

describe("formatters/strings", () => {
  describe("prettifyPhoneNum()", () => {
    test(`formats a valid phone number string into a "pretty" format`, () => {
      expect(prettifyPhoneNum("1234567890")).toBe("(123) 456-7890");
      expect(prettifyPhoneNum(" 1234567890 ")).toBe("(123) 456-7890");
      expect(prettifyPhoneNum(" +(123)4567890  ")).toBe("(123) 456-7890");
    });

    test("throws an error if shouldValidate is true and the input is an empty string", () => {
      expect(() => {
        prettifyPhoneNum("");
      }).toThrowError('Phone number formatter received an invalid value: ""');
    });
  });

  describe("prettifyBizName()", () => {
    test("capitalizes the first letter of each word in the provided string arg", () => {
      expect(prettifyBizName("foo bar baz")).toBe("Foo Bar Baz");
      expect(prettifyBizName("FOO BAR BAZ")).toBe("Foo Bar Baz");
      expect(prettifyBizName("foo BAR baz")).toBe("Foo Bar Baz");
    });

    test("uppercases common business name acronyms", () => {
      expect(prettifyBizName("foo bar llc baz")).toBe("Foo Bar LLC Baz");
      expect(prettifyBizName("foo bar inc baz")).toBe("Foo Bar INC Baz");
      expect(prettifyBizName("foo bar co baz")).toBe("Foo Bar CO Baz");
      expect(prettifyBizName("foo bar corp baz")).toBe("Foo Bar CORP Baz");
      expect(prettifyBizName("foo bar ltd baz")).toBe("Foo Bar LTD Baz");
      expect(prettifyBizName("foo bar lp baz")).toBe("Foo Bar LP Baz");
    });

    test("does not throw when provided an empty string", () => {
      expect(prettifyBizName("")).toBe("");
    });
  });
});
