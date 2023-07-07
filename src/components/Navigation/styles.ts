import type { Theme } from "@mui/material/styles";

/**
 * Default Link and anchor styles
 */
export const defaultLinkStyles = ({
  theme,
  themecolor = "info",
}: {
  theme: Theme;
  themecolor?: "primary" | "secondary" | "info";
}) => ({
  color: theme.palette[themecolor].main,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "middle",
});
