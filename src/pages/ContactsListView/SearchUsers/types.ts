import type { UseFormikFieldPropsReturn } from "@/components/Form/helpers/useFormikFieldProps";
import type { SearchForUsersByHandleQuery } from "@/graphql/types";
import type { useLazyQuery } from "@apollo/client/react/hooks";

/**
 * TextInput props are mapped to more specific keys to avoid collisions
 * with other values, potential errors, etc.
 */
export type SearchFieldProps = {
  [K in keyof UseFormikFieldPropsReturn<string> as K extends "value"
    ? "searchFieldValue"
    : K extends "label"
    ? "searchFieldLabel"
    : K extends "error"
    ? "searchFieldHasError"
    : K extends "helperText"
    ? "searchFieldErrMsg"
    : K]: UseFormikFieldPropsReturn<string>[K];
};

/**
 * This reflects the type of value the user is typing into the search field,
 * as determined by regex-tests.
 */
export type SearchUsersInputType = "handle" | "phone" | "email" | null;

/**
 * This reflects the type of value the user is typing into the search field, and
 * corresponds to a specific GQL query or mutation:
 *
 * | `Type of User Input` | `Input Action Type` | `Resultant GQL Operation`  |
 * | :------------------: | :-----------------: | :------------------------- |
 * |        handle        |      "search"       | SearchForUserByHandleQuery |
 * |        phone         |      "invite"       | CreateInvite               |
 * |        email         |      "invite"       | CreateInvite               |
 * |       _empty_        |        null         | N/A                        |
 */
export type SearchUsersInputActionType = "search" | "invite" | null;
export type SearchUsersInputActionTypeProp = {
  inputActionType: SearchUsersInputActionType;
};

export type RunSearchUsersLazyQuery = ReturnType<
  typeof useLazyQuery<SearchForUsersByHandleQuery, { handle: string }>
>[0];

/**
 * Will be true if any query or mutation is loading
 */
export type SearchUsersLoadingProp = {
  isAnythingLoading: boolean;
};
