import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as RoadIconSVG } from "./fa-road.svg";

export const RoadIcon = (props: React.ComponentProps<typeof SvgIcon>) => {
  return <SvgIcon component={RoadIconSVG} inheritViewBox {...props} />;
};
