import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

/**
 * An IconButton with a subtle yet distinguishable flash/shine animation created by a
 * gradient-background rotating around the border of a Mui IconButton. The animation
 * uses a custom cubic-bezier curve which gives it the appearance of inertial motion.
 *
 * - For circular icons with a "filled" background, pass `shouldInvertColors=true`
 *   for a more preferable appearance.
 */
export const FlashyIconButton = styled(IconButton, {
  shouldForwardProp: (propName: string) => propName !== "shouldInvertColors",
})<{ shouldInvertColors?: boolean }>(({ theme: { palette }, shouldInvertColors = false }) => ({
  height: "2rem",
  width: "2rem",
  color: shouldInvertColors ? palette.primary.main : palette.background.default,
  position: "relative",
  zIndex: 2,

  "&::before": {
    content: '""',
    position: "absolute",
    height: "2.25rem",
    width: "2.25rem",
    background: `conic-gradient(${palette.primary.dark} 75%, ${palette.primary.main}, ${palette.primary.dark})`,
    borderRadius: "50%",
    zIndex: -1,
    animation: "rotate 1.5s cubic-bezier(.14,.36,.94,.71) infinite",

    "@keyframes rotate": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  },

  "& svg": {
    fontSize: "2rem",
    borderRadius: "50%",
    ...(shouldInvertColors
      ? {
          backgroundColor: palette.background.default,
          border: "none",
        }
      : {
          backgroundColor: palette.primary.main,
          border: `3px solid ${palette.background.default}`,
        }),
  },
}));
