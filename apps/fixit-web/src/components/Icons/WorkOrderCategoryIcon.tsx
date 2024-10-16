import { forwardRef } from "react";
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
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { RoadIcon } from "./RoadIcon.jsx";
import { TrowelBricksIcon } from "./TrowelBricksIcon.jsx";
import type { WorkOrderCategory } from "@/types/graphql.js";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const WorkOrderCategoryIcon = forwardRef<SVGSVGElement, WorkOrderCategoryIconProps>(
  function WorkOrderCategoryIcon({ category, ...svgIconProps }, ref) {
    const svgRef = useMaybeRef(ref);

    const CategoryIcon = WO_CATEGORY_ICONS[category];

    return <CategoryIcon ref={svgRef} {...svgIconProps} />;
  }
);

/**
 * Map of {@link WorkOrderCategory|WorkOrder categories} to their corresponding icon component.
 */
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
} as const satisfies Record<WorkOrderCategory, React.ComponentType>;

/**
 * Map of {@link WorkOrderCategory|WorkOrder categories} to their corresponding icon as JSX.
 * > If you need to pass props to the icon, use {@link WO_CATEGORY_ICONS} instead.
 */
export const WO_CATEGORY_ICONS_JSX = Object.fromEntries(
  Object.entries(WO_CATEGORY_ICONS).map(([category, Icon]) => [category, <Icon key={category} />])
) as Record<WorkOrderCategory, JSX.Element>;

export type WorkOrderCategoryIconProps = {
  category: WorkOrderCategory;
} & SvgIconProps;
