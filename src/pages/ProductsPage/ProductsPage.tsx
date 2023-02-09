import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { usePageLayoutContext } from "@app";
import { TextExternalLink, StripeBadge, LegalLinks } from "@components";
import { ProductSelection } from "./ProductSelection";

/**
 * **ProductsPage**
 * - Renders when path is "/products"
 */
export const ProductsPage = () => {
  const { state: locationState } = useLocation();
  const { isMobilePageLayout } = usePageLayoutContext();

  useEffect(() => {
    if (locationState?.isRedirect === true) {
      window.history.replaceState({}, document.title); // <-- clears window history state without re-render

      /* If a redirect comes from anywhere other than /register, show a
      toast msg prompting user to select a sub. Redirects from /register
      after successful user registration already show a toast msg prompting
      user to select a sub, so no need to duplicate the msg here. */
      if (locationState?.redirectedFrom !== "/register") {
        toast.info("Please select a subscription", { toastId: "please-select-sub" });
      }
    }
  }, [locationState]);

  return (
    <ProductsPageContainer>
      <Text
        component="h1"
        style={{
          ...(isMobilePageLayout
            ? {
                padding: "2rem",
                fontSize: "1.9rem"
              }
            : {
                padding: "3rem",
                fontSize: "2rem"
              }),
          lineHeight: "2.2rem",
          fontWeight: "bold",
          whiteSpace: "nowrap"
        }}
      >
        Subscription Pricing
      </Text>
      <ProductSelection isMobilePageLayout={isMobilePageLayout} />
      <Divider
        style={{
          margin: isMobilePageLayout ? "1.75rem 0" : "3rem 0",
          width: "clamp(15rem, 100%, 85rem)",
          minWidth: "15rem"
        }}
      />
      <div
        style={{
          ...(isMobilePageLayout ? { flexWrap: "wrap" } : { minWidth: "100%" }),
          width: "100%",
          maxWidth: "100dvh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div
          id="products-page-paragraphs-container"
          style={{
            ...(isMobilePageLayout
              ? { width: "100%" }
              : {
                  maxWidth: "60rem",
                  width: "60%"
                }),
            flexGrow: 1,
            flexShrink: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Fixit uses <TextExternalLink linkText="Stripe" href="https://stripe.com/" /> to process
            your payments quickly and keep your personal and payment information secure. Millions of
            companies around the world trust Stripe to process payments for their users.
          </Text>
          <br />
          <Text>
            For payments made with a credit card, Stripe charges a transaction fee of 2.9% + 30¢.
            Click{" "}
            <TextExternalLink linkText="here" href="https://stripe.com/pricing#pricing-details" />{" "}
            to learn more about Stripe transaction pricing.
          </Text>
          <br />
          <LegalLinks includeStripeBadge={isMobilePageLayout} />
        </div>
        {!isMobilePageLayout && (
          <div
            style={{
              minWidth: "20rem",
              width: "25%",
              padding: "2.5rem 5rem",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <StripeBadge style={{ height: "2.5rem", margin: "0 5rem" }} />
          </div>
        )}
      </div>
    </ProductsPageContainer>
  );
};

const ProductsPageContainer = styled("div")(({ theme }) => ({
  height: "100%",
  minWidth: "15rem",
  width: "100%",
  maxWidth: "85rem",
  margin: "0 auto",
  padding: "0 clamp(2rem, 5%, 15vw)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& #products-page-paragraphs-container": {
    "& > .MuiTypography-root": {
      fontSize: "1rem",
      lineHeight: "1.65rem",
      textAlign: "left",
      margin: 0
    },

    "& div.legal-links-container": {
      alignSelf: "center",
      ...(theme.variables.isMobilePageLayout && { marginBottom: "2.5rem" })
      /* Why the marginBottom on mobile? On desktop, the div that contains
      StripeBadge pads the bottom, but on mobile StripeBadge "moves" to the
      LegalLinks area and the div isn't rendered, hence the margin. */
    }
  }
}));
