import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Text from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { checkoutValuesStore, usePageLayoutContext, useWebViewContext } from "@app";
import { FetchStateContextWrapper, TitleLogo, LegalLinks } from "@components";
import { Loading, useLottie } from "@components";
import { CONSTANTS, type UserSubscriptionPriceLabel } from "@types";
import { storage } from "@utils";
import { SubCostDetails } from "./SubCostDetails";
import { CheckoutForm } from "./CheckoutForm";
import { PaymentConfirmationInfo } from "./PaymentConfirmationInfo";

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

      if (!token || !sub || !CONSTANTS.USER_SUBSCRIPTION.PRICE_LABELS.includes(sub as any)) {
        webViewPostMessage({ error: "INVALID_QUERY_PARAMS" });
      } else {
        storage.setAuthToken(token);
        checkoutValuesStore.set({
          selectedSubscription: sub as UserSubscriptionPriceLabel,
          promoCode
        });
      }
    } else if (!CONSTANTS.USER_SUBSCRIPTION.PRICE_LABELS.includes(selectedSubscription as any)) {
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
      <Box
        sx={{
          minHeight: "100%",
          width: "100%",
          padding: "clamp(1rem, 5%, 2rem)",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          "@media (min-width: 1450px)": {
            padding: "2rem clamp(2rem, 15%, 25rem) 0 clamp(2rem, 15%, 25rem)"
          }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            height: "100%",
            width: "100%",
            padding: "1rem",
            textAlign: "left",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: isMobilePageLayout ? "wrap" : "nowrap",
            "@media (min-width: 1100px)": {
              padding: "2rem"
            }
          }}
        >
          {/*   SECTION: LEFT/TOP   */}

          <CheckoutSections>
            <TitleLogo
              sx={{
                justifyContent: "flex-start",
                marginBottom: "1rem",
                "& > .title-logo-img": {
                  height: "8vh",
                  marginRight: "0.5rem"
                },
                "& > .title-logo-text": {
                  fontSize: "3rem"
                }
              }}
            />
            <div
              style={{
                height: "100%",
                ...(!isMobilePageLayout && { padding: "2.5rem 0 1.5rem 0" })
              }}
            >
              <SubCostDetails />
            </div>
          </CheckoutSections>

          {/*   SECTION: RIGHT/BOTTOM   */}

          <CheckoutSections
            sx={{
              ...(!isMobilePageLayout && {
                padding: "2rem 0",
                paddingLeft: "1rem",
                "@media (min-width: 1100px)": {
                  paddingLeft: "2rem"
                }
              })
            }}
          >
            {isMobilePageLayout && <Divider />}
            <Box
              sx={{
                width: "100%",
                opacity: "0.75",
                "& .MuiTypography-root": {
                  fontSize: "1.15rem",
                  lineHeight: "1.5rem"
                }
              }}
            >
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
                <Text
                  style={{
                    ...(isMobilePageLayout && {
                      fontSize: "0.95rem",
                      fontWeight: 300,
                      lineHeight: "1.15rem",
                      margin: "1rem 0",
                      textAlign: "center"
                    })
                  }}
                >
                  You'll receive a confirmation email with receipt upon completion.
                </Text>
              )}
            </Box>
            {showPaymentConfirmation !== true ? (
              <>
                <Text
                  variant="h2"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 400,
                    padding: 0,
                    margin: isMobilePageLayout ? "1rem 0" : "3rem 0",
                    borderWidth: "0 0 1px 0",
                    borderStyle: "solid",
                    borderColor: ({ palette }) => palette.divider
                  }}
                >
                  {selectedSubscription === "TRIAL" ? "Enter payment details" : "Pay with card"}
                </Text>
                <CheckoutForm onCompleteCheckout={handleCompleteCheckout} />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    fontWeight: 100,
                    fontSize: "0.7rem",
                    lineHeight: "1rem",
                    opacity: 0.75
                  }}
                >
                  {
                    // prettier-ignore
                    selectedSubscription === "TRIAL"
                        ? `After your trial ends, you will be charged $5.00 per month starting ${moment().add(14, "days").format("LL")}. You can always cancel before then.`
                        : `By confirming your subscription, you allow Fixit to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.`
                  }
                </Text>
              </>
            ) : (
              <PaymentConfirmationInfo />
            )}
          </CheckoutSections>
        </Paper>
        <LegalLinks includeStripeBadge style={{ margin: "1.5rem" }} />
        <Backdrop open={showBackdrop}>{LottieView}</Backdrop>
      </Box>
    </FetchStateContextWrapper>
  );
};

const CheckoutSections = styled("div")(({ theme }) => ({
  width: theme.variables.isMobilePageLayout ? "100%" : "50%",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
}));
