import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import { ButtonLoadingIndicator } from "@/components/Indicators/ButtonLoadingIndicator";
import { stripeService } from "@/services/stripeService";
import type { ToastContentProps } from "react-toastify";

export const PaymentRequiredToast = ({ closeToast }: PaymentRequiredToastProps) => {
  const { isDialogVisible, closeDialog } = Dialog.use(true);
  const [showLoading, setShowLoading] = useState(false);

  const handleClose = () => {
    closeDialog();
    closeToast();
  };

  const handleAccept = async () => {
    setShowLoading(true);
    await stripeService.getCustomerPortalLink();
    setShowLoading(false);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Dialog
      isVisible={isDialogVisible}
      title="Payment Required"
      message="Your account does not have an active subscription - please update your payment method to continue."
      acceptLabel={showLoading ? <ButtonLoadingIndicator /> : "OK"}
      handleAccept={handleAccept}
      handleCancel={handleCancel}
      showCancelButton={false}
    />
  );
};

export type PaymentRequiredToastProps = Pick<ToastContentProps, "closeToast">;
