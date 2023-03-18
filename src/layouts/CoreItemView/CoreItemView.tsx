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

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)({
  "& .core-content-view-children-container": {
    overflowX: "hidden",
    overflowY: "auto"
  }
});
