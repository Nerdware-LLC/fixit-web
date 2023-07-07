export const isValidCurrencyInput = (input: string) => {
  return /^[1-9]+(\.\d{2})?$/.test(input);
};

export const formatCurrencyStrToInt = (currencyAmountStr: string) => {
  if (!isValidCurrencyInput(currencyAmountStr)) {
    throw new Error("Invalid currency input.");
  }

  // Now we just need to see whether or not they included a decimal.
  return /\.\d{2}$/.test(currencyAmountStr)
    ? parseInt(currencyAmountStr.replace(".", ""), 10) // Remove decimal
    : parseInt(`${currencyAmountStr}00`, 10); // No decimal, append 00
};
