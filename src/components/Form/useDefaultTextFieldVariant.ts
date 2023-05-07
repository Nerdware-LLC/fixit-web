import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import type { TextFieldProps } from "@mui/material/TextField";

/**
 * Default `variant` for all Mui inputs:
 *
 * - "filled" on desktop
 * - "outlined" on mobile
 */
export const useDefaultTextFieldVariant = (): TextFieldProps["variant"] => {
  const { isMobilePageLayout } = usePageLayoutContext();
  return isMobilePageLayout ? "outlined" : "filled";
};
