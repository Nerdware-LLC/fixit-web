import { styled } from "@mui/material/styles";
import {
  CoreContentViewLayout,
  coreContentViewLayoutClassNames,
} from "@layouts/CoreContentViewLayout";

/**
 * Provides common styles/props/logic to all core-item single-item views.
 */
export const CoreItemView = ({
  headerLabel,
  headerComponents,
  children,
  ...containerProps
}: CoreItemViewProps) => (
  <StyledCoreContentViewLayout
    headerLabel={headerLabel}
    headerComponents={headerComponents}
    {...containerProps}
  >
    {children}
  </StyledCoreContentViewLayout>
);

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)({
  [`& .${coreContentViewLayoutClassNames.childrenContainer}`]: {
    overflowX: "hidden",
    overflowY: "auto",
  },
});

export type CoreItemViewProps = {
  headerLabel: string; // is optional in CoreContentViewLayout
  headerComponents?: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof StyledCoreContentViewLayout>;
