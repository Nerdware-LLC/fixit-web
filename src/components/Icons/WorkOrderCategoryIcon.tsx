import AirIcon from "@mui/icons-material/Air";
import ToolsIcon from "@mui/icons-material/Construction";
import TrashCanIcon from "@mui/icons-material/Delete";
import LightningBoltIcon from "@mui/icons-material/FlashOn";
import TreesIcon from "@mui/icons-material/Forest";
import PaintRollerIcon from "@mui/icons-material/FormatPaint";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LayersIcon from "@mui/icons-material/Layers";
import PestBugIcon from "@mui/icons-material/PestControl";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import RoofingIcon from "@mui/icons-material/Roofing";
import RectanglesIcon from "@mui/icons-material/ViewQuilt";
import WindowIcon from "@mui/icons-material/Window";
import { RoadIcon } from "./RoadIcon";
import { TrowelBricksIcon } from "./TrowelBricksIcon";
import type { WorkOrderCategory } from "@graphql/types";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const WorkOrderCategoryIcon = ({ category, ...props }: WorkOrderCategoryIconProps) => {
  const CategoryIcon = WO_CATEGORY_ICONS[category];

  return <CategoryIcon {...props} />;
};

export const WO_CATEGORY_ICONS = {
  DRYWALL: RectanglesIcon,
  ELECTRICAL: LightningBoltIcon,
  FLOORING: LayersIcon,
  GENERAL: HomeRepairServiceIcon,
  HVAC: AirIcon,
  LANDSCAPING: TreesIcon,
  MASONRY: TrowelBricksIcon,
  PAINTING: PaintRollerIcon,
  PAVING: RoadIcon,
  PEST: PestBugIcon,
  PLUMBING: PlumbingIcon,
  ROOFING: RoofingIcon,
  TRASH: TrashCanIcon,
  TURNOVER: ToolsIcon,
  WINDOWS: WindowIcon,
};

export const WO_CATEGORY_ICON_REACT_NODES = {
  DRYWALL: <RectanglesIcon />,
  ELECTRICAL: <LightningBoltIcon />,
  FLOORING: <LayersIcon />,
  GENERAL: <HomeRepairServiceIcon />,
  HVAC: <AirIcon />,
  LANDSCAPING: <TreesIcon />,
  MASONRY: <TrowelBricksIcon />,
  PAINTING: <PaintRollerIcon />,
  PAVING: <RoadIcon />,
  PEST: <PestBugIcon />,
  PLUMBING: <PlumbingIcon />,
  ROOFING: <RoofingIcon />,
  TRASH: <TrashCanIcon />,
  TURNOVER: <ToolsIcon />,
  WINDOWS: <WindowIcon />,
};

export type WorkOrderCategoryIconProps = {
  category: Extract<WorkOrderCategory, string>;
} & SvgIconProps;
