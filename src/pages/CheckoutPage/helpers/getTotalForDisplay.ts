import { isSafeInteger } from "@nerdware/ts-type-safety-utils";
import { intToCurrencyStr } from "@/utils/formatters/currency.js";
import type { OpenApiSchemas } from "@/types/open-api.js";

/**
 * > `The values used here are for DISPLAY PURPOSES ONLY and merely convey
 *   information to the user. All pricing/product info is stored and calculated
 *   by the backend API. Sending invalid pricing/product info to the server
 *   results a 400 response.`
 */
export const getPrice_FOR_DISPLAY_ONLY = <FormatOpts extends { formatAsCurrency?: boolean }>(
  price: number,
  discountPercentage?: OpenApiSchemas["PromoCodeInfo"]["discountPercentage"] | null, // 10 = 10% off
  { formatAsCurrency }: FormatOpts = {} as FormatOpts
) => {
  const priceWithDiscount = isSafeInteger(discountPercentage)
    ? price - price * (discountPercentage / 100)
    : price;

  const returnValue =
    formatAsCurrency === true ? intToCurrencyStr(priceWithDiscount) : priceWithDiscount;

  return returnValue as FormatOpts["formatAsCurrency"] extends true ? string : number;
};
