import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { LoginForm } from "./LoginForm";
import { FetchStateContextWrapper, TitleLogo } from "../../components";

/**
 * **LoginPage**
 * - `Outlet` of `LandingAndAuthPagesLayout`
 * - Renders when path is "/login"
 */
export const LoginPage = () => {
  const { state: locationState } = useLocation();
  const { palette } = useTheme();

  useEffect(() => {
    if (locationState?.isRedirect === true) {
      toast(
        "Whoops! You must be logged in to perform this action. Please sign in or create an account.",
        { type: "info" }
      );
    }
  }, [locationState]);

  return (
    <FetchStateContextWrapper>
      <div>
        <TitleLogo />
        <h1>User Login</h1>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            justifyItems: "space-evenly",
            placeSelf: "center",
            height: "40vh",
            width: "25vw",
            margin: "auto"
          }}
        >
          <LoginForm />
          <Link to="/register" style={{ color: palette.info.main }}>
            Not an existing user? Click here to sign up now
          </Link>
        </div>
      </div>
    </FetchStateContextWrapper>
  );
};

// TODO Create Link like "New user? Click here to register now"
