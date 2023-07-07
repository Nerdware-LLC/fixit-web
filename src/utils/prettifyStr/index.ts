import { capitalizeFirstLetterOnly } from "./capFirstLetterOnly";
import { prettifyCurrency } from "./currency";
import { prettifyPhoneNum } from "./phone";
import * as snakeCase from "./snakeCase";

/**
 * A utility object with helper methods for "prettifying" strings.
 */
export const prettifyStr = {
  capFirstLetterOnly: capitalizeFirstLetterOnly,
  phone: prettifyPhoneNum,
  currency: prettifyCurrency,
  snakeCase: snakeCase.prettifySnakeCaseAndCapFirstLetters,
  snakeCaseToCamel: snakeCase.convertSnakeCaseToCamel,
};
