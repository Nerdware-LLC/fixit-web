import { oneOfType, object, array } from "prop-types";

export const styleType = oneOfType([object, array]);
