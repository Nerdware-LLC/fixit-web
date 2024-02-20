import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

/**
 * A Mui Box which gives its child a rotating rainbow border 🌈🔄
 */
export const RainbowBorderBox = styled(Box, { shouldForwardProp: (prop) => prop !== "size" })<{
  size?: string;
}>(({ theme: { palette }, width, height, size = width || height || "10rem" }) => ({
  position: "relative",
  padding: palette.mode === "dark" ? "1px" : "2px", // a little thicker in light mode
  minHeight: "min-content",
  minWidth: "min-content",
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  borderRadius: "0.25rem",

  "&::before": {
    pointerEvents: "none",
    content: '""',
    position: "absolute",

    // SIZE:
    width: size,
    height: "auto !important",
    aspectRatio: "1 / 1 !important",

    backgroundImage: "conic-gradient(red, orange, yellow, lime, aqua, blue, magenta, red)",
    animation: "6s rotate linear infinite",

    "@keyframes rotate": {
      to: { transform: "rotate(360deg)" },
    },
  },
}));
