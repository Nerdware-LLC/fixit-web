import Chip, { type ChipProps } from "@mui/material/Chip";
import { WO_CATEGORY_ICON_REACT_NODES } from "../Icons/WorkOrderCategoryIcon";
import type { WorkOrderCategory } from "@graphql/types";

/**
 * WorkOrder `category` Mui Chip
 */
export const WorkOrderCategoryChip = ({ category, ...props }: WorkOrderCategoryChipProps) => (
  <Chip label={category} icon={WO_CATEGORY_ICON_REACT_NODES[category]} {...props} />
);

export type WorkOrderCategoryChipProps = {
  category: WorkOrderCategory;
} & Omit<ChipProps, "avatar" | "icon">;
