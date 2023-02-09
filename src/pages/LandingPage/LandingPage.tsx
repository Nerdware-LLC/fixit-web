import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import RocketIcon from "@mui/icons-material/RocketLaunchOutlined";
import { usePageLayoutContext } from "@app";
import { TitleLogo } from "@components";
import { CanvasGradientBG } from "./CanvasGradientBG";
import { IntroText } from "./IntroText";

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
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex"
      }}
    >
      <CanvasGradientBG />
      <Box
        id="landing-page-content-container"
        sx={(theme) => ({
          padding: "10vh 2rem",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          ...(theme.variables.isMobilePageLayout ? { flexWrap: "wrap" } : { alignItems: "center" }),
          "& button": {
            borderRadius: "1.5rem"
          }
        })}
      >
        <div
          style={{
            height: "100%",
            width: isMobilePageLayout ? "100%" : "clamp(30rem, 55%, 55vw)",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          <IntroText />
          {isMobilePageLayout && (
            <Button
              onClick={goToProducts}
              startIcon={<RocketIcon />}
              style={{
                width: "100%",
                maxWidth: "30rem",
                lineHeight: "2rem",
                alignSelf: "center"
              }}
            >
              Start Now
            </Button>
          )}
        </div>
        {!isMobilePageLayout && (
          <div
            style={{
              height: "100%",
              minWidth: "21rem",
              maxWidth: "30vw",
              width: "clamp(20vw, 25%, 30vw)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TitleLogo
              sx={{
                // styles applied to "title-logo-container"
                width: "100%",
                margin: "clamp(1rem, 1vw, 5rem) 0",
                "& > .title-logo-img": {
                  width: "50%",
                  background: "white",
                  clipPath: "circle(49%)" // trim some of the bg
                },
                "& > .title-logo-text": {
                  fontSize: "clamp(3.5rem, 5vw, 4.5rem)",
                  margin: "0 2rem 0 clamp(1rem, 5%, 2rem)"
                }
              }}
            />
            <Box
              sx={{
                height: "16vh",
                maxHeight: "16vh",
                width: "100%",
                maxWidth: "22rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "space-evenly",
                alignSelf: "center"
              }}
            >
              <Button onClick={goToRegister}>Start Now</Button>
              <Button onClick={goToLogin} variant="outlined">
                Sign In
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
};
