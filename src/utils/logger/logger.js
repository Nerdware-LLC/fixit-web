import colors from "colors";
import { getLogFnFromTemplate } from "./loggerTemplate";

export const logger = {
  debug: getLogFnFromTemplate("DEBUG"),
  error: getLogFnFromTemplate("ERROR", { messageColor: colors.red }),
  stripe: getLogFnFromTemplate("STRIPE", { messageColor: colors.green })
};
