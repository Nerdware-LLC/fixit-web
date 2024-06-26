import { getInlineSvgDataUrl } from "@/app/GlobalStyles/helpers.js";
import GitHubLogoSVG from "@/images/github_logo.svg";
import type { Except } from "type-fest";

export const GitHubLogo = ({ alt = "GitHub", style = {}, ...imgProps }: GitHubLogoProps) => (
  <img
    src={GitHubLogoSVG}
    alt={alt}
    style={{
      borderRadius: "50%",
      backgroundImage: getInlineSvgDataUrl(
        // white circle:
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="51" r="48" fill="white" />
        </svg>`
      ),
      ...style,
    }}
    {...imgProps}
  />
);

export type GitHubLogoProps = Except<React.ComponentProps<"img">, "src">;
