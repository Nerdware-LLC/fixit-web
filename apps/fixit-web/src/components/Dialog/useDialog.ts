import { useState } from "react";

export const useDialog = (initIsVisible = false) => {
  const [isDialogVisible, setIsDialogVisible] = useState(!!initIsVisible);

  const openDialog = () => setIsDialogVisible(true);
  const closeDialog = () => setIsDialogVisible(false);

  return {
    isDialogVisible,
    openDialog,
    closeDialog,
  };
};

export type UseDialogHookProps = ReturnType<typeof useDialog>;
