import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Text, { typographyClasses } from "@mui/material/Typography";
import { DragonIcon } from "@/components/Icons/DragonIcon.jsx";
import { Anchor } from "@/components/Navigation/Anchor.jsx";
import { Link } from "@/components/Navigation/Link.jsx";
import { APP_PATHS } from "@/routes/appPaths.js";

export const PageNotFound = () => {
  const nav = useNavigate();

  return (
    <StyledDiv>
      <div id={elementIDs.headerContainer}>
        <Text variant="h2">
          <span style={{ opacity: 0.3, marginRight: "1rem" }}>404</span>
          Whoops - this page doesn&apos;t seem to exist!
        </Text>
      </div>
      <div id={elementIDs.bodyContainer}>
        <div>
          <Text>Looking for something in particular? Hopefully one of these links will help:</Text>
          <ul>
            {[
              { to: APP_PATHS.HOME, label: "Home" },
              { to: APP_PATHS.PRODUCTS, label: "Pricing" },
              { to: APP_PATHS.PRIVACY, label: "Privacy Policy" },
              { to: APP_PATHS.ToS, label: "Terms of Service" },
            ].map(({ to, label }, index) => (
              <Fragment key={label}>
                {index !== 0 && <Divider orientation="vertical" flexItem />}
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <Text>
          Sure,{` `}
          <Anchor href="https://www.sparknotes.com/lit/fellowship/quotes/page/4/#:~:text=Quote%204,whether%20Strider%20is%20indeed%20Aragorn.">
            "Not all those who wander are lost"
          </Anchor>
          {`  `}
          and all that, but <i>you</i> - my friend - have wandered right off the map and straight
          into <em>"There be dragons" </em> territory! <DragonIcon />
        </Text>
      </div>
      <div>
        <Button
          onClick={() => nav(APP_PATHS.ROOT)}
          size="large"
          style={{ marginTop: "0.5rem", fontStyle: "italic" }}
        >
          Take me home!
        </Button>
      </div>
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = PageNotFound;

const elementIDs = {
  headerContainer: "page-not-found-header-container",
  bodyContainer: "page-not-found-body-container",
} as const;

const StyledDiv = styled("div")(({ theme: { breakpoints, variables } }) => ({
  height: "100%",
  padding: "3rem 2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "2rem",
  textAlign: "center",

  [breakpoints.up("md")]: {
    justifyContent: "center",
    padding: "4rem",
    gap: "4rem",
  },

  // ALL CHILD DIV-CONTAINERS (low-specificity)
  "& > div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "66rem",
  },

  // HEADER
  [`& > #${elementIDs.headerContainer} > h2.${typographyClasses.root}`]: {
    ...(variables.isMobilePageLayout
      ? { fontSize: "2rem", lineHeight: "2.25rem" }
      : { fontSize: "3.25rem", lineHeight: 1 }),
  },

  // BODY-CONTAINER
  [`& > #${elementIDs.bodyContainer}`]: {
    flexDirection: "column",
    gap: "inherit",
    ...(variables.isMobilePageLayout
      ? { fontSize: "1rem", lineHeight: "1.5rem" }
      : { fontSize: "1.5rem", lineHeight: "2rem" }),

    [`& .${typographyClasses.root}`]: {
      fontSize: "inherit",
      lineHeight: "inherit",
    },

    "& > div > ul": {
      margin: "0.5rem 0 0 0",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: variables.isMobilePageLayout ? "column" : "row",
      "& > li": {
        listStyleType: "none",
        margin: "0 1rem",
        "& > a": {
          textDecoration: "underline",
        },
      },
      [`& > .${dividerClasses.root}`]: {
        ...(variables.isMobilePageLayout && { display: "none" }),
      },
    },

    [`& > .${typographyClasses.root}`]: {
      whiteSpace: "pre-wrap",

      "& a,em": {
        whiteSpace: "nowrap",
        fontStyle: "italic",
      },
      "& svg": {
        ...(variables.isMobilePageLayout
          ? {
              height: "1rem",
              marginLeft: "0.15rem",
              transform: "translateY(2px)",
            }
          : {
              height: "1.5rem",
              marginLeft: "0.35rem",
              transform: "translateY(3px)",
            }),
      },
    },
  },
}));
