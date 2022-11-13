const fmtNumAsStr = (num: number, opts: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat("en-US", opts).format(num);
};

const currencyOpts = { style: "currency", currency: "USD" };
const percentageOpts = { style: "percent" };

export const formatNum = {
  toCurrencyStr: (num: number) => fmtNumAsStr(num, currencyOpts),
  toPercentageStr: (num: number) => fmtNumAsStr(num, percentageOpts)
};
