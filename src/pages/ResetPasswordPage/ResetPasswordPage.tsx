import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { ResetPasswordForm } from "./ResetPasswordForm.jsx";

/**
 * **ResetPasswordPage** - renders when path is "/reset-password"
 */
export const ResetPasswordPage = () => (
  <AuthPageLayout pageTitle="Reset Password">
    <ResetPasswordForm />
  </AuthPageLayout>
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = ResetPasswordPage;
