import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client/react/hooks";
import { styled } from "@mui/material/styles";
import AutoComplete, { type AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import Backdrop from "@mui/material/Backdrop";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import { useFormikFieldProps } from "@components/Form/useFormikFieldProps";
import { MUTATIONS } from "@graphql/mutations";
import { QUERIES } from "@graphql/queries";
import { SearchUsersContactOptionListItem } from "./SearchUsersContactOptionListItem";
import { SearchUsersInputAdornmentBtn } from "./SearchUsersInputAdornmentBtn";
import { SearchUsersPopperContent } from "./SearchUsersPopperContent";
import { ariaElementIDs } from "./classNames";
import { helpers } from "./helpers";
import { useSearchUsersQuery } from "./useSearchUsersQuery";
import type { Contact } from "@graphql/types";
import type { SearchUsersInputActionType } from "./types";

/**
 * **Search Users Input**
 *
 * ##### Popper Opening Logic:
 *
 * - If INPUT-TYPE is HANDLE, check for SELECTED-OPTION
 *   - If there's a SELECTED-OPTION, show CreateContact prompt
 *   - If there's no SELECTED-OPTION, the AutoComplete comp handles the rest:
 *     - If VALUE matches 2+ users, the AutoComplete comp shows the list,
 *     - If VALUE matches 0 existing users, the AutoComplete comp shows a no-matches message
 *
 * - If INPUT-TYPE is PHONE, check if VALUE is valid
 *   - If VALUE is valid, show CreateInvite prompt
 *   - If VALUE is invalid, the Formik comp will cause `searchFieldHasError` to be true
 *
 * - If INPUT-TYPE is EMAIL, only validate onBlur
 */
export const SearchUsersInput = ({ id: formikFieldID }: SearchUsersInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shouldUseMuiBackdrop, setShouldUseMuiBackdrop] = useState<boolean>(false);
  const [popperAnchorEl, setPopperAnchorEl] = useState<HTMLElement | null>(null);
  const popperAnchorElRef = useRef<HTMLDivElement | null>(null);

  // TEXT FIELD PROPERTIES
  const [
    {
      id,
      value: searchFieldValue,
      error: searchFieldHasError,
      helperText: searchFieldErrMsg,
      onBlur: handleSearchFieldBlur,
      onChange: handleSearchFieldChange,
      label: emptyValueLabel,
      ...textInputProps
    },
    { setValue: setSearchFieldValue, setError: setSearchFieldError },
  ] = useFormikFieldProps({
    id: formikFieldID,
    label: "Search & Invite Users",
    shouldAlwaysRenderHelperText: false,
  });

  // EFFECT 1: clear any truthy selectedOption if searchFieldValue changes
  useEffect(() => {
    if (!!selectedOption && selectedOption !== searchFieldValue) {
      setSelectedOption(null);
    }
  }, [searchFieldValue, selectedOption]);

  // EFFECT 2: clear popperAnchorEl if searchFieldValue becomes invalid
  useEffect(() => {
    if (!!popperAnchorEl && isInputFocused && !helpers.isValidSearchFieldValue(searchFieldValue)) {
      setPopperAnchorEl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFieldValue]);

  // SEARCH USERS QUERY
  const {
    searchUsersQuery: { data: searchUsersQueryData },
    runSearchUsers,
  } = useSearchUsersQuery({ searchFieldValue, isInputFocused });

  // CREATE CONTACT MUTATION
  const [createContact, { loading: createContactMutationLoading }] = useMutation(
    MUTATIONS.CREATE_CONTACT,
    {
      update(cache, { data }) {
        if (data?.createContact) {
          cache.updateQuery({ query: QUERIES.MY_CONTACTS }, (cacheData) => ({
            myContacts: [...(cacheData?.myContacts ?? []), data.createContact],
          }));
        }
      },
    }
  );

  // CREATE INVITE MUTATION
  const [createInvite, { loading: createInviteMutationLoading }] = useMutation(
    MUTATIONS.CREATE_INVITE,
    { fetchPolicy: "no-cache" }
  );

  // reduce searchUsersQueryData into options and optionsByHandle
  const { options, optionsByHandle } = searchUsersQueryData?.reduce(
    (
      acc: { options: Array<Contact>; optionsByHandle: Record<string, Contact> },
      { handle, ...contactFields }
    ) => ({
      options: [...acc.options, { handle, ...contactFields }],
      optionsByHandle: {
        ...acc.optionsByHandle,
        [handle]: { handle, ...contactFields },
      },
    }),
    { options: [], optionsByHandle: {} }
  ) ?? { options: [], optionsByHandle: {} };

  // INPUT TYPE
  const inputType = helpers.getInputType(searchFieldValue);
  const inputActionType = helpers.getInputActionType(searchFieldValue, inputType);

  // POPPER HANDLERS

  const handleOpenPopper = ({ showMuiBackdrop }: { showMuiBackdrop?: boolean } = {}) => {
    setPopperAnchorEl(popperAnchorElRef.current);
    if (showMuiBackdrop) setShouldUseMuiBackdrop(true);
  };

  const handleClosePopper = () => {
    setPopperAnchorEl(null);
    setShouldUseMuiBackdrop(false);
    if (selectedOption) setSelectedOption(null);
  };

  // EFFECT 3: POPPER OPENING LOGIC
  useEffect(() => {
    // Check if input has FOCUS: if yes, check for ERROR, else do nothing
    if (isInputFocused) {
      // If ERROR, open popper to show error message, else check VALUE
      if (searchFieldHasError) {
        handleOpenPopper();
      } else if (searchFieldValue.length > 0) {
        // If VALUE is empty, do nothing, else get INPUT-TYPE
        const inputType = helpers.getInputType(searchFieldValue);
        // If inputType isn't email, validate (email is only validated onBlur)
        if (
          (inputType === "handle" && selectedOption) ||
          (inputType === "phone" && helpers.isValidPhoneForCreateInvite(searchFieldValue))
        ) {
          handleOpenPopper({ showMuiBackdrop: true });
        }
      }
    }
  }, [isInputFocused, searchFieldHasError, searchFieldValue, selectedOption]);

  // ACTION BUTTON HANDLER
  const handleClickActionBtn = async () => {
    if (inputType === "handle") {
      if (selectedOption) {
        const contactUserID = options.find((opt) => opt.handle === selectedOption)?.id;

        if (contactUserID) {
          // TODO Add `createContact` loading/error/onComplete handling
          await createContact({ variables: { contactUserID } });
        }
      } else {
        // TODO Add `runSearchUsers` loading/error/onComplete handling
        await runSearchUsers({ variables: { handle: searchFieldValue } });
      }
    } else {
      // TODO Add `createInvite` loading/error/onComplete handling
      await createInvite({ variables: { phoneOrEmail: searchFieldValue } });
    }
    handleClosePopper();
    setSearchFieldValue("");
    // TODO Clear searchFieldValue only if mutation is successful, else show error
    // TODO If mutation is successful, show Success msg/lottie/feedback
  };

  return (
    <>
      <Backdrop open={!!popperAnchorEl && shouldUseMuiBackdrop} />
      <AutoComplete<string, false, false, true>
        id={id}
        options={options.map((opt) => opt.handle)}
        open={
          isInputFocused &&
          inputActionType === "search" &&
          Array.isArray(options) && // "options" will be searchUsersQueryData
          !selectedOption
        }
        ref={popperAnchorElRef}
        aria-describedby={ariaElementIDs.popperRoot}
        // STATE VALUES AND CHANGE-HANDLERS:
        value={selectedOption}
        onChange={(event, value) => {
          handleSearchFieldChange(value); // value: string | null
          setSelectedOption(value);
        }}
        inputValue={searchFieldValue}
        onInputChange={(event, value) => {
          setSearchFieldValue(value);
          if (searchFieldHasError) setSearchFieldError(undefined);
        }}
        // INPUT EVENT STATE HANDLERS:
        onFocus={() => setIsInputFocused(true)}
        onBlur={(event) => {
          setIsInputFocused(false);
          handleSearchFieldBlur(event);
          if (inputType === "email" && helpers.isValidEmailForCreateInvite(searchFieldValue)) {
            handleOpenPopper({ showMuiBackdrop: true }); // the other input types are validated in a useEffect
          }
        }}
        onOpen={() => {
          // This ensures the error-popper is never shown when the AutoComplete-popper is open
          if (searchFieldHasError) setSearchFieldError(undefined);
        }}
        onClose={(event, reason) => {
          // reason can be "toggleInput" | "escape" | "selectOption" | "removeOption" | "blur"
          if (reason === "escape") setSearchFieldValue("");
        }}
        // behaviorial props:
        freeSolo
        autoComplete
        autoHighlight
        clearOnEscape
        selectOnFocus
        // render props:
        noOptionsText={`No users matched "${searchFieldValue}"`}
        renderOption={(props: React.HTMLAttributes<HTMLLIElement>, handle: string) => (
          <SearchUsersContactOptionListItem contact={optionsByHandle[handle]} {...props} />
        )}
        renderInput={({ InputProps, ...params }: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            {...textInputProps}
            // prettier-ignore
            label={!inputActionType ? emptyValueLabel : inputActionType === "search" ? "Search Users" : "Send an Invite"}
            placeholder="@handle / phone / email"
            InputProps={{
              ...InputProps,
              endAdornment: (
                <SearchUsersInputAdornmentBtn
                  inputType={inputType}
                  searchFieldValue={searchFieldValue}
                  searchFieldHasError={searchFieldHasError}
                  showLoadingIndicator={createContactMutationLoading || createInviteMutationLoading}
                  emptyValueTooltip={emptyValueLabel}
                  handleDoAction={handleClickActionBtn}
                  isPopperOpen={!!popperAnchorEl}
                />
              ),
            }}
          />
        )}
      />
      <StyledPopper
        id={ariaElementIDs.popperRoot}
        open={!!popperAnchorEl && !!inputActionType}
        anchorEl={popperAnchorEl}
        aria-labelledby={ariaElementIDs.popperRoot}
        aria-describedby={ariaElementIDs.popperContentDescription}
        placement="bottom-end"
        disablePortal // <-- necessary for nesting Popper in Modal on mobile
        transition
        onKeyDown={(event) => {
          if (event.key === "Escape") setPopperAnchorEl(null);
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <SearchUsersPopperContent
              searchFieldHasError={searchFieldHasError}
              inputType={inputType}
              inputActionType={inputActionType as NonNullable<SearchUsersInputActionType>} // won't open if null
              addContactUser={inputActionType === "search" && selectedOption ? optionsByHandle[selectedOption] : null} // prettier-ignore
              sendInviteTo={inputActionType === "invite" ? searchFieldValue : null}
              handleDoAction={handleClickActionBtn}
              handleClose={handleClosePopper}
            />
          </Grow>
        )}
      </StyledPopper>
    </>
  );
};

const StyledPopper = styled(Popper)(({ theme: { variables } }) => ({
  zIndex: 1202,
  minWidth: variables.isMobilePageLayout ? "min(100%, calc(100dvw - 2rem))" : "14rem", // 14rem = width of non-mobile CreateItemButton
  maxWidth: "calc(100dvw - 2rem)",
}));

export type SearchUsersInputProps = {
  id: string;
};
