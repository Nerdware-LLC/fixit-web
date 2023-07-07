import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { Avatar } from "@components/Avatar";
import { UserAvatar } from "@components/Avatar/UserAvatar";
import type { AppBarMenuConfigs } from "../useAppBarMenuConfigs";

export const UserMenu = ({
  isAccountActive,
  menuOptionConfigs,
  authOptionConfig,
}: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id={areaElementIDs.clickTarget}
        onClick={handleOpenMenu}
        aria-controls={isOpen ? areaElementIDs.menu : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        style={{ padding: 0 }}
      >
        {isAccountActive !== true ? <Avatar /> : <UserAvatar />}
      </IconButton>
      {isOpen && (
        <Menu
          id={areaElementIDs.menu}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          disablePortal
          hideBackdrop
          MenuListProps={{ "aria-labelledby": areaElementIDs.clickTarget }}
          // The below 2 props ensure the Mui Popover is in the desired position
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: -4, horizontal: "right" }}
          sx={({ palette }) => ({
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
          })}
        >
          {[...menuOptionConfigs, authOptionConfig].map(({ label, handleSelectOption }) => (
            <MenuItem key={`DesktopAppBarMenu:MenuItem:${label}`} onClick={handleSelectOption}>
              {label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export const areaElementIDs = {
  clickTarget: "desktop-appbar-menu-click-target",
  menu: "desktop-appbar-menu-mui-menu",
};

export type UserMenuProps = Pick<
  AppBarMenuConfigs,
  "isAccountActive" | "menuOptionConfigs" | "authOptionConfig"
>;
