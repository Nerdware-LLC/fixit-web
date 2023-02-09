import Text from "@mui/material/Typography";
import { Link, TextExternalLink, LegalLinks } from "@components";
import { AuthPageLayout } from "@layouts";
import { RegisterForm } from "./RegisterForm";

/**
 * **RegisterPage**
 * - Wrapped within `AuthPagesLayout` in RootAppRouter
 * - Renders when path is "/register"
 * - See link below for info regarding the legal language required by Stripe:
 *   https://stripe.com/docs/connect/updating-accounts#tos-acceptance
 */
export const RegisterPage = () => {
  return (
    <AuthPageLayout
      pageTitle="User Registration"
      sx={{
        "& > div.auth-page-content-container": {
          minHeight: "40vh",

          "& > #register-page-signup-legal-notice": {
            marginTop: "1.5rem",
            "& a": {
              color: "info.main",
              textDecoration: "none"
            }
          },

          "& > div.legal-links-container": {
            alignSelf: "center",
            marginTop: "1rem",
            marginLeft: "0.8rem"
          }
        }
      }}
    >
      <RegisterForm />
      <Text id="register-page-signup-legal-notice" variant="caption">
        By registering your account, you agree to the Fixit <Link to="/ToS">Terms of Service</Link>{" "}
        and the{" "}
        <TextExternalLink href="https://stripe.com/connect-account/legal/full">
          Stripe Connected Account Agreement
        </TextExternalLink>
        .
      </Text>
      <LegalLinks />
    </AuthPageLayout>
  );
};
