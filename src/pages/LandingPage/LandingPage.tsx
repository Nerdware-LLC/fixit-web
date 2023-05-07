import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import Text, { typographyClasses } from "@mui/material/Typography";
import RocketIcon from "@mui/icons-material/RocketLaunchOutlined";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { TitleLogo, titleLogoClassNames } from "@components/Branding/TitleLogo";
import { CanvasGradientBG } from "./CanvasGradientBG";

// TODO Add screenshot of dashboard (charts + widgets) to landing page

/**
 * Index route for RootAppRouter which renders when the path is "/".
 */
export const LandingPage = () => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();

  const goToLogin = () => nav("/login");
  const goToRegister = () => nav("/register");
  const goToProducts = () => nav("/products");

  return (
    <StyledDiv>
      <CanvasGradientBG />
      <div id={landingPageElementIDs.contentContainer}>
        <div id={landingPageElementIDs.introTextContainer}>
          <div /* TODO this div layer me be superfluous */>
            <span>
              <Text>Getting paid for your work, made easy.</Text>
            </span>
            <br />
            <span>
              <Text>
                People who need to get things done use <b>Fixit</b> to keep in touch with customers
                and contractors, create work orders, submit invoices, and manage payments — all in
                one place.
              </Text>
              <br />
              <Text variant="caption">
                Whether you&apos;re a homeowner planning your next kitchen renovation, or a general
                contractor looking for a better way to submit invoices and get paid for your work,{" "}
                <b>Fixit</b> makes it easy.
              </Text>
            </span>
          </div>
          {isMobilePageLayout && (
            <Button onClick={goToProducts} startIcon={<RocketIcon />}>
              Start Now
            </Button>
          )}
        </div>
        {!isMobilePageLayout && (
          <div id={landingPageElementIDs.desktopContentContainer}>
            <TitleLogo />
            <div id={landingPageElementIDs.desktopButtonsContainer}>
              <Button onClick={goToRegister}>Start Now</Button>
              <Button onClick={goToLogin} variant="outlined">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </StyledDiv>
  );
};

export const landingPageElementIDs = {
  contentContainer: "landing-page-content-container",
  introTextContainer: "landing-page-intro-text-container",
  desktopContentContainer: "landing-page-desktop-content-container",
  desktopButtonsContainer: "landing-page-desktop-buttons-container",
};

const StyledDiv = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",

  [`& > #${landingPageElementIDs.contentContainer}`]: {
    padding: "10vh 2rem",
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    ...(theme.variables.isMobilePageLayout ? { flexWrap: "wrap" } : { alignItems: "center" }),
    "& button": {
      borderRadius: "1.5rem",
    },

    [`& > #${landingPageElementIDs.introTextContainer}`]: {
      height: "100%",
      width: theme.variables.isMobilePageLayout ? "100%" : "clamp(30rem, 55%, 55vw)",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",

      // TODO the below intermediate div layer may be superfluous
      "& > div:first-of-type > span": {
        [`&:first-of-type > .${typographyClasses.root}`]: {
          color: theme.palette.secondary.main,
          fontSize: "clamp(2.8rem, 8vw, 5rem)",
          lineHeight: "clamp(3rem, 7.75vw, 5.2rem)",
          fontWeight: "bold",
        },
        "&:last-of-type": {
          [`& > .${typographyClasses.root}`]: {
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            lineHeight: "clamp(1.5rem, 2.15vw, 1.9rem)",
            fontWeight: "100",
          },
          "& b": {
            color: theme.palette.primary.main,
          },
        },
      },

      [`& > .${buttonClasses.root}`]: {
        width: "100%",
        maxWidth: "30rem",
        lineHeight: "2rem",
        alignSelf: "center",
      },
    },

    [`& > #${landingPageElementIDs.desktopContentContainer}`]: {
      height: "100%",
      minWidth: "21rem",
      maxWidth: "30vw",
      width: "clamp(20vw, 25%, 30vw)",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      [`& > .${titleLogoClassNames.root}`]: {
        width: "100%",
        margin: "clamp(1rem, 1vw, 5rem) 0",
        [`& > .${titleLogoClassNames.logoImg}`]: {
          width: "50%",
          backgroundColor: "white",
          backgroundPosition: "center",
        },
        [`& > .${titleLogoClassNames.logoText}`]: {
          fontSize: "clamp(3.5rem, 5vw, 4.5rem)",
          margin: "0 2rem 0 clamp(1rem, 5%, 2rem)",
        },
      },

      [`& > #${landingPageElementIDs.desktopButtonsContainer}`]: {
        height: "16vh",
        maxHeight: "16vh",
        width: "100%",
        maxWidth: "22rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-evenly",
        alignSelf: "center",
      },
    },
  },
}));
