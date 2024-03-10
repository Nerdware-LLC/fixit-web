import CircularProgress from "@mui/material/CircularProgress";
import ListItemButton from "@mui/material/ListItemButton";
import Text from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  useMobileAppBarMenuButtonState,
  type UseMobileAppBarMenuButtonStateParams,
} from "./useMobileAppBarMenuButtonState";

export const MobileAppBarMenuButton = ({
  menuOption,
  handleCloseMenu,
}: MobileAppBarMenuButtonProps) => {
  const { showLoading, handleClick } = useMobileAppBarMenuButtonState({
    menuOption,
    handleCloseMenu,
  });

  return (
    <ListItemButton onClick={handleClick} divider>
      <Text>{menuOption.label}</Text>
      {showLoading ? (
        <CircularProgress size="2rem" color="inherit" style={{ opacity: 0.8 }} />
      ) : (
        <ChevronRightIcon />
      )}
    </ListItemButton>
  );
};

export type MobileAppBarMenuButtonProps = UseMobileAppBarMenuButtonStateParams;
