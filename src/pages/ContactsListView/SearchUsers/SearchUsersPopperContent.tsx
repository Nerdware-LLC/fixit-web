import { forwardRef, useEffect } from "react";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import { iconButtonClasses } from "@mui/material/IconButton";
import Text from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import { ContactAvatar, avatarClassNames } from "@/components/Avatar";
import { CloseIconButton } from "@/components/Buttons/CloseIconButton";
import { prettifyPhoneNum } from "@/utils/formatters/strings";
import { InputRequirementsInfo, INPUT_INFO_TEXT } from "./InputRequirementsInfo";
import { ariaElementIDs, searchUsersInputClassNames as classNames } from "./classNames";
import type { Contact } from "@/graphql/types";
import type { SearchUsersInputType, SearchUsersInputActionType } from "./types";

export const SearchUsersPopperContent = forwardRef<HTMLDivElement, SearchUsersPopperContentProps>(
  function SearchUsersPopperContent(
    {
      searchFieldHasError = false,
      inputType,
      inputActionType,
      addContactUser,
      sendInviteTo,
      handleDoAction,
      handleClose,
      ...boxProps
    },
    fwdRef
  ) {
    // CLOSE POPPER IF USER PRESSES ESCAPE KEY
    useEffect(() => {
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") handleClose();
      };

      document.addEventListener("keydown", closeOnEscape);

      // Return a function from the effect that removes the event listener
      return () => document.removeEventListener("keydown", closeOnEscape);
    }, [handleClose]);

    const {
      titleText,
      titleVariant = "body1",
      actionButtonProps = null,
      bodyContent = null,
      errorMsgContent = null,
    } = searchFieldHasError
      ? {
          titleText: INPUT_INFO_TEXT[inputActionType]?.header ?? "",
          titleVariant: "body2",
          errorMsgContent: (
            <div className={classNames.popperErrorContentContainer}>
              <InputRequirementsInfo inputActionType={inputActionType} />
            </div>
          ),
        }
      : addContactUser
        ? {
            titleText: "Add Contact",
            actionButtonProps: { startIcon: <AddIcon /> },
            bodyContent: <ContactAvatar contact={addContactUser} viewContactOnClick={false} />,
          }
        : sendInviteTo
          ? {
              ...(inputType === "phone"
                ? {
                    titleText: "Text Invite",
                    actionButtonProps: { startIcon: <SendToMobileIcon /> },
                  }
                : {
                    titleText: "Email Invite",
                    actionButtonProps: { startIcon: <SendIcon /> },
                  }),
              bodyContent: (
                <div style={{ display: "flex", justifyContent: "center", gap: "0.55rem" }}>
                  <Text>To:</Text>
                  <Text>
                    {inputType === "phone" ? prettifyPhoneNum(sendInviteTo, false) : sendInviteTo}
                  </Text>
                </div>
              ),
            }
          : {
              /* This final fallback should never be reached, but is provided just in case an update
          breaks some SearchUsers component/logic, in which case an "empty" PopperContent window
          will be shown to prevent potential downstream errors that may crash the app.  */
              titleText: "",
            };

    return (
      <ClickAwayListener onClickAway={handleClose}>
        <StyledBox ref={fwdRef} {...boxProps}>
          <CloseIconButton onClick={handleClose} iconProps={{ fontSize: "small" }} />
          <Text id={ariaElementIDs.popperContentDescription} variant={titleVariant}>
            {titleText}
          </Text>
          {errorMsgContent}
          {(bodyContent ?? actionButtonProps) && (
            <div className={classNames.popperContentContainer}>
              {bodyContent}
              {actionButtonProps && (
                <Button
                  onClick={handleDoAction}
                  className={classNames.popperContentActionBtn}
                  {...actionButtonProps}
                >
                  {titleText}
                </Button>
              )}
            </div>
          )}
        </StyledBox>
      </ClickAwayListener>
    );
  }
);

const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  position: "relative",
  zIndex: 1202, // Mui Drawer zIndex is 1200, SearchUsersInput Backdrop set to 1201
  minHeight: "8rem",
  minWidth: "100%",
  padding: "0.75rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  border: `1px solid ${palette.divider}`,
  boxShadow: `-3px 3px 5px 1px ${palette.background.default}`,
  backgroundColor: palette.background.paper,

  // CLOSE BUTTON
  [`& .${iconButtonClasses.root}`]: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  // "DESCRIBER" TEXT (target of Popper's aria-describedby)
  [`& #${ariaElementIDs.popperContentDescription}`]: {
    marginRight: "2rem", // <-- avoids collision/overlap with close button
    fontSize: "0.9rem",
    whiteSpace: "normal",
  },

  // ERROR MESSAGE CONTENT
  [`& .${classNames.popperErrorContentContainer}`]: {
    "& *": { fontSize: "0.9rem", whiteSpace: "pre-wrap" },
    "& ul": { margin: "0.25rem 0", paddingLeft: "1.5rem" },
    "&:is(code)": { whiteSpace: "nowrap" },
  },

  // CONTACT AVATAR
  [`& .${avatarClassNames.root}`]: {
    margin: "0 auto",
    [`& *`]: {
      whiteSpace: "normal",
    },
  },

  // CONTENT CONTAINER
  [`& .${classNames.popperContentContainer}`]: {
    marginTop: "1rem",
    alignSelf: "center",
    minWidth: "100%",
    width: "100%",
    display: "grid",
    rowGap: "1rem",
    gridTemplate: "repeat( auto-fit, min-content) / 1fr",
  },

  // ACTION BUTTON
  [`& .${classNames.popperContentActionBtn}`]: {
    maxWidth: "12rem",
    margin: "0 auto",

    "& svg": {
      marginBottom: "0.125rem",
    },
  },
}));

export type SearchUsersPopperContentProps = {
  searchFieldHasError?: boolean;
  inputType: SearchUsersInputType;
  inputActionType: NonNullable<SearchUsersInputActionType>;
  addContactUser?: Contact | null;
  sendInviteTo?: string | null;
  handleDoAction: React.MouseEventHandler<HTMLButtonElement>;
  handleClose: () => void;
} & BoxProps;
