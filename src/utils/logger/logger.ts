import { getLogFnFromTemplate } from "./loggerTemplate";

export const logger = {
  auth: getLogFnFromTemplate("AUTH"),
  stripe: getLogFnFromTemplate("STRIPE"),
  debug: getLogFnFromTemplate("DEBUG"),
  info: getLogFnFromTemplate("INFO"),
  error: getLogFnFromTemplate("ERROR"),
  gql: getLogFnFromTemplate("GQL"),
  gqlError: getLogFnFromTemplate("GQL-ERROR")
};
