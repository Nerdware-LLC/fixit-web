import RectanglesIcon from "@mui/icons-material/ViewQuilt";
import LightningBoltIcon from "@mui/icons-material/FlashOn";
import LayersIcon from "@mui/icons-material/Layers";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AirIcon from "@mui/icons-material/Air";
import TreesIcon from "@mui/icons-material/Forest";
import PaintRollerIcon from "@mui/icons-material/FormatPaint";
import PestBugIcon from "@mui/icons-material/PestControl";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import RoofingIcon from "@mui/icons-material/Roofing";
import TrashCanIcon from "@mui/icons-material/DeleteOutline";
import ToolsIcon from "@mui/icons-material/Construction";
import WindowIcon from "@mui/icons-material/Window";
import { TrowelBricksIcon } from "./TrowelBricksIcon";
import { RoadIcon } from "./RoadIcon";
import type SvgIcon from "@mui/material/SvgIcon";
import type { WorkOrder } from "@types";

export const WorkOrderCategoryIcon = ({
  category,
  ...props
}: {
  category: Extract<WorkOrder["category"], string>;
} & React.ComponentProps<typeof SvgIcon>) => {
  const CategoryIcon = () => WO_CATEGORY_ICONS[category];
  return <CategoryIcon {...props} />;
};

export const WO_CATEGORY_ICONS = {
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
  WINDOWS: <WindowIcon />
};
