import { useState } from "react";
import type { AppNavActionConfig } from "@/routes/appNavActions";

export const useMobileAppBarMenuButtonState = ({
  menuOption,
  handleCloseMenu,
}: UseMobileAppBarMenuButtonStateParams) => {
  const [showLoading, setShowLoading] = useState(false);

  // handleClick: if a menu option navigates to a path, ensure the modal is closed first
  const handleClick = async () => {
    setShowLoading(true);
    await menuOption.doNavAction();
    setShowLoading(false);
    handleCloseMenu();
  };

  return { showLoading, handleClick };
};

export type UseMobileAppBarMenuButtonStateParams = {
  menuOption: AppNavActionConfig;
  handleCloseMenu: () => void;
};
