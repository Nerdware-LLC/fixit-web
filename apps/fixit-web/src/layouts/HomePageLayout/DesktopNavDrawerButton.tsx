import { useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import ListItem from "@mui/material/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/material/ListItemButton";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import ListItemText, { listItemTextClasses } from "@mui/material/ListItemText";
import { THEMES } from "@/app/ThemeProvider";
import { useIsActiveNavAction } from "./helpers.js";
import type { AppNavActionConfig } from "@/routes/appNavActions.jsx";
import type { SetRequired } from "type-fest";

/**
 * The button component used in `DesktopNavDrawer`.
 */
export const DesktopNavDrawerButton = ({
  label,
  path,
  doNavAction,
  serviceAction,
  icon,
}: NavActionDrawerButtonProps) => {
  const { isActive } = useIsActiveNavAction(path);
  const [showLoading, setShowLoading] = useState(false);

  // If the navAction is service-based, wrap it in a local loading-state handler
  const handleClick = path
    ? doNavAction
    : async () => {
        try {
          setShowLoading(true);
          await serviceAction();
        } catch (err) {
          toast.error(getErrorMessage(err) ?? "Whoops! An error occurred — please try again.");
        } finally {
          setShowLoading(false);
        }
      };

  return (
    <StyledListItem disablePadding>
      <ListItemButton selected={isActive} onClick={handleClick} disableGutters>
        <ListItemIcon>
          {showLoading ? <CircularProgress size="1.5rem" color="inherit" /> : icon}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)({
  [`& > .${listItemButtonClasses.root}`]: {
    padding: "0.5rem 0.75rem 0.5rem 0.5rem",
    justifyContent: "center",
    color: THEMES.DARK.palette.text.primary,

    [`& > .${listItemIconClasses.root}`]: {
      padding: "1rem 1rem 1rem 0",
      justifyContent: "flex-end",
      color: "inherit",
    },
    [`& > .${listItemTextClasses.root}`]: {
      whiteSpace: "nowrap",
      color: "inherit",
    },

    [`&.${listItemButtonClasses.selected}`]: {
      color: THEMES.DARK.palette.secondary.main,
      backgroundColor: "inherit",
      "&:hover": {
        backgroundColor: THEMES.DARK.palette.action.hover,
      },
    },
  },
});

export type NavActionDrawerButtonProps = SetRequired<AppNavActionConfig, "icon">;
