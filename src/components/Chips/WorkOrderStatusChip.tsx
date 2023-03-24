import Chip, { type ChipProps } from "@mui/material/Chip";
import { WO_STATUS_ICON_REACT_NODES } from "../Icons";
import type { SxProps } from "@mui/material/styles";
import type { WorkOrder } from "@types";

/**
 * WorkOrder `status` Mui Chip
 */
export const WorkOrderStatusChip = ({
  status,
  ...props
}: {
  status: Extract<WorkOrder["status"], string>;
} & Omit<ChipProps, "avatar" | "icon">) => (
  <Chip
    label={status.replace(/_/g, " ")}
    icon={WO_STATUS_ICON_REACT_NODES[status] as React.ReactElement}
    sx={
      {
        "& svg:first-of-type": {
          ...(status in STATUS_ICON_STYLES ? STATUS_ICON_STYLES[status] : {})
        }
      } as SxProps
    }
    {...props}
  />
);

// IN_PROGRESS and COMPLETE icons don't need margin-adjustments
const STATUS_ICON_STYLES: Partial<Record<WorkOrder["status"], SxProps>> = {
  UNASSIGNED: { margin: "0 0 0 0.5rem" },
  ASSIGNED: { margin: "0 -0.25rem 0 0.75rem" },
  DEFERRED: { margin: "0 -0.5rem 0 0.5rem" }
} as const;
