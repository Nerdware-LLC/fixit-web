import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Avatar, UserAvatar } from "@components";
import { useAppBarMenuConfigs } from "../useAppBarMenuConfigs";

export const UserMenu = ({
  isAccountActive,
  menuOptionConfigs,
  authOptionConfig
}: Pick<
  ReturnType<typeof useAppBarMenuConfigs>,
  "isAccountActive" | "menuOptionConfigs" | "authOptionConfig"
>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isOpen = anchorEl?.id === MENU_EL_IDs.CLICK_TARGET;

  return (
    <>
      <Box
        id={MENU_EL_IDs.CLICK_TARGET}
        onClick={handleOpenMenu}
        aria-controls={isOpen ? MENU_EL_IDs.MENU : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
      >
        {isAccountActive !== true ? <Avatar /> : <UserAvatar />}
      </Box>
      <Menu
        id={MENU_EL_IDs.MENU}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseMenu}
        MenuListProps={{ "aria-labelledby": MENU_EL_IDs.CLICK_TARGET }}
        // The below 2 props ensure the Mui Popover is in the desired position
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {[...menuOptionConfigs, authOptionConfig].map(({ label, handleSelectOption }) => (
          <MenuItem key={`DesktopAppBarMenu:MenuItem:${label}`} onClick={handleSelectOption}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MENU_EL_IDs = {
  CLICK_TARGET: "DesktopAppBarMenu:ClickTarget",
  MENU: "DesktopAppBarMenu:Menu"
};
