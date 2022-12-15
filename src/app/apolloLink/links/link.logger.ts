import { ApolloLink } from "@apollo/client/link/core";
import { logger } from "@utils";

// NOTE: maybe look into swapping this for apollo-link-logger
// https://github.com/blackxored/apollo-link-logger

export const loggerLink = new ApolloLink((operation, forward) => {
  logger.gql(`Starting operation '${operation.operationName}'...`);
  operation.setContext({ start: Date.now() });

  return forward(operation).map((response) => {
    const responseTime = Date.now() - operation.getContext().start;
    // prettier-ignore
    logger.gql(`'${operation.operationName}' operation complete, response time: ${responseTime} ms${operation.operationName !== "IntrospectionQuery" ? `, response = ${JSON.stringify(response, null, 2)}` : ""}`);
    return response;
  });
});
