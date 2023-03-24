import Chip, { type ChipProps } from "@mui/material/Chip";
import { WO_CATEGORY_ICON_REACT_NODES } from "../Icons";
import type { WorkOrder } from "@types";

/**
 * WorkOrder `category` Mui Chip
 */
export const WorkOrderCategoryChip = ({
  category,
  ...props
}: {
  category: Extract<WorkOrder["category"], string>;
} & Omit<ChipProps, "avatar" | "icon">) => (
  <Chip label={category} icon={WO_CATEGORY_ICON_REACT_NODES[category]} {...props} />
);
