import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import { ReactComponent as PenToSquareIconSVG } from "./assets/fa-pen-to-square.svg";

/**
 * FontAwesome Pen To Square Icon
 */
export const PenToSquareIcon = (props: SvgIconProps) => (
  <SvgIcon component={PenToSquareIconSVG} inheritViewBox {...props} />
);
