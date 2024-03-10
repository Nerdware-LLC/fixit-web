import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext";
import type { TextFieldProps } from "@mui/material/TextField";

/**
 * Default `variant` for all Mui inputs:
 *
 * - "filled" on desktop
 * - "outlined" on mobile
 */
export const useDefaultTextFieldVariant = (): {
  defaultVariant: TextFieldProps["variant"];
} & ReturnType<typeof usePageLayoutContext> => {
  const { isMobilePageLayout, isMobileUserAgent } = usePageLayoutContext();

  return {
    isMobilePageLayout,
    isMobileUserAgent,
    defaultVariant: isMobilePageLayout ? "outlined" : "filled",
  };
};
