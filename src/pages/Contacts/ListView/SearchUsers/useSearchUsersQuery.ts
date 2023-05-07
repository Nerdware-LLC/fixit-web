import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql/queries";
import { MOCK_USERS } from "@/__tests__/mockItems";
import { helpers } from "./helpers";
import type { Contact } from "@graphql/types";

// FIXME rm mocks

/**
 * This hook will automatically run the `SearchForUsersByHandle` query once per
 * second when the following are true:
 *
 *     1. The input is focused.
 *     2. The input has a value, and the value beings with "@" followed by at least
 *        one alphanumeric character or underscore.
 *     3. The query is neither loading nor in an error state.
 */
export const useSearchUsersQuery = ({
  searchFieldValue,
  isInputFocused,
}: {
  searchFieldValue: string;
  isInputFocused: boolean;
}) => {
  const [runSearchUsers, { data, loading, error }] = useLazyQuery(
    QUERIES.SEARCH_FOR_USERS_BY_HANDLE,
    {
      // FIXME pollInterval is available here, might be able to use it to replace all the timeout stuff in this hook
      // There are also `startPolling` and `stopPolling` methods available on the query result object!

      fetchPolicy: "no-cache", // TODO configure a typePolicy to handle caching these results
      // fetchPolicy: "network-only" // doesn't check cache, BUT stores result in cache
    }
  );

  // Debounced query execution
  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout> | undefined;

    if (
      isInputFocused &&
      helpers.isValidHandleForSearchUsersQuery(searchFieldValue) &&
      !loading &&
      !error
    ) {
      timeoutID = setTimeout(() => {
        runSearchUsers({ variables: { handle: searchFieldValue } });
      }, 1000);
    }
    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputFocused, searchFieldValue]);

  return {
    // query results:
    searchUsersQuery: {
      // eslint-disable-next-line
      data: true
        ? // isInputFocused && helpers.isValidHandleForSearchUsersQuery(searchFieldValue)
          Object.entries(MOCK_USERS).reduce((acc: Array<Contact>, [userDisplayName, user]) => {
            if (acc.length < 10)
              // if (acc.length <= 10 && user.handle.startsWith(searchFieldValue))
              acc.push({
                id: user.id,
                handle: user.handle,
                email: user.email,
                phone: user.phone,
                profile: user.profile,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              });
            return acc;
          }, [])
        : null,
      // FIXME rm mocks, uncomment below (correct logic below)
      // data: data?.searchForUsersByHandle ?? null,
      loading,
      error,
    },
    // return the query fn so it can be called manually
    runSearchUsers,
  };
};
