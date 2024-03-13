import { useState, useEffect } from "react";
import { DemoInfo } from "@/components/DevTools/DemoInfo";
import { Dialog, type DialogProps, type UseDialogHookProps } from "@/components/Dialog";
import type { SetOptional } from "type-fest";

export const DemoInfoDialog = ({
  title = "Notice",
  isVisible,
  closeDialog,
  children,
  style = {},
  sx,
}: DemoInfoDialogProps) => {
  return (
    <Dialog
      isVisible={isVisible}
      title={title}
      handleAccept={closeDialog}
      style={{ minWidth: "25rem", ...style }}
      sx={sx}
    >
      <DemoInfo />
      {children}
    </Dialog>
  );
};

export const useDemoInfoDialog = () => {
  const [hasInstanceBeenViewed, setHasInstanceBeenViewed] = useState(false);
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  // EFFECT: Open the demo info dialog when the component mounts
  useEffect(() => {
    if (!hasInstanceBeenViewed) {
      setHasInstanceBeenViewed(true);
      openDialog();
    }
  }, [hasInstanceBeenViewed, openDialog]);

  return {
    isDialogVisible,
    closeDialog,
  };
};

DemoInfoDialog.use = useDemoInfoDialog;

export type DemoInfoDialogProps = Pick<
  SetOptional<DialogProps, "title">,
  "title" | "isVisible" | "children" | "style" | "sx"
> &
  Pick<UseDialogHookProps, "closeDialog">;
