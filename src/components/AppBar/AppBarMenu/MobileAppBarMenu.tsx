import { useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import List, { listClasses } from "@mui/material/List";
import ListItemButton, { listItemButtonClasses } from "@mui/material/ListItemButton";
import { paperClasses } from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import { AvatarMyProfile } from "@/components/Avatar/AvatarMyProfile";
import { CloseIconButton } from "@/components/Buttons/CloseIconButton";
import { MobileModalContentBox } from "@/components/Modal/MobileModalContentBox";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { MobileAppBarMenuAuthButton } from "./MobileAppBarMenuAuthButton";
import { MobileAppBarMenuButton } from "./MobileAppBarMenuButton";
import { useAppBarMenuOptionConfigs } from "./useAppBarMenuOptionConfigs";

export const MobileAppBarMenu = () => {
  const { appState, appStateBasedMenuOptions, authMenuOption } = useAppBarMenuOptionConfigs();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMenu = () => setIsModalOpen(true);
  const handleCloseMenu = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen ? (
        <CloseIconButton
          onClick={handleCloseMenu}
          style={{ color: "rgb(150,150,150)", backgroundColor: "rgba(150,150,150,0.16)" }}
        />
      ) : appState.isAccountActive === true ? (
        <AvatarMyProfile onClick={handleOpenMenu} />
      ) : (
        <IconButton onClick={handleOpenMenu} aria-label="app bar menu button">
          <MenuIcon />
        </IconButton>
      )}
      <StyledMobileModalContentBox open={isModalOpen} onClose={handleCloseMenu}>
        <List>
          {appStateBasedMenuOptions.map((menuOption) => (
            <MobileAppBarMenuButton
              key={menuOption.label}
              menuOption={menuOption}
              handleCloseMenu={handleCloseMenu}
            />
          ))}
          <ListItemButton divider>
            Toggle Dark Mode
            <DarkModeSwitch />
          </ListItemButton>
        </List>
        <MobileAppBarMenuAuthButton menuOption={authMenuOption} handleCloseMenu={handleCloseMenu} />
      </StyledMobileModalContentBox>
    </>
  );
};

const StyledMobileModalContentBox = styled(MobileModalContentBox)({
  [`& > .${paperClasses.root}`]: {
    height: "80dvh",
    width: "80dvw",

    [`& .${listClasses.root}`]: {
      width: "100%",
      padding: 0,

      [`& .${listItemButtonClasses.root}`]: {
        height: "3.25rem",
        padding: "2rem",
        justifyContent: "space-between",
      },
    },
  },
});
