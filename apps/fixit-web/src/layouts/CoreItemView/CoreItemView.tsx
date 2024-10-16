import { styled } from "@mui/material/styles";
import {
  CoreContentViewLayout,
  coreContentViewLayoutClassNames,
  type CoreContentViewLayoutProps,
} from "@/layouts/CoreContentViewLayout";

/**
 * Provides a common layout to all single-item and form views.
 *
 * - Uses {@link CoreContentViewLayout} as a base.
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
} & CoreContentViewLayoutProps;
