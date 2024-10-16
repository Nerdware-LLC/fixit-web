import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Text from "@mui/material/Typography";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { StripeBadge, brandingClassNames } from "@/components/Branding";
import { Anchor, LegalLinksFooter } from "@/components/Navigation";
import { APP_URLS } from "@/routes/appURLs.js";
import { ProductSelection } from "./ProductSelection";
import { productsPageElementIDs } from "./elementIDs.js";

/**
 * **ProductsPage** - renders when path is "/products"
 */
export const ProductsPage = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <StyledDiv>
      <div id={productsPageElementIDs.contentRoot}>
        <Text variant="h3" style={{ textAlign: "center" }}>
          Subscription Pricing
        </Text>
        <ProductSelection isMobilePageLayout={isMobilePageLayout} />
        <Divider />
        <div id={productsPageElementIDs.productDetailsRoot}>
          <div id={productsPageElementIDs.productDetailsTextRoot}>
            <Text style={{ fontWeight: "bold" }}>
              Fixit uses <Anchor href={APP_URLS.STRIPE_LANDING_PAGE}>Stripe</Anchor> to process your
              payments quickly and keep your personal and payment information secure. Millions of
              companies around the world trust Stripe to process payments for their users.
            </Text>
            <Text>
              For payments made with a credit card, Stripe charges a transaction fee of 2.9% + 30¢.
              Click <Anchor href={APP_URLS.STRIPE_PRICING}>here</Anchor> to learn more about Stripe
              transaction pricing.
            </Text>
          </div>
          <div id={productsPageElementIDs.stripeImgWrapper}>
            <StripeBadge />
          </div>
        </div>
      </div>
      <LegalLinksFooter />
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = ProductsPage;

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  height: "100%",
  width: "100%",
  overflow: "hidden auto", // Prevents horizontal scroll on mobile "products" page
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",

  [`& > #${productsPageElementIDs.contentRoot}`]: {
    height: "fit-content",
    minWidth: "15rem",
    width: "100%",
    maxWidth: "75rem",
    padding: variables.isMobilePageLayout ? "1rem 1.5rem 1.5rem 1.5rem" : "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    gap: "1rem",
    flexGrow: 1,

    [`& > #${productsPageElementIDs.productDetailsRoot}`]: {
      width: "100%",
      display: "flex",
      flexDirection: variables.isMobilePageLayout ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      gap: "inherit",

      [`& > #${productsPageElementIDs.productDetailsTextRoot}`]: {
        ...(variables.isMobilePageLayout ? { width: "100%" } : { width: "60%" }),
        flexGrow: 1,
        flexShrink: 1,
        display: "flex",
        flexDirection: "column",
        gap: "inherit",
        whiteSpace: "pre-line",
      },

      [`& > #${productsPageElementIDs.stripeImgWrapper}`]: {
        minWidth: "20rem",
        width: "25%",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [`& .${brandingClassNames.stripeBadgeImg}`]: { height: "2.5rem" },
      },
    },
  },
}));
