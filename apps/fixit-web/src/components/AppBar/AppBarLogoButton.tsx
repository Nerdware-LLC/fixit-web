import { styled } from "@mui/material/styles";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import Text, { typographyClasses } from "@mui/material/Typography";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { Logo, brandingClassNames } from "@/components/Branding";
import { Anchor, navigationClassNames } from "@/components/Navigation";
import { APP_PATHS } from "@/routes/appPaths.js";
import { isAuthenticatedStore } from "@/stores";

export const AppBarLogoButton = () => {
  const isAuthenticated = isAuthenticatedStore.useSubToStore();
  const { isLoading } = useFetchStateContext();

  return (
    <StyledDiv className={brandingClassNames.titleLogoRoot}>
      <Anchor href={isAuthenticated ? APP_PATHS.HOME : APP_PATHS.ROOT}>
        {isLoading && <CircularProgress />}
        <Logo className={brandingClassNames.titleLogoImg} />
        <Text variant="h1" className={brandingClassNames.titleLogoText}>
          Fixit
        </Text>
      </Anchor>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette, variables } }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  [`& > a.${navigationClassNames.anchorRoot}`]: {
    position: "relative",
    display: "flex",
    border: "none",
    textDecoration: "none",

    // Increase the anchor's default hover-opacity from 0.7 to 0.75
    "&:hover": {
      // Why do the css selection like this? To avoid dimming the root app loading indicator.
      [`& > .${brandingClassNames.fixitLogoImg},.${typographyClasses.root}`]: {
        opacity: 0.75,
      },
    },

    // ROOT APP LOADING INDICATOR
    // Note: This is only shown if `isLoading` prop is set true in the top-most FetchStateContext.
    [`& > .${circularProgressClasses.root}`]: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // These values ensure the spinner appears to go around the Logo img:
      ...(variables.isMobilePageLayout
        ? { height: "90% !important", left: "2px" }
        : { height: "100% !important", left: "-2px" }),
      [`& > svg.${circularProgressClasses.svg}`]: {
        overflow: "visible",
        // Like the parent el's height+left props, this height centers the spinner:
        height: variables.isMobilePageLayout ? "130%" : "120%",
        "& > circle": {
          strokeWidth: variables.isMobilePageLayout ? "4px" : "5px",
        },
      },
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
