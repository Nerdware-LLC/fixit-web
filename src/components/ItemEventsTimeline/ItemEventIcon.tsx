import { styled, type PaletteColor } from "@mui/material/styles";

export const ItemEventIcon = styled("div", {
  shouldForwardProp: (propName) => propName !== "iconHighlight" && propName !== "iconColorBase",
})<IconHighlightStyle & { iconColorBase?: PaletteColor }>(
  ({
    theme: { palette },
    iconHighlight = "blue",
    iconColorBase = iconHighlight === "blue" // default blue
      ? palette.info
      : iconHighlight === "yellow"
      ? palette.warning
      : palette.error, // else it's red
  }) => ({
    position: "relative",
    width: "2.5rem",
    minWidth: "2.5rem",
    height: "2.5rem",
    display: "inline-flex",
    placeContent: "center",
    placeItems: "center",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${iconColorBase.dark} 40%, ${iconColorBase.light})`,
    overflow: "visible",

    "& svg": {
      // Nudge these icons a little to the right
      "&[data-testid=NoteAddIcon], &[data-testid=UpdateIcon]": {
        marginLeft: "0.1rem",
      },
    },
  })
);

export interface IconHighlightStyle {
  iconHighlight?: string | "blue" | "yellow" | "red";
}
