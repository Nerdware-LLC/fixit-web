const intlCurrencyFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const intlPercentageFmt = new Intl.NumberFormat("en-US", { style: "percent" });

/**
 * These methods take as an argument a *WHOLE* integer (do not include any decimal places)
 * and returns a string representation based on expected units using the `en-US` locale.
 *
 * - toCurrencyStr `123456` becomes `"$1,234.56"`
 * - toPercentageStr `123` becomes `"123%"`
 */
export const formatNum = {
  toCurrencyStr: (num: number) => intlCurrencyFmt.format(num / 100),
  toPercentageStr: (num: number) => intlPercentageFmt.format(num)
};
