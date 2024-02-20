import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import TrowelBricksIconSVG from "./assets/fa-trowel-bricks.svg?react";

/**
 * FontAwesome Trowel Bricks Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const TrowelBricksIcon = (props: SvgIconProps) => (
  <SvgIcon
    component={TrowelBricksIconSVG}
    inheritViewBox
    style={{ maxHeight: "1.25rem" }}
    {...props}
  />
);
