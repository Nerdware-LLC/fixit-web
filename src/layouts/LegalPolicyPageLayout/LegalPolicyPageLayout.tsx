import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";

/**
 * Layout used by `PrivacyPolicyPage` and `TermsOfServicePage`.
 * - If `sx` prop is provided, it's passed to the div container.
 */
export const LegalPolicyPageLayout = ({
  pageTitle,
  lastUpdated,
  children
}: {
  pageTitle: string;
  lastUpdated: string; // e.g., "January 01, 2022"
  children: React.ReactNode;
}) => (
  <StyledLegalPolicyPageLayoutContainer>
    <Text
      variant="h2"
      component="h1"
      sx={
        {
          // TODO test if the responsive-font-size thing made this unnecessary:
          //
          // "@media (max-width: 500px)": {
          //   fontSize: "2.5rem",
          //   lineHeight: "2.5rem"
          // }
        }
      }
    >
      {pageTitle}
    </Text>
    <Text variant="h4" component="h2">
      Last updated {lastUpdated}
    </Text>
    {children}
  </StyledLegalPolicyPageLayoutContainer>
);

const StyledLegalPolicyPageLayoutContainer = styled("div")({
  padding: "1.5rem",
  paddingBottom: "10rem",
  "& a": {
    textDecoration: "none"
  },
  "@media (min-width: 500px)": {
    padding: "2rem"
  },
  "@media (min-width: 1000px)": {
    padding: "2rem clamp(2rem, 10%, 10rem)"
  }
});
