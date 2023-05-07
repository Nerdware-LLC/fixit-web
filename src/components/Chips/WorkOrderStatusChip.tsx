import Chip, { type ChipProps } from "@mui/material/Chip";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { WO_STATUS_ICON_REACT_NODES } from "../Icons/WorkOrderStatusIcon";
import type { WorkOrderStatus } from "@graphql/types";
import type { SxProps } from "@mui/material/styles";

/**
 * WorkOrder `status` Mui Chip
 */
export const WorkOrderStatusChip = ({ status, ...props }: WorkOrderStatusChipProps) => (
  <Chip
    label={status.replace(/_/g, " ")}
    icon={WO_STATUS_ICON_REACT_NODES[status]}
    sx={{
      [`& svg.${svgIconClasses.root}`]: {
        ...(status in STATUS_ICON_STYLES ? STATUS_ICON_STYLES[status] : {}),
      },
    }}
    {...props}
  />
);

// Status-icon margin adjustments
const STATUS_ICON_STYLES = {
  UNASSIGNED: { margin: "0 0 0 0.5rem" },
  ASSIGNED: { margin: "0 -0.25rem 0 0.75rem" },
  DEFERRED: { margin: "0 -0.5rem 0 0.5rem" },
} as Partial<Record<WorkOrderStatus, SxProps>>;

export type WorkOrderStatusChipProps = {
  status: Extract<WorkOrderStatus, string>;
} & Omit<ChipProps, "avatar" | "icon">;
