import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { FetchStateContextProvider } from "@/app/FetchStateContext";
import { TitleLogo, brandingClassNames } from "@/components/Branding";
import { DemoStripeCardInfoAccordion } from "@/components/DevTools/DemoStripeCardInfoAccordion.jsx";
import { CheckoutForm, type CheckoutFormProps } from "./CheckoutForm.jsx";
import { PaymentConfirmationInfo } from "./PaymentConfirmationInfo.jsx";
import { SubCostDetails } from "./SubCostDetails.jsx";
import { checkoutPageClassNames } from "./classNames.js";

export type CheckoutContentProps = {
  isPaymentConfirmed: boolean;
  onCheckoutCompletion: CheckoutFormProps["onSuccessfulSubmit"];
};

export const CheckoutContent = ({
  isPaymentConfirmed,
  onCheckoutCompletion,
}: CheckoutContentProps) => (
  <StyledPaper elevation={0}>
    <FetchStateContextProvider>
      {/*   SECTION: LEFT/TOP   */}
      <Box
        className={checkoutPageClassNames.pageSectionColumn}
        sx={{
          maxHeight: "80vh",
          // The above prevents expansion if the other pageSectionColumn is expanded to show more info
          [`& > .${brandingClassNames.titleLogoRoot}`]: {
            height: "min-content",
            [`& .${brandingClassNames.titleLogoImg}`]: { height: "8vh" },
            [`& .${brandingClassNames.titleLogoText}`]: { fontSize: "3rem" },
          },
        }}
      >
        <TitleLogo />
        <SubCostDetails />
      </Box>

      <Divider />

      {/*   SECTION: RIGHT/BOTTOM   */}
      <div className={checkoutPageClassNames.pageSectionColumn}>
        {isPaymentConfirmed ? (
          <PaymentConfirmationInfo />
        ) : (
          <>
            <Text style={{ textAlign: "center", opacity: 0.8 }}>
              You'll receive a confirmation email with receipt upon completion.
            </Text>
            <DemoStripeCardInfoAccordion />
            <Divider />
            <CheckoutForm onSuccessfulSubmit={onCheckoutCompletion} />
          </>
        )}
      </div>
    </FetchStateContextProvider>
  </StyledPaper>
);

const StyledPaper = styled(Paper)(({ theme: { variables } }) => ({
  width: "100%",
  minHeight: "600px",
  textAlign: "left",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  borderRadius: "10px",
  display: "flex",

  ...(variables.isMobilePageLayout
    ? {
        maxWidth: "480px", // 30rem, any larger looks too wide for the content on mobile
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }
    : {
        maxWidth: "1040px", // 65rem, any larger looks too wide for the content on desktop
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "2rem",
        gap: "2rem",
      }),

  // DEFAULT STYLES FOR ALL TEXT:
  [`& .${typographyClasses.root}`]: { textWrap: "balance" },

  // The hr Divider in between the pageSectionColumns on mobile:
  [`& > hr.${dividerClasses.root}`]: {
    // Hide on desktop
    ...(!variables.isMobilePageLayout && { display: "none" }),
  },

  [`& > div.${checkoutPageClassNames.pageSectionColumn}`]: {
    width: variables.isMobilePageLayout ? "100%" : "50%",
    minHeight: "min-content",
    gap: "inherit",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    [`& .${checkoutPageClassNames.priceInfoRowGroup}`]: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "1rem 0",
    },

    [`& .${checkoutPageClassNames.priceInfoRow}`]: {
      position: "relative",
      width: "100%",
      padding: "0 1rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
      borderRadius: "0.25rem",
    },
  },
}));
