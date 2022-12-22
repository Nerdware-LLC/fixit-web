import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as TrowelBricksIconSVG } from "./fa-trowel-bricks.svg";

export const TrowelBricksIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={TrowelBricksIconSVG} inheritViewBox {...props} />;
};
