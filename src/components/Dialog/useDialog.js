import { useState } from "react";
import { Dialog } from "./Dialog";

export const useDialog = (initIsVisible = false) => {
  const [isDialogVisible, setIsDialogVisible] = useState(!!initIsVisible);

  const openDialog = () => setIsDialogVisible(true);
  const closeDialog = () => setIsDialogVisible(false);

  return { Dialog, isDialogVisible, openDialog, closeDialog };
};
