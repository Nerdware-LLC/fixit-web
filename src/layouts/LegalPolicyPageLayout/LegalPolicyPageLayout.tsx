import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";

/**
 * Layout used by `PrivacyPolicyPage` and `TermsOfServicePage`.
 */
export const LegalPolicyPageLayout = ({
  pageTitle,
  lastUpdated,
  children,
}: LegalPolicyPageLayoutProps) => (
  <StyledDiv>
    <Text variant="h2" component="h1">
      {pageTitle}
    </Text>
    <Text
      variant="h6"
      component="h2"
      style={{
        marginTop: "0.5rem",
        transform: "translateX(0.25rem)", // better alignment with above+below headers
        fontWeight: "lighter",
      }}
    >
      Last updated {lastUpdated}
    </Text>
    {children}
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { breakpoints } }) => ({
  minHeight: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "1.5rem",
  [breakpoints.up("sm")]: { padding: "2rem" },

  [`& .${typographyClasses.body1}`]: {
    margin: "1rem 0",
  },
}));

export type LegalPolicyPageLayoutProps = {
  pageTitle: string;
  lastUpdated: string; // e.g., "January 01, 2022"
  children: React.ReactNode;
};
