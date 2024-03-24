import { styled } from "@mui/material/styles";
import Box, { boxClasses } from "@mui/material/Box";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Text, { typographyClasses } from "@mui/material/Typography";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import { StripeBadge, brandingClassNames } from "@/components/Branding";
import { Anchor, LegalLinks, navigationClassNames } from "@/components/Navigation";
import { ProductSelection } from "./ProductSelection";
import { productsPageElementIDs } from "./elementIDs";

/**
 * **ProductsPage** - renders when path is "/products"
 */
export const ProductsPage = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <StyledDiv>
      <Text variant="h3">Subscription Pricing</Text>
      <ProductSelection isMobilePageLayout={isMobilePageLayout} />
      <Divider />
      <Box>
        <div id={productsPageElementIDs.fixitProductInfoContainer}>
          <Text style={{ fontWeight: "bold" }}>
            Fixit uses <Anchor href="https://stripe.com/">Stripe</Anchor> to process your payments
            quickly and keep your personal and payment information secure. Millions of companies
            around the world trust Stripe to process payments for their users.
          </Text>
          <Text>
            For payments made with a credit card, Stripe charges a transaction fee of 2.9% + 30¢.
            Click <Anchor href="https://stripe.com/pricing#pricing-details">here</Anchor> to learn
            more about Stripe transaction pricing.
          </Text>
          <LegalLinks includeStripeBadge={isMobilePageLayout} />
        </div>
        {!isMobilePageLayout && (
          <div>
            <StripeBadge />
          </div>
        )}
      </Box>
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = ProductsPage;

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  minHeight: "100%",
  minWidth: "15rem",
  width: "100%",
  maxWidth: "85rem",
  overflowY: variables.isMobilePageLayout ? "auto" : "hidden",
  margin: "0 auto",
  padding: "1rem clamp(2rem, 5%, 15vw)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "1rem",

  [`& > h1.${typographyClasses.root}`]: {
    lineHeight: "2.2rem",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  [`& > .${dividerClasses.root}`]: {
    ...(variables.isMobilePageLayout && { margin: "1rem 0" }),
    width: "clamp(15rem, 100%, 85rem)",
    minWidth: "15rem",
  },

  [`& > .${boxClasses.root}`]: {
    ...(variables.isMobilePageLayout ? { flexWrap: "wrap" } : { minWidth: "100%" }),
    width: "100%",
    maxWidth: "100dvh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    [`& > #${productsPageElementIDs.fixitProductInfoContainer}`]: {
      ...(variables.isMobilePageLayout ? { width: "100%" } : { width: "60%", maxWidth: "60rem" }),
      flexGrow: 1,
      flexShrink: 1,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",

      [`& > .${typographyClasses.root}`]: {
        fontSize: "1rem",
        lineHeight: 1.65,
        textAlign: "left",
        margin: 0,
      },

      [`& .${navigationClassNames.legalLinksRoot}`]: {
        marginTop: "1rem",
        ...(variables.isMobilePageLayout && { marginBottom: "2rem" }),
        // marginBottom on mobile to add more space at the bottom for the Stripe logo
      },
    },

    // The div around StripeBadge (on desktop only):
    "& > div:nth-of-type(2)": {
      minWidth: "20rem",
      width: "25%",
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      [`& .${brandingClassNames.stripeBadgeAnchor},.${brandingClassNames.stripeBadgeImg}`]: {
        height: "2.5rem",
      },
    },
  },
}));
