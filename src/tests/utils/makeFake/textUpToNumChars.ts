import { faker } from "@faker-js/faker/locale/en_US";

/**
 * Returns lorem paragraph(s) of variable length, truncated to `numChars` max characters.
 *
 * If the text is truncated, a period suffix is added to ensure the text still syntacticly
 * resembles complete sentences.
 */
export const makeFakeTextUpToNumChars = (numChars: number = 255) => {
  let text = faker.lorem.text();

  text = `${text[0].toUpperCase()}${text.slice(1)}`;

  if (text.length > numChars) text = text.slice(0, numChars - 1);
  if (!text.endsWith(".")) text = `${text}.`;

  return text;
};
