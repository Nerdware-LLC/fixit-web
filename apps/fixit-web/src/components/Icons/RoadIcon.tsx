import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import RoadIconSVG from "./assets/fa-road.svg?react";

/**
 * FontAwesome Road Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const RoadIcon = (props: SvgIconProps) => (
  <SvgIcon component={RoadIconSVG} inheritViewBox {...props} />
);
