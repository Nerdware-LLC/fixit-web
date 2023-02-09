import { useNavigate, useLocation } from "react-router-dom";
import Text from "@mui/material/Typography";
import { Logo } from "@components";

export const AppBarLogoBtn = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const goToLanding = () => nav("/");

  return (
    <div
      id="appbar-logo-container"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Logo
        onClick={goToLanding}
        sx={(theme) => ({
          height: theme.variables.isMobilePageLayout ? "3rem" : "2.5rem",
          objectFit: "contain",
          "&:hover": {
            cursor: "pointer"
          }
        })}
      />
      <Text
        sx={(theme) => ({
          // Don't show the name in the logo on desktop
          visibility: theme.variables.isMobilePageLayout ? "visible" : "hidden",
          // LandingPage canvas-gradient-bg is light, so use dark text there
          ...(pathname === "/" && { color: "InfoText" }),
          margin: "0 auto 0 0.5rem",
          fontSize: "1.5rem",
          fontWeight: "bold"
        })}
      >
        Fixit
      </Text>
    </div>
  );
};
