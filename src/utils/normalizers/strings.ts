/**
 * Removes all non-numeric characters from a phone number string.
 * - Example: converts `"(888) 123-4567"` into `"8881234567"`
 *
 * @param phoneNumber - The phone number as a string.
 * @returns The phone number with all non-numeric characters removed.
 */
export const normalizePhone = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, "");
};
