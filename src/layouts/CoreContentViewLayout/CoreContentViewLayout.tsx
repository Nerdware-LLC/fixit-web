import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
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
}: CoreContentViewLayoutProps) => (
  <CoreContentViewContainer className={CLASS_NAMES.core_content_view_container} {...containerProps}>
    <Box className={CLASS_NAMES.core_content_view_header_container}>
      {headerLabel && (
        <Text variant="h4" component="h2" className={CLASS_NAMES.core_content_view_header_label}>
          {headerLabel}
        </Text>
      )}
      {headerComponents}
    </Box>
    <Divider flexItem className={CLASS_NAMES.core_content_view_section_divider} />
    <Box className={CLASS_NAMES.core_content_view_children_container}>{children}</Box>
  </CoreContentViewContainer>
);

const CLASS_NAMES = {
  core_content_view_container: "core-content-view-container",
  core_content_view_header_container: "core-content-view-header-container",
  core_content_view_header_label: "core-content-view-header-label",
  core_content_view_section_divider: "core-content-view-section-divider",
  core_content_view_children_container: "core-content-view-children-container"
};

const CoreContentViewContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  padding: theme.variables.isMobilePageLayout ? "0 1.5rem" : "0 2rem",
  display: "flex",
  flexDirection: "column",

  // Header container:

  [`& > .${CLASS_NAMES.core_content_view_header_container}`]: {
    ...(theme.variables.isMobilePageLayout
      ? {
          height: "4rem",
          minHeight: "4rem",
          gap: "1rem"
        }
      : {
          height: "6rem",
          minHeight: "6rem",
          gap: "2rem"
        }),
    width: "100%",
    padding: "1rem 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    [`& > .${CLASS_NAMES.core_content_view_header_label}`]: {
      whiteSpace: "nowrap",
      marginRight: "auto"
    }
  },

  // Divider:

  [`& > .${CLASS_NAMES.core_content_view_section_divider}`]: {
    marginBottom: "1rem"
  },

  // Children container:

  [`& > .${CLASS_NAMES.core_content_view_children_container}`]: {
    height: "100%"
  }
}));

export type CoreContentViewLayoutProps = {
  headerLabel?: string;
  headerComponents?: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof CoreContentViewContainer>;
