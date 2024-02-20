import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import PersonCircleExclamationIconSVG from "./assets/fa-person-circle-exclamation.svg?react";

/**
 * FontAwesome Person Circle Exclamation Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const PersonCircleExclamationIcon = (props: SvgIconProps) => (
  <SvgIcon component={PersonCircleExclamationIconSVG} inheritViewBox {...props} />
);
