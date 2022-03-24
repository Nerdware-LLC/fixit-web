const fmtNumAsStr = (num, opts) => {
  return new Intl.NumberFormat("en-US", opts).format(num);
};

const currencyOpts = { style: "currency", currency: "USD" };
const percentageOpts = { style: "percent" };

export const formatNum = {
  toCurrencyStr: num => fmtNumAsStr(num, currencyOpts),
  toPercentageStr: num => fmtNumAsStr(num, percentageOpts)
};
