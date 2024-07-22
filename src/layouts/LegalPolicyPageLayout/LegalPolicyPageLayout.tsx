import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { LegalLinksFooter } from "@/components/Navigation";
import { legalPolicyPageLayoutClassNames } from "./classNames.js";

/**
 * Layout used by pages like `PrivacyPolicyPage` and `TermsOfServicePage`.
 */
export const LegalPolicyPageLayout = ({
  pageTitle,
  lastUpdated,
  children,
}: LegalPolicyPageLayoutProps) => (
  <StyledDiv className={legalPolicyPageLayoutClassNames.root}>
    <div className={legalPolicyPageLayoutClassNames.contentRoot}>
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
    </div>
    <LegalLinksFooter />
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { breakpoints } }) => ({
  [`& .${typographyClasses.body1}`]: {
    margin: "1rem 0",
  },

  [`& > .${legalPolicyPageLayoutClassNames.contentRoot}`]: {
    minHeight: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "1.5rem",
    // sm = 600px
    [breakpoints.up("sm")]: { padding: "2rem" },
  },
}));

export type LegalPolicyPageLayoutProps = {
  pageTitle: string;
  lastUpdated: string; // e.g., "January 01, 2022"
  children: React.ReactNode;
};
