import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import Paper, { paperClasses } from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { THEMES } from "@/app/ThemeProvider/themes.js";
import { PhoneShapedContainer, containerClassNames } from "@/components/Containers";
import { DemoInfoDialog } from "@/components/DevTools/DemoInfoDialog.jsx";
import { LegalLinksFooter } from "@/components/Navigation";
import { NON_BREAKING_SPACE_CHAR } from "@/components/Text";
import backgroundImageSrc from "@/images/landing_page_bg.webp";
import { APP_PATHS } from "@/routes/appPaths.js";
import { ProductImage } from "./ProductImage.jsx";
import { landingPageClassNames } from "./classNames.js";

/**
 * **Landing Page** - index route for RootAppRouter which renders when the path is `"/"`.
 */
export const LandingPage = () => {
  const { isDialogVisible, closeDialog } = DemoInfoDialog.use();
  const nav = useNavigate();

  const goToRegister = () => nav(APP_PATHS.REGISTER);
  const goToProducts = () => nav(APP_PATHS.PRODUCTS);

  return (
    <StyledDiv id="landing-page__content-root">
      <div className={landingPageClassNames.textContainer}>
        <Text variant="h1">
          {`Simplify\nPayments,\nInvoices, and\nWork${NON_BREAKING_SPACE_CHAR}Orders`}
        </Text>
        <Text>
          People who need to get things done use <b>Fixit</b> to keep in touch with customers and
          contractors, create work orders, submit invoices, and manage payments — all in one place.
        </Text>
        <Button onClick={goToRegister} endIcon={<ChevronRightIcon />}>
          Get Started
        </Button>
      </div>
      <div className={landingPageClassNames.graphicsContainer}>
        <Paper elevation={18}>
          <ProductImage label="Fixit Dashboard demo" />
          <PhoneShapedContainer>
            <ProductImage label="Fixit Create-Invoice on mobile" />
          </PhoneShapedContainer>
        </Paper>
      </div>
      <div className={landingPageClassNames.graphicsContainer} style={{ alignItems: "center" }}>
        <Paper elevation={18}>
          <ProductImage label="Fixit work orders data-grid" />
          <PhoneShapedContainer>
            <ProductImage label="Fixit work orders list-view on mobile" />
          </PhoneShapedContainer>
        </Paper>
      </div>
      <div className={landingPageClassNames.textContainer}>
        <Text variant="h2">{`Powerful Tools,\nSimple to Use`}</Text>
        <Text>
          {/* This paragraph uses non-breaking hyphens (U+2011) to prevent hyphenated word wrap. */}
          Empower your workflow with the tools you need to stay organized across all your devices -
          without the learning curve. If you're tired of services that require costly and
          time‑consuming training, webinars, and other add‑ons, try <b>Fixit</b> today.
        </Text>
        <Button onClick={goToProducts}>Learn More</Button>
      </div>
      {isDialogVisible && <DemoInfoDialog isVisible={isDialogVisible} closeDialog={closeDialog} />}
      <LegalLinksFooter style={{ position: "absolute" }} />
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = LandingPage;

const StyledDiv = styled("div")(({ theme: { palette, variables, breakpoints } }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "100%",
  minHeight: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  zIndex: 1, // Ensures that the bg image in the pseudo-el is behind the content
  display: "grid",
  gap: "1rem",
  padding: "0 2rem 3rem 2rem",

  // MOBILE LAYOUT:
  gridTemplateColumns: "minmax(0, 1fr)",
  gridTemplateRows:
    "60vh " + //            text
    "minmax(0, 66vh) " + // graphic
    "minmax(0, 50vh) " + // text
    "minmax(0, 66vh) " + // graphic
    "8rem", //             footer

  [breakpoints.up(600)]: {
    padding: "2rem",
    gap: "2rem",
    gridTemplateRows: "repeat(2, 75vh) 9rem",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  // TEXT AND GRAPHICS CONTAINERS:
  "& > div": {
    zIndex: "inherit",
  },

  // TEXT CONTAINERS:
  [`& > .${landingPageClassNames.textContainer}`]: {
    justifySelf: "center",
    maxWidth: "30rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "2rem",
    textAlign: "left",

    [breakpoints.down(600)]: {
      width: "400px",
      maxWidth: "100%",
    },
    [breakpoints.down(450)]: {
      width: "300px",
    },

    // HEADERS:
    "& > h1,h2": {
      fontSize: "clamp(2.75rem, 6.5vw, 5rem)",
      lineHeight: 1,
      fontWeight: "bold",
      color: palette.secondary.main,
      whiteSpace: "pre",

      [breakpoints.between(450, 600)]: {
        "&:is(h1)": { fontSize: "3.5rem" },
        "&:is(h2)": { fontSize: "3.5rem" },
      },
    },
    // BODY TEXT:
    [`& > .${typographyClasses.body1}`]: {
      fontSize: variables.isMobilePageLayout ? "1.1rem" : "1.25rem",
      "& b": {
        color: palette.primary.main,
      },
    },
    // BUTTONS:
    [`& > .${buttonClasses.root}`]: {
      width: "15rem",
      alignSelf: "center",
      borderRadius: "1.5rem",
    },
  },

  // GRAPHICS CONTAINERS:
  [`& > .${landingPageClassNames.graphicsContainer}`]: {
    display: "flex",
    alignItems: "flex-start",
    [breakpoints.up(600)]: { alignItems: "center" },

    // The Paper component here is displays the desktop-dashboard-demo
    [`& > .${paperClasses.root}`]: {
      position: "relative",
      height: "90%",
      padding: "0.25rem",
      [breakpoints.between(600, 900)]: { height: "80%" },
      [breakpoints.up(900)]: { padding: "0.5rem" },
      maxHeight: "66vh",
      minWidth: "min-content",
      borderRadius: "0.35rem",
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      // Desktop and mobile images:
      "& img": {
        objectFit: "contain",
        imageRendering: "crisp-edges",
      },
      // Desktop images:
      [`& > img`]: {
        height: "100%",
        borderRadius: "inherit", // trims white spots from corners of image
      },
      // Phone-shaped container:
      [`& > .${containerClassNames.phoneShapedContainerRoot}`]: {
        opacity: 1,
        position: "absolute",
        bottom: "-5%",
        height: "95%",
        // The containing img reflects dark-mode, so the border needs to be dark as well:
        "& > div": {
          borderColor: THEMES.DARK.palette.background.paper,
        },
      },
    },

    /* PLACEMENT OF PHONE-SHAPED CONTAINERS:
    In desktop viewports, the grid is 2 columns wide, and for each subsequent row the text
    and graphics containers alternate between the left and right columns. Within each graphics
    container, the desktop screenshots need to be moved away from the middle slightly, and the
    phone-shaped container needs to be placed on the side closest to the middle. The below CSS
    achieves the following:
      - If phone-container is descendent from EVEN graphics-container, phone on LEFT.
      - If phone-container is descendent from ODD graphics-container, phone on RIGHT.
    */
    [`&:nth-of-type(even)`]: {
      justifyContent: "start",
      [`& > .${paperClasses.root}`]: {
        left: "clamp(8rem, 15%, 20rem)",
        [`& > .${containerClassNames.phoneShapedContainerRoot}`]: {
          left: "-10%",
        },
      },
    },
    [`&:nth-of-type(odd)`]: {
      justifyContent: "end",
      [`& > .${paperClasses.root}`]: {
        right: "clamp(8rem, 15%, 20rem)",
        [`& > .${containerClassNames.phoneShapedContainerRoot}`]: {
          right: "-10%",
        },
      },

      // ODD ROWS (continued)
      // Under 600px, the grid switches to 1 column, adjust order of text/graphics containers:
      [breakpoints.down(600)]: { order: 1 },
      [breakpoints.up(600)]: {
        // Above 600px, show a translucent bg behind ODD rows (imgs on left)
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: "-2rem",
          top: "1rem",
          zIndex: 0,
          backgroundColor: alpha(THEMES.DARK.palette.background.paper, 0.6),
          minWidth: "120vw",
          height: "100%",
        },
      },
    },
  },

  // The bg image is implemented as a pseudo element to allow for a filter to be applied
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundImage: `url(${backgroundImageSrc})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    objectFit: "contain",
    ...(palette.mode === "light" && { filter: "invert(25%) brightness(3)" }),
  },
}));
