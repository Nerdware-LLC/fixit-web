// prettier-ignore
export const prettifyPhoneNum = (phoneNum: string) => {
  return typeof phoneNum === "string" && /^\d{10}$/.test(phoneNum)
    ? `(${phoneNum.substring(0, 3)}) ${phoneNum.substring(3, 6)}-${phoneNum.substring(6, 11)}`
    : phoneNum;
};
