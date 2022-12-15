import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { LoginForm } from "./LoginForm";
import { FetchStateContextWrapper, TitleLogo } from "@components";

// TODO Adjust LoginPage layout for mobile

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
      toast.info(
        "Whoops! You must be logged in to perform this action. Please sign in or create an account.",
        { toastId: "auth-required-login-redirect" }
      );
    }
  }, [locationState]);

  return (
    <FetchStateContextWrapper>
      <div
        style={{
          height: "100%",
          width: "25vw",
          display: "flex",
          padding: "10vh 0",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <TitleLogo
            styles={{
              logo: { width: "8vw", marginRight: "1rem" },
              container: { justifyContent: "center" }
            }}
          />
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
      </div>
    </FetchStateContextWrapper>
  );
};
