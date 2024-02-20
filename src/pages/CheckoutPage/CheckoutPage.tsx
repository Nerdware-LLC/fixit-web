import { useState } from "react";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import { useLottie } from "@/components/LottieAnimations/useLottie";
import { LegalLinks } from "@/components/Navigation";
import { CheckoutContent } from "./CheckoutContent";
import { checkoutPageElementIDs } from "./elementIDs";

export const CheckoutPage = ({
  showPaymentConfirmation: initialShowPaymentConfirmation = false,
}: CheckoutPageProps) => {
  // For displaying payment confirmation:
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(
    initialShowPaymentConfirmation
  );

  const handleCheckoutCompletion = async () => {
    setShowBackdrop(true);
    await playLottie();
    setShowBackdrop(false);
    setShowPaymentConfirmation(true);
  };

  return (
    <StyledDiv>
      <div id={checkoutPageElementIDs.pageScrollContainer}>
        <CheckoutContent
          onCheckoutCompletion={handleCheckoutCompletion}
          showPaymentConfirmation={showPaymentConfirmation}
        />
        <LegalLinks includeStripeBadge />
      </div>
      <Backdrop open={showBackdrop}>{LottieView}</Backdrop>
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = CheckoutPage;

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  minHeight: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0 clamp(1rem, 5%, 2rem)",

  // PAGE SCROLL CONTAINER
  [`& > #${checkoutPageElementIDs.pageScrollContainer}`]: {
    padding: "1rem 0",
    minHeight: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: "1rem",
    ...(variables.isMobilePageLayout && { overflowY: "auto" }),
  },
}));

export type CheckoutPageProps = {
  /**
   * # _This prop is for Storybook usage only_
   *
   * Set to `true` to show the payment confirmation UI.
   */
  showPaymentConfirmation?: boolean;
};
