import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";

/**
 * Provides a common layout for list, item, form, and contact/profile views.
 *
 * classNames:
 *
 * - `"core-content-view-container"`
 * - `"core-content-view-header-container"`
 * - `"core-content-view-header-label"`
 * - `"core-content-view-children-container"`
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
    <Box className={CLASS_NAMES.core_content_view_children_container}>{children}</Box>
  </CoreContentViewContainer>
);

const CLASS_NAMES = {
  core_content_view_container: "core-content-view-container",
  core_content_view_header_container: "core-content-view-header-container",
  core_content_view_header_label: "core-content-view-header-label",
  core_content_view_children_container: "core-content-view-children-container"
};

const CoreContentViewContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  padding: theme.variables.isMobilePageLayout ? "0 1.5rem" : "0 2rem",
  display: "flex",
  flexDirection: "column",

  // Header container:

  [`& > div.${CLASS_NAMES.core_content_view_header_container}`]: {
    height: "6rem",
    minHeight: "6rem",
    maxHeight: "6rem",
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
      whiteSpace: "nowrap"
    }
  },

  // Children container:

  [`& > div.${CLASS_NAMES.core_content_view_children_container}`]: {
    height: "100%",
    margin: theme.variables.isMobilePageLayout ? "1rem 0" : "2rem 0",
    overflow: "hidden"
  }
}));
