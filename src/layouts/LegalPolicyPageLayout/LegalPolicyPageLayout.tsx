import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";

/**
 * Layout used by `PrivacyPolicyPage` and `TermsOfServicePage`.
 * - If `sx` prop is provided, it's passed to the div container.
 */
export const LegalPolicyPageLayout = ({
  pageTitle,
  lastUpdated,
  children,
}: {
  pageTitle: string;
  lastUpdated: string; // e.g., "January 01, 2022"
  children: React.ReactNode;
}) => (
  <StyledLegalPolicyPageLayoutContainer>
    <Text variant="h2" component="h1">
      {pageTitle}
    </Text>
    <Text variant="h4" component="h2">
      Last updated {lastUpdated}
    </Text>
    {children}
  </StyledLegalPolicyPageLayoutContainer>
);

const StyledLegalPolicyPageLayoutContainer = styled("div")({
  height: "100%",
  overflowY: "auto",
  padding: "1rem 1.5rem 1.5rem 1.5rem",

  "@media (min-width: 500px)": {
    padding: "2rem",
  },

  "@media (min-width: 1000px)": {
    padding: "2rem clamp(2rem, 10%, 10rem)",
  },

  "& .MuiTypography-body1": {
    margin: "1rem 0",
  },

  "& a": {
    textDecoration: "none",
  },

  "& ul > li": {
    listStyleType: "square",
  },
});
