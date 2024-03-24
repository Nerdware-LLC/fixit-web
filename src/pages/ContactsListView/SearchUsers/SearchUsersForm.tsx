import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { backdropClasses } from "@mui/material/Backdrop";
import { formLabelClasses } from "@mui/material/FormLabel";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { modalClasses } from "@mui/material/Modal";
import { Form, formClassNames, type FormValidationFunction } from "@/components/Form";
import { SearchUsersInput } from "./SearchUsersInput";
import { searchUsersInputClassNames as classNames } from "./classNames";
import { helpers } from "./helpers";

export const SearchUsersForm = () => (
  <StyledDiv className={classNames.root}>
    <Form
      initialValues={{ searchField: "" }}
      validate={validateSearchUsersForm}
      validateOnChange={false}
      onSubmit={() => {}} // Input submission is handled by the SearchUsersInput component
    >
      <SearchUsersInput id="searchField" />
    </Form>
  </StyledDiv>
);

/**
 * This function is used to validate the `searchField` input value, and is called by
 * Formik's `validate` prop. An outline of the validation logic is as follows:
 *
 * 1. First, if value is empty/falsey, return undefined.
 * 2. If value is truthy, determine whether user is typing a HANDLE, PHONE, or EMAIL.
 *    This value is stored in the `inputType` variable.
 *    - If `inputType` is `"handle"`, the related GQL operation is `SearchForUsersByHandle`,
 *      a search-style query which only requires part of a `handle` string, so the validator
 *      function only checks the first 2 characters as required by the query spec.
 *    - If `inputType` is `"phone"` or `"email"`, the related GQL operation is `CreateUserInvite`,
 *      a mutation which requires either a fully-valid US phone number or email address, so
 *      the `isValidInputForCreateInvite` helper method is called to check the entire value.
 * 3. If the relevant validator function returns `false`, return an error message
 *    specific to the `inputType`, else return undefined.
 */
const validateSearchUsersForm: FormValidationFunction<{ searchField: string }> = ({
  searchField: searchFieldValue,
}) => {
  if (!searchFieldValue) return;

  const inputType = helpers.getInputType(searchFieldValue);

  return !helpers.isValidFinalValue(searchFieldValue, inputType)
    ? { searchField: `Invalid ${inputType ?? "value"}` }
    : undefined;
};

const StyledDiv = styled("div")(({ theme: { palette, variables } }) => ({
  minWidth: "14rem",
  width: variables.isMobilePageLayout ? "100%" : "14rem", // 14rem = width of non-mobile CreateItemButton
  borderRadius: "0.25rem",

  // Form
  [`& .${formClassNames.root}`]: {
    minWidth: "14rem",
    width: "100%",

    // Mui Autocomplete
    [`& .${autocompleteClasses.root}`]: {
      minWidth: "14rem",
      width: "100%",
      borderRadius: "inherit",
      backgroundColor: variables.isMobilePageLayout
        ? palette.background.default
        : palette.background.paper,

      ...(palette.mode === "light" && {
        border: `1px solid ${palette.divider}`,
      }),
    },

    // Mui Backdrop (exclude Modal-backdrop used on mobile)
    [`& .${backdropClasses.root}:not(.${modalClasses.backdrop})`]: {
      height: "100vh",
      width: "100vw",
      zIndex: 1201, // Mui Drawer zIndex is 1200
    },

    // FormLabel (when not focused)
    [`& .${formLabelClasses.root}:not(.${inputLabelClasses.shrink})`]: {
      lineHeight: "1.6rem", // nudges it down a bit to be inline w InputAdornment
    },

    // InputBase
    [`& .${inputBaseClasses.root}`]: {
      textOverflow: "ellipsis",

      [`& > .${inputBaseClasses.input}::placeholder`]: {
        fontSize: "0.75rem",
      },
    },
  },
}));
