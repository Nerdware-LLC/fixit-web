const currencyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const currencyRoundedFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const percentageFmt = new Intl.NumberFormat("en-US", { style: "percent" });

/**
 * These methods take as an argument a *WHOLE* integer (do not include any decimal
 * places), divides it by 100, and returns a string representation based on expected
 * units using the `en-US` locale.
 *
 * | Method                 | Arg      | Output        |
 * | :--------------------- | :------- | :------------ |
 * | `toCurrencyStr`        | `123456` | `"$1,234.56"` |
 * | `toCurrencyRoundedStr` | `123456` | `"$1,235"`    |
 * | `toPercentageStr`      | `1234`   | `"1,234%"`    |
 */
export const formatNum = {
  toCurrencyStr: (num: number) => currencyFmt.format(num / 100),
  toCurrencyRoundedStr: (num: number) => currencyRoundedFmt.format(num / 100),
  toPercentageStr: (num: number) => percentageFmt.format(num / 100),
};
