import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { StripeBadge, STRIPE_LINKS, brandingClassNames } from "@/components/Branding";
import { useLottie } from "@/components/LottieAnimations/useLottie.js";
import { LegalLinks, navigationClassNames } from "@/components/Navigation";
import { CheckoutContent, type CheckoutContentProps } from "./CheckoutContent.jsx";
import { checkoutPageElementIDs } from "./elementIDs.js";

export const CheckoutPage = ({
  showPaymentConfirmation: initialShowPaymentConfirmation = false,
}: CheckoutPageProps) => {
  // For displaying payment confirmation:
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(initialShowPaymentConfirmation);

  const handleCheckoutCompletion = async () => {
    setShowBackdrop(true);
    await playLottie();
    setShowBackdrop(false);
    setIsPaymentConfirmed(true);
  };

  return (
    <StyledDiv>
      <div id={checkoutPageElementIDs.pageScrollContainer}>
        <CheckoutContent
          onCheckoutCompletion={handleCheckoutCompletion}
          isPaymentConfirmed={isPaymentConfirmed}
        />
        <div id={checkoutPageElementIDs.footerRoot}>
          <StripeBadge
            href={STRIPE_LINKS.CONNECT_ACCOUNT_AGREEMENT}
            tooltipProps={{ title: "View Stripe Connected Account Agreement" }}
          />
          <Divider orientation="vertical" />
          <LegalLinks />
        </div>
      </div>
      <Backdrop open={showBackdrop}>{LottieView}</Backdrop>
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = CheckoutPage;

const StyledDiv = styled("div")(({ theme: { palette, variables, breakpoints } }) => ({
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

    // FOOTER
    [`& > #${checkoutPageElementIDs.footerRoot}`]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",

      [breakpoints.down(400)]: {
        gap: "0.75rem",
        fontSize: "0.9rem",
        [`& .${brandingClassNames.stripeBadgeImg}`]: { height: "1.5rem !important" },
      },

      [`& .${brandingClassNames.stripeBadgeImg}`]: {
        height: "2rem",
      },

      [`& > .${dividerClasses.root}`]: {
        height: "2.25rem",
        backgroundColor: alpha(
          palette.mode === "dark" ? palette.grey[600] : palette.grey[800],
          0.5
        ),
      },

      [`& > .${navigationClassNames.legalLinksRoot}`]: {
        gap: "inherit",
        [`& > .${navigationClassNames.legalAppLinksContainer}`]: {
          width: "auto",
          "& hr": { display: "none" },
        },
      },
    },
  },
}));

export type CheckoutPageProps = {
  /**
   * # _This prop is for Storybook usage only_
   *
   * Set to `true` to show the payment confirmation UI.
   */
  showPaymentConfirmation?: CheckoutContentProps["isPaymentConfirmed"];
};
