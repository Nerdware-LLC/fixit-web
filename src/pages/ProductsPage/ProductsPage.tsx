import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Line from "@mui/material/Divider";
import styled from "@emotion/styled";
import { ProductInfoDisplay } from "./ProductInfoDisplay";
import { checkoutValuesStore } from "@app";
import { Title, TextExternalLink, StripeBadge } from "@components";
import { PageContainer } from "@layouts";
import { CONSTANTS } from "@types";

// TODO On ProductsPage, add links to /privacy and /ToS

/**
 * **ProductsPage**
 * - Renders when path is "/products"
 */
export const ProductsPage = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore();
  const { state: locationState } = useLocation();

  useEffect(() => {
    if (locationState?.isRedirect === true) {
      window.history.replaceState({}, document.title); // <-- clears window history state without re-render
      toast.info("Please select a subscription", { toastId: "please-select-sub" });
    }
  }, [locationState]);

  return (
    <PageContainer>
      <StyledContentContainer>
        <StyledHeaderContainer>
          <StyledPageHeader>Product Pricing</StyledPageHeader>
        </StyledHeaderContainer>
        <StyledPriceInfoDisplaysContainer>
          {CONSTANTS.USER_SUBSCRIPTION.PRICE_LABELS.map((productLabel) => (
            <ProductInfoDisplay
              key={`ProductInfoDisplay:${productLabel}`}
              label={productLabel}
              onClick={() =>
                checkoutValuesStore.setCheckoutValues({
                  selectedSubscription: productLabel,
                  promoCode: promoCode ?? null
                })
              }
              isSelected={selectedSubscription === productLabel}
            />
          ))}
        </StyledPriceInfoDisplaysContainer>
        <Line style={{ margin: "-1rem 0 -1.5rem 0" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <StyledText style={{ fontWeight: "bold", margin: "0" }}>
              Fixit uses <TextExternalLink linkText="Stripe" href="https://stripe.com/" /> to
              process your payments quickly and keep your personal and payment information secure.
              Millions of companies around the world trust Stripe to process payments for their
              users.
            </StyledText>
            <br />
            <StyledText style={{ margin: "0" }}>
              For payments made with a credit card, Stripe charges a transaction fee of 2.9% + 30¢.
              Click{" "}
              <TextExternalLink linkText="here" href="https://stripe.com/pricing#pricing-details" />{" "}
              to learn more about Stripe transaction pricing.
            </StyledText>
          </div>
          <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
            <StripeBadge style={{ height: "2.5rem", margin: "0 5rem" }} />
          </div>
        </div>
      </StyledContentContainer>
    </PageContainer>
  );
};

const StyledContentContainer = styled.div`
  height: 100%;
  padding: 0 15vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPageHeader = styled(Title)`
  font-size: 2rem;
  line-height: 0;
  font-weight: bold;
`;

const StyledPriceInfoDisplaysContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

const StyledText = styled.p`
  font-size: 1rem;
  line-height: 1.75rem;
  text-align: left;
`;
