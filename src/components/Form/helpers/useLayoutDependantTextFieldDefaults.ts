import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import type { TextFieldProps } from "@mui/material/TextField";

/**
 * This hook reads the `PageLayoutContext` and returns default Mui TextField prop values:
 *
 * | TextField Prop &ensp; | Value on MOBILE &ensp; | Value on DESKTOP |
 * | :-------------------- | :--------------------: | :--------------: |
 * |   `variant`           |      `"outlined"`      |    `"filled"`    |
 * |   `size`              |       `"small"`        |    `"medium"`    |
 */
export const useLayoutDependantTextFieldDefaults = (): {
  defaultVariant: TextFieldProps["variant"];
  defaultSize: TextFieldProps["size"];
} & ReturnType<typeof usePageLayoutContext> => {
  const { isMobilePageLayout, isMobileUserAgent } = usePageLayoutContext();

  return {
    isMobilePageLayout,
    isMobileUserAgent,
    defaultVariant: isMobilePageLayout ? "outlined" : "filled",
    defaultSize: isMobilePageLayout ? "small" : "medium",
  };
};
