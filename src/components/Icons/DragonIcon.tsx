import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as DragonIconSVG } from "./assets/fa-dragon.svg";

/**
 * FontAwesome Dragon Icon
 * - This is currently used in `PageNotFound`
 */
export const DragonIcon = (props: SvgIconProps) => (
  <SvgIcon component={DragonIconSVG} inheritViewBox {...props} />
);
