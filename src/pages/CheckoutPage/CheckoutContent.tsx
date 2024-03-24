import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import { FetchStateContextProvider } from "@/app/FetchStateContext";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import { TitleLogo, brandingClassNames } from "@/components/Branding";
import { DemoStripeCardInfoAccordion } from "@/components/DevTools/DemoStripeCardInfoAccordion";
import { CheckoutForm, type CheckoutFormProps } from "./CheckoutForm";
import { PaymentConfirmationInfo } from "./PaymentConfirmationInfo";
import { SubCostDetails } from "./SubCostDetails";
import { checkoutPageClassNames } from "./classNames";

export const CheckoutContent = ({
  showPaymentConfirmation,
  onCheckoutCompletion,
}: CheckoutContentProps) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <StyledPaper elevation={0}>
      {/*   SECTION: LEFT/TOP   */}

      <div className={checkoutPageClassNames.pageSectionColumn}>
        <TitleLogo
          sx={{
            [`& .${brandingClassNames.titleLogoImg}`]: { height: "8vh" },
            [`& .${brandingClassNames.titleLogoText}`]: { fontSize: "3rem" },
          }}
        />
        <SubCostDetails />
      </div>

      {isMobilePageLayout && <Divider />}

      {/*   SECTION: RIGHT/BOTTOM   */}

      <div className={checkoutPageClassNames.pageSectionColumn}>
        {showPaymentConfirmation ? (
          <PaymentConfirmationInfo />
        ) : (
          <>
            <Text style={{ textAlign: "center", opacity: 0.75, whiteSpace: "pre-line" }}>
              {`You'll receive a confirmation email\nwith receipt upon completion.`}
            </Text>
            <DemoStripeCardInfoAccordion />
            <Divider />
            <FetchStateContextProvider>
              <CheckoutForm onSuccessfulSubmit={onCheckoutCompletion} />
            </FetchStateContextProvider>
          </>
        )}
      </div>
    </StyledPaper>
  );
};

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

  [`& > div.${checkoutPageClassNames.pageSectionColumn}`]: {
    ...(variables.isMobilePageLayout
      ? {
          width: "100%",
          height: "min-content",
        }
      : {
          width: "50%",
          minHeight: "100%",
        }),
    gap: "inherit",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

export type CheckoutContentProps = {
  showPaymentConfirmation: boolean;
  onCheckoutCompletion: CheckoutFormProps["onSuccessfulSubmit"];
};
