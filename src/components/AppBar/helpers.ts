import type { ThemeCustomAppVariables } from "@/app/ThemeProvider/themes";

/**
 * Returns the height of the `AppBar` component, which is dependent on the
 * `isMobilePageLayout` {@link ThemeCustomAppVariables|theme variable}.
 *
 * This is used by the `AppBar` and `RootPageLayout` components.
 *
 * @note This was previously implemented using a CSS variable set in the
 * `RootPageLayout` parent component, but this approach is more straight-forward
 * and allows the`AppBar's height to be defined alongside the `AppBar` itself.
 */
export const useAppBarHeight = ({
  isMobilePageLayout,
}: Pick<ThemeCustomAppVariables, "isMobilePageLayout">) => {
  return isMobilePageLayout ? "5rem" : "3.75rem";
};
