import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AuthPageLayout } from "@layouts";
import { LoginForm } from "./LoginForm";

/**
 * **LoginPage**
 * - Wrapped within `AuthPagesLayout` in RootAppRouter
 * - Renders when path is "/login"
 */
export const LoginPage = () => {
  const { state: locationState } = useLocation();

  useEffect(() => {
    if (locationState?.isRedirect === true) {
      toast.info(
        "Whoops! You must be logged in to perform this action. Please sign in or create an account.",
        { toastId: "auth-required-login-redirect" }
      );
    }
  }, [locationState]);

  return (
    <AuthPageLayout
      pageTitle="User Login"
      sx={({ palette }) => ({
        "& > div.auth-page-content-container": {
          minHeight: "25vh",

          "& > #login-page-signup-link-container": {
            color: palette.info.main,
            alignSelf: "center",
            whiteSpace: "pre-line",
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            '& a[href="/register"]': {
              color: palette.info.main,
              alignSelf: "center",
              whiteSpace: "pre-line"
            }
          }
        }
      })}
    >
      <LoginForm />
      <span id="login-page-signup-link-container">
        <Link to="/register">Not an existing user? Sign up now </Link>
        <ChevronRightIcon />
      </span>
    </AuthPageLayout>
  );
};
