import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { FetchStateContextProvider } from "@/app/FetchStateContext";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import { TitleLogo, brandingClassNames } from "@/components/Branding";
import { authPageLayoutClassNames } from "./classNames";

/**
 * Layout used by `RegisterPage` and `LoginPage`.
 */
export const AuthPageLayout = ({ pageTitle, children, ...boxProps }: AuthPageLayoutProps) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <FetchStateContextProvider>
      <StyledBox className={authPageLayoutClassNames.root} {...boxProps}>
        <Box className={authPageLayoutClassNames.header}>
          {!isMobilePageLayout && <TitleLogo />}
          <Text variant="h2" className={authPageLayoutClassNames.headerTitle}>
            {pageTitle}
          </Text>
        </Box>
        <Box className={authPageLayoutClassNames.childrenContainer}>{children}</Box>
      </StyledBox>
    </FetchStateContextProvider>
  );
};

const StyledBox = styled(Box)({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "3rem",
  textAlign: "center",

  [`& > .${authPageLayoutClassNames.header}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",

    [`& > .${brandingClassNames.titleLogoRoot}`]: {
      gap: "1rem",

      [`& > .${brandingClassNames.titleLogoText}`]: {
        fontSize: "3.5rem",
      },
    },

    [`& > .${authPageLayoutClassNames.headerTitle}`]: {
      fontSize: "2.25rem",
    },
  },

  [`& > .${authPageLayoutClassNames.childrenContainer}`]: {
    width: "clamp(18rem, 35vw, 26rem)",
    minHeight: "25vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",

    "& button": {
      borderRadius: "1.5rem",
    },
  },
});

export type AuthPageLayoutProps = { pageTitle: string } & Omit<BoxProps, "className">;
