import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import MuiButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { LANDING_PAGE_MENU_OPTS, DarkModeSwitch } from "../common";
import { Text } from "@components/Typography";

export const LandingPageMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { palette } = useTheme();
  const nav = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleBtnClick = (path: string) => {
    setIsOpen(false);
    nav(path);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        {isOpen ? <CloseIcon color="primary" /> : <MenuIcon color="primary" />}
      </IconButton>
      <Modal open={isOpen} onClose={handleClose}>
        <StyledMenuContainer style={{ backgroundColor: palette.background.paper }}>
          {Object.entries(LANDING_PAGE_MENU_OPTS).map(([label, { path }]) => (
            <StyledMobileMenuBtnBox
              key={`LandingPageMenu:MobileMenuBtnBox:${label}`}
              onClick={() => handleBtnClick(path)}
              style={{ borderColor: palette.divider }}
            >
              <Text>{label}</Text>
              <ChevronRightIcon />
            </StyledMobileMenuBtnBox>
          ))}
          <StyledMobileMenuBtnBox style={{ borderColor: palette.divider }}>
            Toggle Dark Mode
            <DarkModeSwitch />
          </StyledMobileMenuBtnBox>
          <MuiButton
            variant="contained"
            style={{
              width: "90%",
              alignSelf: "center",
              margin: "auto 0 1rem 0"
            }}
          >
            Sign In
          </MuiButton>
        </StyledMenuContainer>
      </Modal>
    </>
  );
};

const StyledMenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  height: 88vh;
  width: 80vw;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  box-shadow: 24;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledMobileMenuBtnBox = styled.div`
  height: 3.25rem;
  width: 100%;
  padding: 1rem;
  border-style: solid;
  border-width: 0 0 1px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
