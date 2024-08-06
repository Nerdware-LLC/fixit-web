import { ApolloLink } from "@apollo/client/link/core";
import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { logger } from "@/utils/logger.js";

/**
 * **Apollo Link: logger** - Logs all requests and responses
 */
export const loggerLink = new ApolloLink((operation, forward) => {
  const { operationName } = operation;

  logger.gqlInfo(`Starting operation "${operationName}"...`);

  operation.setContext({ start: Date.now() });

  return forward(operation).map((response) => {
    const responseTime = Date.now() - operation.getContext().start;
    const responseTimeLogMsg = `Operation "${operationName}" completed in ${responseTime} ms`;

    logger.gqlInfo(
      responseTimeLogMsg +
        (operationName !== "IntrospectionQuery"
          ? `, response = ${safeJsonStringify(response, null, 2)}`
          : "")
    );

    return response;
  });
});
