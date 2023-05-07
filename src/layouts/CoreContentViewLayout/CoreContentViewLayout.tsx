import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Text from "@mui/material/Typography";
import { coreContentViewLayoutClassNames as classNames } from "./classNames";

/**
 * Provides a common layout for list, item, form, and contact/profile views.
 */
export const CoreContentViewLayout = ({
  headerLabel,
  headerComponents,
  children,
  ...containerProps
}: CoreContentViewLayoutProps) => (
  <StyledBox className={classNames.root} {...containerProps}>
    <Box className={classNames.headerContainer}>
      {headerLabel && (
        <Text variant="h4" component="h2" className={classNames.headerLabel}>
          {headerLabel}
        </Text>
      )}
      {headerComponents}
    </Box>
    <Divider flexItem className={classNames.sectionDivider} />
    <Box className={classNames.childrenContainer}>{children}</Box>
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  // Header container:
  [`& > .${classNames.headerContainer}`]: {
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

    [`& > .${classNames.headerLabel}`]: {
      whiteSpace: "nowrap",
      marginRight: "auto",
    },
  },

  // Divider:

  [`& > .${classNames.sectionDivider}`]: {
    width: theme.variables.isMobilePageLayout ? "calc(100% - 2rem)" : "calc(100% - 4rem)",
    alignSelf: "center",
  },

  // Children container:

  [`& > .${classNames.childrenContainer}`]: {
    height: "100%",
    width: "auto",
    maxWidth: "100%",
    padding: theme.variables.isMobilePageLayout ? "1rem" : "1rem 2rem",
  },
}));

export type CoreContentViewLayoutProps = {
  headerLabel?: string;
  headerComponents?: React.ReactNode;
  children: React.ReactNode;
} & BoxProps;
