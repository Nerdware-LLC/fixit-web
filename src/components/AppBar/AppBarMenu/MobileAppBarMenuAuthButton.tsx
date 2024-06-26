import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useMobileAppBarMenuButtonState,
  type UseMobileAppBarMenuButtonStateParams,
} from "./useMobileAppBarMenuButtonState.js";

export const MobileAppBarMenuAuthButton = ({
  menuOption,
  handleCloseMenu,
}: MobileAppBarMenuAuthButtonProps) => {
  const { showLoading, handleClick } = useMobileAppBarMenuButtonState({
    menuOption,
    handleCloseMenu,
  });

  return (
    <Button
      onClick={handleClick}
      startIcon={!showLoading ? menuOption.icon : null}
      style={{
        width: "calc(100% - 4rem)",
        alignSelf: "center",
        margin: "auto 0 2rem 0",
      }}
    >
      {showLoading ? <CircularProgress size="3rem" color="inherit" /> : menuOption.label}
    </Button>
  );
};

export type MobileAppBarMenuAuthButtonProps = UseMobileAppBarMenuButtonStateParams;
