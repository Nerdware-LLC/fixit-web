import { WO_STATUS_ICONS_JSX } from "@/components/Icons/WorkOrderStatusIcon.jsx";
import { StyledChip, type StyledChipProps } from "./StyledChip.jsx";
import type { WorkOrderStatus } from "@/types/graphql.js";
import type { Except } from "type-fest";

/**
 * {@link WorkOrderStatus|WorkOrder `status`} Mui Chip
 */
export const WorkOrderStatusChip = ({ status, ...chipProps }: WorkOrderStatusChipProps) => (
  <StyledChip label={status.replace(/_/g, " ")} icon={WO_STATUS_ICONS_JSX[status]} {...chipProps} />
);

export type WorkOrderStatusChipProps = {
  status: Extract<WorkOrderStatus, string>;
} & Except<StyledChipProps, "label" | "icon" | "children" | "avatar" | "component">;
