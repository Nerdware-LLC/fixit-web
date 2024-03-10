import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { AvatarMyProfile } from "@/components/Avatar/AvatarMyProfile";
import { appBarMenuElementIDs } from "./elementIDs";
import type { AppBarMenuOptionConfigs } from "./useAppBarMenuOptionConfigs";

export const UserAvatarMenuButton = ({
  appState,
  appStateBasedMenuOptions,
  authMenuOption,
}: AppBarMenuOptionConfigs) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu: IconButtonProps["onClick"] = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id={appBarMenuElementIDs.desktopUserAvatarMenuButton}
        onClick={handleOpenMenu}
        aria-controls={isOpen ? appBarMenuElementIDs.desktopMenuRoot : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        style={{ padding: 0 }}
      >
        {appState.isAccountActive !== true ? <MuiAvatar /> : <AvatarMyProfile />}
      </IconButton>
      {isOpen && (
        <StyledMenu
          id={appBarMenuElementIDs.desktopMenuRoot}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          disablePortal
          hideBackdrop
          MenuListProps={{ "aria-labelledby": appBarMenuElementIDs.desktopUserAvatarMenuButton }}
          // The below 2 props ensure the Mui Popover is in the desired position
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: -4, horizontal: "right" }}
        >
          {[...appStateBasedMenuOptions, authMenuOption].map(({ label, doNavAction }) => (
            <MenuItem key={label} onClick={doNavAction}>
              {label}
            </MenuItem>
          ))}
        </StyledMenu>
      )}
    </>
  );
};

const StyledMenu = styled(Menu)(({ theme: { palette } }) => ({
  [`& > .${paperClasses.root}`]: {
    overflow: "visible", // so the "arrow" pseudo-element below can be seen
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: palette.mode === "dark" ? "#404048" : palette.grey.A200,
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-6px",
      right: "12px",
      height: 0,
      width: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent",
      borderBottomWidth: "5px",
      borderBottomStyle: "solid",
      borderBottomColor: "inherit",
    },
  },
}));
