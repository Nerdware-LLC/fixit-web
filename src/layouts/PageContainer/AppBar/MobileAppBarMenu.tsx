import { useState } from "react";
import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { UserAvatar } from "@components";
import { useAppBarMenuConfigs, type MenuOption } from "./useAppBarMenuConfigs";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const MobileAppBarMenu = () => {
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
        <IconButton onClick={handleClose} sx={{ bgcolor: "rgba(50,50,50,0.4)" }}>
          <CloseIcon sx={{ color: "ButtonText" }} />
        </IconButton>
      ) : isAccountActive === true ? (
        <UserAvatar onClick={handleOpen} sx={{ marginLeft: "auto" }} />
      ) : (
        <IconButton onClick={handleOpen}>
          <MenuIcon color="primary" />
        </IconButton>
      )}
      <Modal open={isModalOpen} onClose={handleClose}>
        <ModalMenuContainer>
          {menuOptions.map(({ label, handleClick }) => (
            <div
              key={`MobileMenu:Btn:${label}`}
              className="mobile-menu-btn-box"
              onClick={handleClick}
            >
              <Text>{label}</Text>
              <ChevronRightIcon />
            </div>
          ))}
          <div className="mobile-menu-btn-box">
            Toggle Dark Mode
            <DarkModeSwitch />
          </div>
          <Button
            onClick={menuAuthOption.handleClick}
            startIcon={menuAuthOption.icon}
            style={{
              width: "calc(100% - 4rem)",
              alignSelf: "center",
              margin: "auto 0 2rem 0"
            }}
          >
            {menuAuthOption.label}
          </Button>
        </ModalMenuContainer>
      </Modal>
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
      }
});

const ModalMenuContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  zIndex: 100,
  height: "85vh",
  width: "75vw",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  borderRadius: "0.35rem",
  boxShadow: "24",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  "& > div.mobile-menu-btn-box": {
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
      backgroundColor: theme.palette.action.hover
    }
  }
}));
