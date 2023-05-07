import Text from "@mui/material/Typography";
import { Anchor } from "@components/Navigation/Anchor";
import { LegalLinks, legalLinksClassNames } from "@components/Navigation/LegalLinks";
import { Link } from "@components/Navigation/Link";
import { AuthPageLayout, authPageLayoutClassNames } from "@layouts/AuthPageLayout";
import { RegisterForm } from "./RegisterForm";

/**
 * **RegisterPage**
 * - Wrapped within `AuthPagesLayout` in RootAppRouter
 * - Renders when path is "/register"
 * - See link below for info regarding the legal language required by Stripe:
 *   https://stripe.com/docs/connect/updating-accounts#tos-acceptance
 */
export const RegisterPage = () => (
  <AuthPageLayout
    pageTitle="User Registration"
    sx={{
      [`& > .${authPageLayoutClassNames.childrenContainer}`]: {
        minHeight: "40vh",

        [`& > #${registerPageElementIDs.signupLegalNotice}`]: {
          marginTop: "1.5rem",
          "& a": {
            color: "info.main",
            textDecoration: "none",
          },
        },

        [`& > .${legalLinksClassNames.container}`]: {
          alignSelf: "center",
          marginTop: "1rem",
          marginLeft: "0.8rem",
        },
      },
    }}
  >
    <RegisterForm />
    <Text id={registerPageElementIDs.signupLegalNotice} variant="caption">
      By registering your account, you agree to the Fixit <Link to="/ToS">Terms of Service</Link>{" "}
      and the{" "}
      <Anchor href="https://stripe.com/connect-account/legal/full">
        Stripe Connected Account Agreement
      </Anchor>
      .
    </Text>
    <LegalLinks />
  </AuthPageLayout>
);

export const registerPageElementIDs = {
  signupLegalNotice: "register-page-signup-legal-notice",
};
