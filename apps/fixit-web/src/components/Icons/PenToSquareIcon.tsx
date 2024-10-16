import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import PenToSquareIconSVG from "./assets/fa-pen-to-square.svg?react";

/**
 * FontAwesome Pen To Square Icon
 *
 * > This project uses [SVGR](https://github.com/pd4d10/vite-plugin-svgr#usage) to
 *   convert raw SVGs into React components, hence the `.svg?react` extension.
 */
export const PenToSquareIcon = (props: SvgIconProps) => (
  <SvgIcon component={PenToSquareIconSVG} inheritViewBox {...props} />
);
