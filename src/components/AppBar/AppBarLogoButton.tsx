import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { Logo, brandingClassNames } from "@/components/Branding";
import { Anchor } from "@/components/Navigation/Anchor";
import { APP_PATHS } from "@/routes/appPaths";
import { isAuthenticatedStore } from "@/stores";

export const AppBarLogoButton = () => {
  const isAuthenticated = isAuthenticatedStore.useSubToStore();

  return (
    <StyledDiv>
      <Anchor href={isAuthenticated ? APP_PATHS.HOME : APP_PATHS.ROOT}>
        <Logo />
        <Text variant="h1">Fixit</Text>
      </Anchor>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette, variables } }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  "& > a": {
    // Increase the anchor's default hover-opacity (0.7)
    "&:hover": {
      opacity: 0.75,
    },

    [`& > .${brandingClassNames.fixitLogoImg}`]: {
      height: variables.isMobilePageLayout ? "2.75rem" : "2.25rem",
      border: "1px solid white",
    },

    [`& > .${typographyClasses.root}`]: {
      margin: "0 auto 0 0.5rem",
      fontSize: "1.5rem",
      fontWeight: 400,
      color: palette.text.primary,
    },
  },
}));
