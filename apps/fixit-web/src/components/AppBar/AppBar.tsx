import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { DevTools } from "@/components/DevTools";
import { AppBarLogoButton } from "./AppBarLogoButton.jsx";
import { AppBarMenu } from "./AppBarMenu";
import { appBarElementIDs } from "./elementIDs.js";
import { useAppBarHeight } from "./helpers.js";
import type { CSSObject } from "@emotion/react";

/**
 * Mui Material AppBar, with position "fixed".
 *
 * **Positioning:** To ensure components do not render behind AppBar, an offset is used
 * to take up the same height and width. This positioning solution and its alternatives
 * are described [here](https://mui.com/material-ui/react-app-bar/#fixed-placement).
 *
 * > Don't add `theme.mixins.toolbar` as recommended in the docs. It does make an Offset,
 *   but (1) it breaks other styles, and (2) all it does is set min-height and breakpoints.
 */
export const AppBar = () => (
  <>
    <StyledMuiAppBar id={appBarElementIDs.root} position="fixed" elevation={0}>
      <AppBarLogoButton />
      <DevTools />
      <AppBarMenu />
    </StyledMuiAppBar>
    <div id={appBarElementIDs.fixedPositionOffset} />
  </>
);

const StyledMuiAppBar = styled(MuiAppBar)(({ theme: { palette, variables } }) => {
  // Get height from the useAppBarHeight helper:
  const appBarHeight = useAppBarHeight(variables);

  // These styles are all the same for both AppBar and its sibling offset (see jsdoc)
  const sharedStyles: CSSObject = {
    width: "100%",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    /* AppBar has two variants, Mobile and Desktop, the conditional rendering of which
    is determined by the PageLayoutContext value, isMobilePageLayout, which has been
    made available on the custom theme property "variables". Here this value is used to
    determine properties like height and width. Why not just use media queries for this?
    Because aside from factoring in viewport dimensions, isMobilePageLayout also factors
    in the user's browser as determined by `navigator.userAgent`.  */
    ...(variables.isMobilePageLayout
      ? {
          height: appBarHeight,
          minHeight: appBarHeight,
          maxHeight: appBarHeight,
          padding: "1.5rem",
          backgroundColor: palette.background.default,
        }
      : {
          height: appBarHeight,
          minHeight: appBarHeight,
          maxHeight: appBarHeight,
          padding: "1rem",
        }),
  };

  return {
    ...sharedStyles,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5rem",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: palette.divider,

    // Apply sharedStyles to the sibling offset div
    [`& + #${appBarElementIDs.fixedPositionOffset}`]: {
      ...sharedStyles,
      borderColor: "transparent",
    },
  };
});
