import { capitalizeFirstLetterOnly } from "./capFirstLetterOnly";

export const prettifySnakeCaseAndCapFirstLetters = (string: string) => {
  return string
    .split("_")
    .map((word) => capitalizeFirstLetterOnly(word))
    .join(" ");
};

export const convertSnakeCaseToCamel = (string: string) => {
  return string
    .split("_")
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalizeFirstLetterOnly(word)))
    .join("");
};
