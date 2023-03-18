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
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  // Header container:

  [`& > .${CLASS_NAMES.core_content_view_header_container}`]: {
    ...(theme.variables.isMobilePageLayout
      ? {
          height: "4rem",
          minHeight: "4rem",
          gap: "1rem",
          padding: "1rem",
          justifyContent: "center"
        }
      : {
          height: "6rem",
          minHeight: "6rem",
          gap: "2rem",
          padding: "1rem 2rem",
          justifyContent: "flex-start"
        }),
    width: "auto",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    [`& > .${CLASS_NAMES.core_content_view_header_label}`]: {
      whiteSpace: "nowrap",
      marginRight: "auto"
    }
  },

  // Divider:

  [`& > .${CLASS_NAMES.core_content_view_section_divider}`]: {
    width: theme.variables.isMobilePageLayout ? "calc(100% - 2rem)" : "calc(100% - 4rem)",
    alignSelf: "center"
  },

  // Children container:

  [`& > .${CLASS_NAMES.core_content_view_children_container}`]: {
    height: "100%",
    width: "auto",
    maxWidth: "100%",
    padding: theme.variables.isMobilePageLayout ? "1rem" : "1rem 2rem"
  }
}));

export type CoreContentViewLayoutProps = {
  headerLabel?: string;
  headerComponents?: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof CoreContentViewContainer>;
