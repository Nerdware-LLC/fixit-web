import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { svgIconClasses } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import { prettifyPhoneNumStr } from "@/utils/formatters/phone.js";
import { helpers } from "./helpers.js";
import type { SearchUsersInputType } from "./types.js";

/**
 * Search Users Input Adornment Button
 *
 * @note The `<IconButton>` with `id="search-users-input-adornment-icon-btn"`
 * was given an ID because Formik throws a misleading warning if it doesn't have
 * one. This is likely a bug in Formik, so just keep the id on the `<IconButton>`.
 */
export const SearchUsersInputAdornmentBtn = ({
  inputType,
  searchFieldValue,
  searchFieldHasError = false,
  showLoadingIndicator = false,
  emptyValueTooltip = "",
  handleDoAction,
  isPopperOpen,
}: SearchUsersInputAdornmentBtnProps) => {
  const isBtnActionable =
    !searchFieldHasError &&
    !showLoadingIndicator &&
    helpers.isValidSearchFieldValue(searchFieldValue, inputType);

  return (
    <StyledInputAdornment
      position="end"
      shouldShow={!isPopperOpen}
      isBtnActionable={isBtnActionable}
    >
      {showLoadingIndicator ? (
        <CircularProgress color="inherit" size="1.25rem" />
      ) : (
        <Tooltip
          title={
            !searchFieldValue
              ? emptyValueTooltip
              : !isBtnActionable
                ? ""
                : inputType === "handle"
                  ? `Search for ${searchFieldValue}`
                  : inputType === "phone"
                    ? `Text invite to ${prettifyPhoneNumStr(searchFieldValue)}`
                    : `Email invite to ${searchFieldValue}`
          }
        >
          <IconButton
            id="search-users-input-adornment-icon-btn" // see jsdoc note above
            edge="end"
            onClick={handleDoAction}
            disableRipple={!isBtnActionable}
          >
            {inputType === "phone" ? (
              <SendToMobileIcon />
            ) : inputType === "email" ? (
              <SendIcon />
            ) : (
              <SearchIcon />
            )}
          </IconButton>
        </Tooltip>
      )}
    </StyledInputAdornment>
  );
};

const StyledInputAdornment = styled(InputAdornment, {
  shouldForwardProp: (propName: string) => !["shouldShow", "isBtnActionable"].includes(propName),
})<{ shouldShow: boolean; isBtnActionable: boolean }>(
  ({ theme: { palette }, shouldShow, isBtnActionable }) => ({
    ...(!shouldShow && { display: "none" }),
    position: "absolute",
    top: "50%",
    right: "1rem",
    ...(isBtnActionable
      ? {
          "&:hover": { cursor: "pointer" },
          "& *:hover": { cursor: "pointer" },
          [`& .${svgIconClasses.root}`]: { color: "inherit" },
        }
      : {
          "&:hover": { cursor: "text !important" },
          "& *:hover": { cursor: "text !important" },
          [`& .${svgIconClasses.root}`]: { color: palette.text.disabled },
        }),
  })
);

export type SearchUsersInputAdornmentBtnProps = {
  inputType: SearchUsersInputType;
  searchFieldValue?: string;
  searchFieldHasError: boolean;
  showLoadingIndicator: boolean;
  emptyValueTooltip: string;
  handleDoAction: React.MouseEventHandler<HTMLButtonElement>;
  isPopperOpen: boolean;
};
