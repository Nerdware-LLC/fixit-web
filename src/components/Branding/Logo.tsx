import { styled } from "@mui/material/styles";
import { getInlineSvgDataUrl } from "@/app/GlobalStyles/helpers.js";
import logoSrc from "@/images/fixit_icon.webp";
import { brandingClassNames } from "./classNames.js";
import type { Simplify } from "type-fest";

export const Logo = ({ alt = "Fixit logo", className = "", ...imgProps }: LogoProps = {}) => (
  <StyledImg
    src={logoSrc}
    alt={alt}
    className={brandingClassNames.fixitLogoImg + " " + className}
    {...imgProps}
  />
);

const StyledImg = styled("img")({
  alignSelf: "center",
  objectFit: "contain",
  zIndex: 100,
  maxHeight: "100%",
  borderRadius: "50%",
  imageRendering: "crisp-edges",
  aspectRatio: "1 / 1 !important",
  backgroundImage: getInlineSvgDataUrl(
    // white circle:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="white" />
    </svg>`
  ),
  backgroundPosition: "center !important",
  backgroundRepeat: "no-repeat !important",
  backgroundSize: "100%",
});

export type LogoProps = Simplify<Omit<React.ComponentProps<typeof StyledImg>, "src">>;
