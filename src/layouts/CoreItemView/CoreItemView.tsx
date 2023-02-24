import { styled } from "@mui/material/styles";
import { CoreContentViewLayout } from "@layouts/CoreContentViewLayout";

/**
 * Provides common styles/props/logic to all core-item single-item views.
 */
export const CoreItemView = ({
  headerLabel,
  headerComponents,
  children,
  ...containerProps
}: {
  headerLabel: string; // is optional in CoreContentViewLayout
  headerComponents?: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof StyledCoreContentViewLayout>) => (
  <StyledCoreContentViewLayout
    headerLabel={headerLabel}
    headerComponents={headerComponents}
    {...containerProps}
  >
    {children}
  </StyledCoreContentViewLayout>
);

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme }) => ({
  "& .core-content-view-children-container": {
    overflowY: "auto !important",
    // child of scroll container:
    "& > div": {
      alignSelf: "center",
      width: theme.variables.isMobilePageLayout ? "100%" : "calc(100% - 2rem)" // <-- -2rem helps view to always look centered, with OR without scrollbar
    }
  }
}));
