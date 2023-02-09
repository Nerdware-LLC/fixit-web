import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as PenToSquareIconSVG } from "./fa-pen-to-square.svg";

export const PenToSquareIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={PenToSquareIconSVG} inheritViewBox {...props} />;
};
