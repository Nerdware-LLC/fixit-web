import { oneOfType, string, number } from "prop-types";

export const idType = oneOfType([string, number]);
