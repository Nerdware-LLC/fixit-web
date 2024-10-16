import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import DragonIconSVG from "./assets/fa-dragon.svg?react";

/**
 * FontAwesome Dragon Icon
 * - This is currently used in `PageNotFound`
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const DragonIcon = (props: SvgIconProps) => (
  <SvgIcon component={DragonIconSVG} inheritViewBox {...props} />
);
