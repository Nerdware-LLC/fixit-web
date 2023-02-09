import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";

/**
 * classNames:
 *
 * - `"core-content-view-container"`
 * - `"core-content-view-header-container"`
 * - `"core-content-view-header-label"`
 * - `"core-content-view-scroll-container"`
 */
export const CoreContentViewLayout = ({
  headerLabel,
  headerComponents,
  children,
  ...containerProps
}: {
  headerLabel?: string;
  headerComponents?: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof CoreContentViewContainer>) => (
  <CoreContentViewContainer className={CLASS_NAMES.core_content_view_container} {...containerProps}>
    <Box className={CLASS_NAMES.core_content_view_header_container}>
      {headerLabel && (
        <Text variant="h4" component="h2" className={CLASS_NAMES.core_content_view_header_label}>
          {headerLabel}
        </Text>
      )}
      {headerComponents}
    </Box>
    <Box className={CLASS_NAMES.core_content_view_scroll_container}>{children}</Box>
  </CoreContentViewContainer>
);

const CLASS_NAMES = {
  core_content_view_container: "core-content-view-container",
  core_content_view_header_container: "core-content-view-header-container",
  core_content_view_header_label: "core-content-view-header-label",
  core_content_view_scroll_container: "core-content-view-scroll-container"
};

const CoreContentViewContainer = styled(Box)(({ theme }) => ({
  minHeight: "100%",
  height: "100%",
  width: "100%",
  maxWidth: "100vw",
  padding: theme.variables.isMobilePageLayout ? "0 1.5rem" : "0 2rem",
  display: "flex",
  flexDirection: "column",

  // Header container:

  [`& > div.${CLASS_NAMES.core_content_view_header_container}`]: {
    height: "6rem",
    width: "100%",
    padding: "1rem 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,

    [`& > .${CLASS_NAMES.core_content_view_header_label}`]: {
      flexGrow: 1,
      whiteSpace: "nowrap"
    }
  },

  // Scroll container:

  [`& > div.${CLASS_NAMES.core_content_view_scroll_container}`]: {
    height: "100%",
    margin: theme.variables.isMobilePageLayout ? "1rem 0" : "2rem 0",
    padding: "0 1rem 1rem 1rem",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  }
}));
