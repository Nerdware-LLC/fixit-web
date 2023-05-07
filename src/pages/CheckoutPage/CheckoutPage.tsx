import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper, { paperClasses } from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { useWebViewContext } from "@app/WebViewContext/useWebViewContext";
import { checkoutValuesStore } from "@cache/checkoutValuesStore";
import { TitleLogo, titleLogoClassNames } from "@components/Branding/TitleLogo";
import { FetchStateContextWrapper } from "@components/Indicators/FetchStateContextWrapper";
import { Loading } from "@components/Indicators/Loading";
import { useLottie } from "@components/LottieAnimations/useLottie";
import { LegalLinks } from "@components/Navigation/LegalLinks";
import { storage } from "@utils/storage";
import {
  USER_SUBSCRIPTION_PRICE_LABELS,
  type UserSubscriptionPriceLabel,
} from "@/types/UserSubscription";
import { CheckoutForm } from "./CheckoutForm";
import { PaymentConfirmationInfo } from "./PaymentConfirmationInfo";
import { SubCostDetails } from "./SubCostDetails";
import { checkoutPageClassNames } from "./classNames";

export const CheckoutPage = () => {
  const { selectedSubscription } = checkoutValuesStore.useSubToStore();
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();

  // For mobile-app WebView:
  const { isAppWithinWebView, webViewPostMessage } = useWebViewContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAppWithinWebView) {
      // If in a mobile-app WebView, "token" and "sub" query params must exist
      const token = searchParams.get("token");
      const sub = searchParams.get("sub");
      const promoCode = searchParams.get("promoCode");

      if (!token || !sub || !USER_SUBSCRIPTION_PRICE_LABELS.includes(sub as any)) {
        webViewPostMessage({ error: "INVALID_QUERY_PARAMS" });
      } else {
        storage.authToken.set(token);
        checkoutValuesStore.set({
          selectedSubscription: sub as UserSubscriptionPriceLabel,
          promoCode,
        });
      }
    } else if (!USER_SUBSCRIPTION_PRICE_LABELS.includes(selectedSubscription as any)) {
      // Else if not in a mobile-app WebView, redirect to /products if "selectedSubscription" isn't set
      nav("/products", { replace: true, state: { isRedirect: true } });
    }
  }, [isAppWithinWebView, nav, searchParams, selectedSubscription, webViewPostMessage]);

  // For displaying payment confirmation:
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState<boolean>(false);

  const handleCompleteCheckout = async (success: boolean) => {
    if (success) {
      setShowBackdrop(true);
      await playLottie();
      setShowBackdrop(false);
      setShowPaymentConfirmation(true);
    }
  };

  return !selectedSubscription ? (
    <Loading />
  ) : (
    <FetchStateContextWrapper>
      <StyledBox>
        <Paper elevation={0}>
          {/*   SECTION: LEFT/TOP   */}

          <div className={checkoutPageClassNames.pageSectionColumn}>
            <TitleLogo />
            <div>
              <SubCostDetails />
            </div>
          </div>

          {/*   SECTION: RIGHT/BOTTOM   */}

          <div className={checkoutPageClassNames.pageSectionColumn}>
            {isMobilePageLayout && <Divider />}
            <Box className={checkoutPageClassNames.paymentInfoTextBox}>
              {
                // Show additional info on larger displays:
                !showPaymentConfirmation && !isMobilePageLayout && (
                  <>
                    <Text>
                      People who need to get things done use Fixit to keep in touch with contractors
                      and customers, create work orders, submit invoices, and manage payments - all
                      in one place.
                    </Text>
                    <br />
                    <Text>
                      Whether you&apos;re a homeowner planning your next kitchen renovation, or a
                      general contractor looking for a better way to submit invoices and get paid
                      for your work, Fixit makes it easy.
                    </Text>
                    <br />
                  </>
                )
              }
              {showPaymentConfirmation !== true && (
                <Text className={checkoutPageClassNames.paymentConfirmationText}>
                  You'll receive a confirmation email with receipt upon completion.
                </Text>
              )}
            </Box>
            {showPaymentConfirmation !== true ? (
              <>
                <Text variant="h2" className={checkoutPageClassNames.checkoutFormHeader}>
                  {selectedSubscription === "TRIAL" ? "Enter payment details" : "Pay with card"}
                </Text>
                <CheckoutForm onCompleteCheckout={handleCompleteCheckout} />
                <Text className={checkoutPageClassNames.checkoutFormLegalText}>
                  {
                    // The below dayjs format string "LL" results in dates like "January 1, 2020"
                    // prettier-ignore
                    selectedSubscription === "TRIAL"
                        ? `After your trial ends, you will be charged $5.00 per month starting ${dayjs().add(14, "days").format("LL")}. You can always cancel before then.`
                        : `By confirming your subscription, you allow Fixit to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.`
                  }
                </Text>
              </>
            ) : (
              <PaymentConfirmationInfo />
            )}
          </div>
        </Paper>
        <LegalLinks includeStripeBadge style={{ margin: "1.5rem" }} />
        <Backdrop open={showBackdrop}>{LottieView}</Backdrop>
      </StyledBox>
    </FetchStateContextWrapper>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: "100%",
  width: "100%",
  padding: "clamp(1rem, 5%, 2rem)",
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (min-width: 1450px)": {
    padding: "2rem clamp(2rem, 15%, 25rem) 0 clamp(2rem, 15%, 25rem)",
  },

  // BASE TEXT STYLE (from the old <StyledText>)
  [`& .${checkoutPageClassNames.baseText}`]: {
    fontSize: "clamp(1rem, 4vw, 1.15rem)",
    lineHeight: "1.5rem",
  },

  [`& > .${paperClasses.root}`]: {
    flexGrow: 1,
    height: "100%",
    width: "100%",
    textAlign: "left",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    ...(theme.variables.isMobilePageLayout
      ? { padding: "1rem", flexWrap: "wrap" }
      : { padding: "2rem", flexWrap: "nowrap" }),

    [`& > div.${checkoutPageClassNames.pageSectionColumn}`]: {
      width: theme.variables.isMobilePageLayout ? "100%" : "50%",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      // SECTION: LEFT/TOP
      "&:first-of-type": {
        [`& > .${titleLogoClassNames.root}`]: {
          justifyContent: "flex-start",
          marginBottom: "1rem",
          [`& > .${titleLogoClassNames.logoImg}`]: {
            height: "8vh",
            marginRight: "0.5rem",
          },
          [`& > .${titleLogoClassNames.logoText}`]: {
            fontSize: "3rem",
          },
        },

        // SubCostDetails container // TODO should be able to rm this div layer
        "& > div:nth-of-type(2)": {
          height: "100%",
          ...(!theme.variables.isMobilePageLayout && { padding: "2.5rem 0 1.5rem 0" }),
        },
      },

      // SECTION: RIGHT/BOTTOM
      "&:nth-of-type(2)": {
        ...(!theme.variables.isMobilePageLayout && {
          padding: "2rem 0 2rem 2rem",
        }),

        [`& > .${checkoutPageClassNames.paymentInfoTextBox}`]: {
          width: "100%",
          opacity: "0.75",
          [`& .${typographyClasses.root}`]: {
            fontSize: "1.15rem",
            lineHeight: "1.5rem",
          },

          [`& > .${checkoutPageClassNames.paymentConfirmationText}`]: {
            ...(theme.variables.isMobilePageLayout && {
              margin: "1rem 0",
              textAlign: "center",
              fontSize: "0.95rem",
              lineHeight: "1.15rem",
              fontWeight: 300,
            }),
          },
        },

        [`& > .${checkoutPageClassNames.checkoutFormHeader}`]: {
          margin: theme.variables.isMobilePageLayout ? "1rem 0" : "3rem 0",
          padding: 0,
          fontSize: "2rem",
          fontWeight: 400,
          borderWidth: "0 0 1px 0",
          borderStyle: "solid",
          borderColor: theme.palette.divider,
        },

        [`& > .${checkoutPageClassNames.checkoutFormLegalText}`]: {
          marginTop: "0.5rem",
          textAlign: "center",
          opacity: 0.75,
          fontSize: "0.7rem",
          lineHeight: "1rem",
          fontWeight: 100,
        },
      },
    },
  },
}));
