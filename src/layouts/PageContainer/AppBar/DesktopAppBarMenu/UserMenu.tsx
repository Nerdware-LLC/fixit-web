import { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@components/Avatar";
import { UserAvatar } from "@components/Avatar/UserAvatar";
import { useAppBarMenuConfigs } from "../useAppBarMenuConfigs";

export const UserMenu = ({
  isAccountActive,
  menuOptionConfigs,
  authOptionConfig,
}: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isOpen = anchorEl?.id === areaElementIDs.clickTarget;

  return (
    <>
      <Box
        id={areaElementIDs.clickTarget}
        onClick={handleOpenMenu}
        aria-controls={isOpen ? areaElementIDs.menu : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
      >
        {isAccountActive !== true ? <Avatar /> : <UserAvatar />}
      </Box>
      <Menu
        id={areaElementIDs.menu}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseMenu}
        MenuListProps={{ "aria-labelledby": areaElementIDs.clickTarget }}
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

export const areaElementIDs = {
  clickTarget: "desktop-appbar-menu-click-target",
  menu: "desktop-appbar-menu-mui-menu",
};

export type UserMenuProps = Pick<
  ReturnType<typeof useAppBarMenuConfigs>,
  "isAccountActive" | "menuOptionConfigs" | "authOptionConfig"
>;
