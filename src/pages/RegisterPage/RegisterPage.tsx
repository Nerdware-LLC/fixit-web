import Stack from "@mui/material/Stack";
import Text from "@mui/material/Typography";
import { Anchor, Link, LegalLinks } from "@/components/Navigation";
import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { APP_PATHS } from "@/routes/appPaths.js";
import { APP_URLS } from "@/routes/appURLs.js";
import { RegisterForm } from "./RegisterForm.jsx";

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
    <Stack spacing={2}>
      <Text variant="caption" sx={{ "& > a": { display: "contents" } }}>
        By registering your account, you agree to the Fixit{" "}
        <Link to={APP_PATHS.ToS}>Terms of Service</Link> and the{" "}
        <Anchor href={APP_URLS.STRIPE_CONNECTED_ACCOUNT_AGREEMENT}>
          Stripe Connected Account Agreement
        </Anchor>
        .
      </Text>
      <LegalLinks
        style={{
          /* This comp is nudged to the right by the below margin in order to
          have the center of the form/page align with the center of the middle
          word, rather than the center of the container (looks better). */
          marginLeft: "1.25rem",
        }}
      />
    </Stack>
  </AuthPageLayout>
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = RegisterPage;
