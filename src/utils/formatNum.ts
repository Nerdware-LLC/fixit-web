const intlCurrencyFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const intlPercentageFmt = new Intl.NumberFormat("en-US", { style: "percent" });

export const formatNum = {
  toCurrencyStr: (num: number) => intlCurrencyFmt.format(num),
  toPercentageStr: (num: number) => intlPercentageFmt.format(num)
};
