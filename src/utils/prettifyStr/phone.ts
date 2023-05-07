export const prettifyPhoneNum = (phoneNum: string) => {
  return typeof phoneNum === "string" && /^\d{10}$/.test(phoneNum)
    ? _prettifyPhoneNum(phoneNum)
    : phoneNum;
};

/**
 * **WARNING:** Only use this function if you have already validated the input
 */
export const _prettifyPhoneNum = (phoneNum: string) => {
  return `(${phoneNum.substring(0, 3)}) ${phoneNum.substring(3, 6)}-${phoneNum.substring(6, 11)}`;
};
