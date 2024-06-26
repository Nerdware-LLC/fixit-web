import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Text from "@mui/material/Typography";
import { coreContentViewLayoutClassNames } from "./classNames.js";

/**
 * Provides a common layout for list, item, form, and contact/profile views.
 */
export const CoreContentViewLayout = ({
  headerLabel,
  headerComponents,
  className = "",
  children,
  ...boxProps
}: CoreContentViewLayoutProps) => (
  <StyledBox className={coreContentViewLayoutClassNames.root + " " + className} {...boxProps}>
    <Box className={coreContentViewLayoutClassNames.headerContainer}>
      {headerLabel && (
        <Text variant="h4" component="h2" className={coreContentViewLayoutClassNames.headerLabel}>
          {headerLabel}
        </Text>
      )}
      {headerComponents}
    </Box>
    <Divider flexItem className={coreContentViewLayoutClassNames.sectionDivider} />
    <Box className={coreContentViewLayoutClassNames.childrenContainer}>{children}</Box>
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  // Header container:
  [`& > .${coreContentViewLayoutClassNames.headerContainer}`]: {
    ...(theme.variables.isMobilePageLayout
      ? {
          height: "4rem",
          minHeight: "4rem",
          gap: "1rem",
          padding: "1rem",
          justifyContent: "center",
        }
      : {
          height: "6rem",
          minHeight: "6rem",
          gap: "2rem",
          padding: "1rem 2rem",
          justifyContent: "flex-start",
        }),
    width: "auto",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    [`& > .${coreContentViewLayoutClassNames.headerLabel}`]: {
      whiteSpace: "nowrap",
      marginRight: "auto",
    },
  },

  // Divider:
  [`& > .${coreContentViewLayoutClassNames.sectionDivider}`]: {
    width: theme.variables.isMobilePageLayout ? "calc(100% - 2rem)" : "calc(100% - 4rem)",
    alignSelf: "center",
  },

  // Children container:
  [`& > .${coreContentViewLayoutClassNames.childrenContainer}`]: {
    height: "100%",
    width: "auto",
    maxWidth: "100%",
    padding: theme.variables.isMobilePageLayout ? "1rem" : "1rem 2rem",
  },
}));

export type CoreContentViewLayoutProps = {
  headerLabel?: string;
  headerComponents?: React.ReactNode;
} & BoxProps;
