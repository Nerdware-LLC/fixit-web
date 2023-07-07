import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { isAuthenticatedStore } from "@cache/isAuthenticatedStore";
import { Logo, logoClassNames } from "@components/Branding/Logo";

export const AppBarLogoBtn = () => {
  const nav = useNavigate();
  const isAuthenticated = isAuthenticatedStore.useSubToStore();
  const { pathname } = useLocation();

  const goToLanding = () => nav(isAuthenticated ? "/home" : "/");

  return (
    <StyledDiv
      // LandingPage canvas-gradient-bg is light, so use dark text there
      sx={{
        ...(pathname === "/" && {
          color: "InfoText",
          fontWeight: "bold",
        }),
      }}
    >
      <Logo onClick={goToLanding} />
      <Text>Fixit</Text>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  [`& .${logoClassNames.root}`]: {
    imageRendering: "crisp-edges",
    height: variables.isMobilePageLayout ? "3rem" : "2.5rem",
    objectFit: "contain",
    "&:hover": {
      cursor: "pointer",
    },
  },

  [`& .${typographyClasses.root}`]: {
    // Don't show the name in the logo on desktop
    visibility: variables.isMobilePageLayout ? "visible" : "hidden",
    margin: "0 auto 0 0.5rem",
    fontSize: "1.5rem",
    // LandingPage canvas-gradient-bg is light, so use dark text there (set by parent)
    color: "inherit",
    fontWeight: "inherit",
  },
}));
