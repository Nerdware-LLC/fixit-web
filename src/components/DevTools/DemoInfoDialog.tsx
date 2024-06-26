import { useState, useEffect } from "react";
import { ENV } from "@/app/env";
import { DemoInfo, type DemoInfoProps } from "@/components/DevTools/DemoInfo.jsx";
import { Dialog, type DialogProps, type UseDialogHookProps } from "@/components/Dialog";
import type { Simplify, SetOptional } from "type-fest";

export const DemoInfoDialog = ({
  title = `Welcome to Fixit — Demo Mode`,
  isVisible,
  closeDialog,
  style = {},
  sx,
  initShowStripeTestCardInfo = false,
}: DemoInfoDialogProps) => {
  return (
    <Dialog
      isVisible={isVisible}
      title={title}
      handleAccept={closeDialog}
      style={{ minWidth: "25rem", ...style }}
      sx={sx}
    >
      <DemoInfo initShowStripeTestCardInfo={initShowStripeTestCardInfo} />
    </Dialog>
  );
};

export const useDemoInfoDialog = () => {
  const [hasInstanceBeenViewed, setHasInstanceBeenViewed] = useState(false);
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  // EFFECT: Open the demo-info dialog in staging/demo deployed envs when the component mounts
  useEffect(() => {
    if (ENV.IS_DEPLOYED_ENV && !ENV.IS_PROD && !hasInstanceBeenViewed) {
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

export type DemoInfoDialogProps = Simplify<
  DemoInfoProps &
    Pick<SetOptional<DialogProps, "title">, "title" | "isVisible" | "style" | "sx"> &
    Pick<UseDialogHookProps, "closeDialog">
>;
