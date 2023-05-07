import { useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { paperClasses } from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { UserAvatar } from "@components/Avatar/UserAvatar";
import { MobileModalContentBox } from "@components/Modal/MobileModalContentBox";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { useAppBarMenuConfigs, type MenuOption } from "./useAppBarMenuConfigs";

export const MobileAppBarMenu = () => {
  const { pathname } = useLocation();
  const { isAccountActive, authOptionConfig, menuOptionConfigs } = useAppBarMenuConfigs();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // handleClick: if a menu option navigates to a path, ensure the modal is closed first

  const menuAuthOption = getModalOptClickHandler(authOptionConfig, setIsModalOpen);

  const menuOptions = menuOptionConfigs.map((menuOpt) =>
    getModalOptClickHandler(menuOpt, setIsModalOpen)
  );

  return (
    <>
      {isModalOpen ? (
        <IconButton
          onClick={handleClose}
          style={{
            color: "rgb(150,150,150)",
            backgroundColor: "rgba(150,150,150,0.16)",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : isAccountActive === true ? (
        <UserAvatar onClick={handleOpen} style={{ marginLeft: "auto" }} />
      ) : (
        <IconButton onClick={handleOpen}>
          <MenuIcon
            name="app-bar-menu-button"
            aria-label="app bar menu button"
            sx={{
              /* Currently, LandingPage puts this btn against a light-ish bg,
              which makes the primary.main color hard to see. Since PageContainer
              uses the react-router-dom Outlet pattern, LandingPage doesn't have
              a way to pass style/sx props to parent PageContainer. So, for now,
              this comp must depend on location.pathname to determine whether or
              not to use primary.main color.  */
              color: pathname !== "/" ? "primary.main" : "rgba(0,0,0,0.75)",
            }}
          />
        </IconButton>
      )}
      <StyledMobileModalContentBox open={isModalOpen} onClose={handleClose}>
        {menuOptions.map(({ label, handleClick }) => (
          <div
            key={`MobileMenu:Btn:${label}`}
            className={mobileAppBarMenuClassNames.mobileMenuBtnBox}
            onClick={handleClick}
          >
            <Text>{label}</Text>
            <ChevronRightIcon />
          </div>
        ))}
        <div className={mobileAppBarMenuClassNames.mobileMenuBtnBox}>
          Toggle Dark Mode
          <DarkModeSwitch />
        </div>
        <Button onClick={menuAuthOption.handleClick} startIcon={menuAuthOption.icon}>
          {menuAuthOption.label}
        </Button>
      </StyledMobileModalContentBox>
    </>
  );
};

/**
 * This fn provides menu options with a `handleClick` fn which first closes
 * the modal window, if necessary.
 *
 * If a modal menu option contains property "path", the presence of that property
 * indicates that `modalMenuOpt.handleSelectOption` is a fn which will navigate
 * away to a different path from the current one.
 */
const getModalOptClickHandler = <T extends MenuOption>(
  modalMenuOpt: T,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
): T & { handleClick: () => void | Promise<void> } => ({
  ...modalMenuOpt,
  handleClick: !modalMenuOpt?.path
    ? modalMenuOpt.handleSelectOption
    : () => {
        setIsModalOpen(false);
        modalMenuOpt.handleSelectOption();
      },
});

export const mobileAppBarMenuClassNames = {
  mobileMenuBtnBox: "mobile-menu-btn-box",
};

const StyledMobileModalContentBox = styled(MobileModalContentBox)(({ theme }) => ({
  [`& > .${paperClasses.root}`]: {
    height: "85dvh",
    width: "80dvw",

    [`& .${mobileAppBarMenuClassNames.mobileMenuBtnBox}`]: {
      height: "3.25rem",
      width: "100%",
      padding: "2rem",
      borderStyle: "solid",
      borderWidth: "0 0 1px 0",
      borderColor: theme.palette.divider,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.action.hover,
      },
    },

    [`& .${buttonClasses.root}`]: {
      width: "calc(100% - 4rem)",
      alignSelf: "center",
      margin: "auto 0 2rem 0",
    },
  },
}));
