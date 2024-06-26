/**
 * Formats a phone number string into a "pretty" format.
 * @param phoneNum The phone number string to format.
 * @returns The formatted phone number string.
 */
export const prettifyPhoneNumStr = (phoneNum: string): string => {
  return `(${phoneNum.substring(0, 3)}) ${phoneNum.substring(3, 6)}-${phoneNum.substring(6, 11)}`;
};
