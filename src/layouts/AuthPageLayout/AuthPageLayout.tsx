import { styled } from "@mui/material/styles";
import Stack, { stackClasses, type StackProps } from "@mui/material/Stack";
import Text, { typographyClasses } from "@mui/material/Typography";
import { FetchStateContextProvider } from "@/app/FetchStateContext";
import {
  GOOGLE_OAUTH_BTN_DIMENSIONS,
  googleOAuthButtonClassNames,
} from "@/app/GoogleOAuthContext/GoogleOAuthButton";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import { TitleLogo } from "@/components/Branding/TitleLogo";
import { formClassNames } from "@/components/Form/classNames";
import { authPageLayoutClassNames } from "./classNames";

export type AuthPageLayoutProps = { pageTitle: string } & Pick<StackProps, "sx" | "children">;

/**
 * Layout used by `RegisterPage` and `LoginPage`.
 */
export const AuthPageLayout = ({ pageTitle, sx, children }: AuthPageLayoutProps) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <FetchStateContextProvider>
      <StyledStack sx={sx} className={authPageLayoutClassNames.root}>
        <Stack className={authPageLayoutClassNames.headerContainer}>
          {!isMobilePageLayout && <TitleLogo />}
          <Text variant={HEADER_VARIANT}>{pageTitle}</Text>
        </Stack>
        <Stack className={authPageLayoutClassNames.childrenContainer}>{children}</Stack>
      </StyledStack>
    </FetchStateContextProvider>
  );
};

/** The `variant` of the `AuthPageLayout` header text. */
const HEADER_VARIANT = "h2";

const StyledStack = styled(Stack)(({ theme: { variables } }) => ({
  height: "100%",
  padding: "0 1rem",

  "& button": {
    borderRadius: "1.5rem",
  },

  // This MuiStack, and any MuiStack within it:
  [`&.${stackClasses.root}, .${stackClasses.root}`]: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
  },

  // The `headerContainer`:
  [`& .${authPageLayoutClassNames.headerContainer}`]: {
    gap: "1rem",

    // The header text:
    [`& .${typographyClasses[HEADER_VARIANT]}`]: {
      fontSize: variables.isMobilePageLayout ? "2rem" : "2.25rem",
    },
  },

  // The `childrenContainer`:
  [`& .${authPageLayoutClassNames.childrenContainer}`]: {
    /* The `GoogleLogin` button's width must be set using an explicit pixel value
    via it's `width` prop. This width is set and enforced here to ensure descendent
    comps can just set `width: "100%"` and all have the same width. */
    width: variables.isMobilePageLayout
      ? `${GOOGLE_OAUTH_BTN_DIMENSIONS.WIDTH.MOBILE}px !important`
      : `${GOOGLE_OAUTH_BTN_DIMENSIONS.WIDTH.DESKTOP}px !important`,

    gap: "1rem",

    [`& .${formClassNames.root}`]: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },

    [`& .${googleOAuthButtonClassNames.root}`]: {
      alignSelf: "center",
    },
  },
}));
