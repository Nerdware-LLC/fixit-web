import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as TrowelBricksIconSVG } from "./assets/fa-trowel-bricks.svg";

/**
 * FontAwesome Trowel Bricks Icon
 */
export const TrowelBricksIcon = (props: SvgIconProps) => (
  <SvgIcon component={TrowelBricksIconSVG} inheritViewBox {...props} />
);
