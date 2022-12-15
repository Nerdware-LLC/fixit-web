import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { checkoutValuesStore } from "@app";
import {
  Loading,
  FetchStateContextWrapper,
  TitleLogo,
  Text,
  useWebViewContext,
  usePageLayoutContext
} from "@components";
import { CONSTANTS, type UserSubscriptionPriceLabel } from "@types";
import { storage } from "@utils";
import { PageContainer } from "@layouts/PageContainer";
import { SubCostDetails } from "./SubCostDetails";
import { CheckoutForm } from "./CheckoutForm";
import { Footer } from "./Footer";

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
        checkoutValuesStore.setCheckoutValues({
          selectedSubscription: sub as UserSubscriptionPriceLabel,
          promoCode
        });
      }
    } else if (!CONSTANTS.USER_SUBSCRIPTION.PRICE_LABELS.includes(selectedSubscription ?? "")) {
      // Else if not in a mobile-app WebView, redirect to /products if "selectedSubscription" isn't set
      nav("/products", { replace: true, state: { isRedirect: true } });
    }
  }, [isAppWithinWebView, nav, searchParams, selectedSubscription, webViewPostMessage]);

  return !selectedSubscription ? (
    <Loading />
  ) : (
    <PageContainer>
      <FetchStateContextWrapper>
        <StyledContentContainer>
          <StyledCheckoutContainer isMobilePageLayout={isMobilePageLayout}>
            <StyledCheckoutSections style={{ width: isMobilePageLayout ? "100%" : "50%" }}>
              <TitleLogo styles={styles.titleLogo} />
              <SubCostDetails />
            </StyledCheckoutSections>
            <StyledCheckoutSections
              style={{ padding: "1rem 0.5rem", width: isMobilePageLayout ? "100%" : "45%" }}
            >
              {!isMobilePageLayout && (
                <div style={{ width: "100%", margin: "auto 0", opacity: "0.75" }}>
                  <StyledInfoText>
                    People who need to get things done use Fixit to keep in touch with contractors
                    and customers, create work orders, submit invoices, and manage payments - all in
                    one place!
                  </StyledInfoText>
                  <br />
                  <StyledInfoText>
                    Whether you&apos;re a homeowner planning your next kitchen renovation, or a
                    general contractor looking for a better way to submit invoices and get paid for
                    your work, Fixit makes it easy.
                  </StyledInfoText>
                  <br />
                  <StyledInfoText>
                    You'll receive a confirmation email with receipt upon completion.
                  </StyledInfoText>
                </div>
              )}
              <CheckoutForm />
            </StyledCheckoutSections>
          </StyledCheckoutContainer>
          <Footer />
        </StyledContentContainer>
      </FetchStateContextWrapper>
    </PageContainer>
  );
};

const StyledContentContainer = styled("div")`
  height: 100%;
  width: 100vw;
  padding: 2.5rem 10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

// Surface
const StyledCheckoutContainer = styled("div")<{ isMobilePageLayout: boolean }>(
  ({ theme, isMobilePageLayout }) => ({
    height: "100%",
    width: "100%",
    padding: "5vh 5vw",
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(255, 255, 255, 0.35)",
    borderRadius: "10px",
    display: "flex",
    ...(isMobilePageLayout
      ? { flexDirection: "column", justifyContent: "flex-start" }
      : { flexDirection: "row", justifyContent: "space-between" })
  })
);

const StyledCheckoutSections = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
`;

const StyledInfoText = styled(Text)`
  font-size: 1.15rem;
  line-height: 1.5rem;
`;

const styles = {
  titleLogo: {
    container: { justifyContent: "flex-start", marginBottom: "1rem" },
    logo: { height: "8vh", marginRight: "0.5rem" },
    title: { fontSize: "3rem" }
  }
};
