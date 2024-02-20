import type { Theme, SxProps } from "@mui/material/styles";

/**
 * Default styles for the `Link` and `Anchor` components.
 */
export const getDefaultLinkStyles = ({ theme: { palette } }: { theme: Theme }) =>
  ({
    color: palette.info.main,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      cursor: "pointer",
      opacity: 0.7,
    },
  }) satisfies SxProps<Theme>;
