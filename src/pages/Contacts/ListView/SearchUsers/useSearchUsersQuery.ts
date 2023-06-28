import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql/queries";
import { helpers } from "./helpers";

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
      fetchPolicy: "network-only",
      // This query won't check cache, but results are stored in cache for other comps to use.
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
      data: data?.searchForUsersByHandle ?? null,
      loading,
      error,
    },
    // return the query fn so it can be called manually
    runSearchUsers,
  };
};
