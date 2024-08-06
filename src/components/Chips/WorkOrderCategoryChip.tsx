import { WO_CATEGORY_ICONS_JSX } from "@/components/Icons/WorkOrderCategoryIcon.jsx";
import { StyledChip, type StyledChipProps } from "./StyledChip.jsx";
import type { WorkOrderCategory } from "@/types/graphql.js";
import type { Except } from "type-fest";

/**
 * {@link WorkOrderCategory|WorkOrder `category`} Mui Chip
 */
export const WorkOrderCategoryChip = ({ category, ...chipProps }: WorkOrderCategoryChipProps) => (
  <StyledChip label={category} icon={WO_CATEGORY_ICONS_JSX[category]} {...chipProps} />
);

export type WorkOrderCategoryChipProps = {
  category: WorkOrderCategory;
} & Except<StyledChipProps, "label" | "icon" | "children" | "avatar" | "component">;
