import Text from "@mui/material/Typography";
import { Anchor, Link, LegalLinks } from "@/components/Navigation";
import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { APP_PATHS } from "@/routes/appPaths";
import { RegisterForm } from "./RegisterForm";

/**
 * **RegisterPage**
 * - Wrapped within `AuthPagesLayout` in RootAppRouter
 * - Renders when path is "/register"
 * - See link below for info regarding the legal language required by Stripe:
 *   https://stripe.com/docs/connect/updating-accounts#tos-acceptance
 */
export const RegisterPage = () => (
  <AuthPageLayout pageTitle="User Registration">
    <RegisterForm />
    <Text variant="caption" style={{ marginTop: "1.5rem" }}>
      By registering your account, you agree to the Fixit{" "}
      <Link to={APP_PATHS.ToS}>Terms of Service</Link> and the{" "}
      <Anchor href="https://stripe.com/connect-account/legal/full">
        Stripe Connected Account Agreement
      </Anchor>
      .
    </Text>
    <LegalLinks style={{ margin: "1rem 0 0 0.8rem" }} />
  </AuthPageLayout>
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = RegisterPage;
