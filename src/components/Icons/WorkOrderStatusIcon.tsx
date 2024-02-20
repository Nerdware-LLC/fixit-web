import { forwardRef } from "react";
import CompleteIcon from "@mui/icons-material/CheckCircleRounded";
import DocumentIcon from "@mui/icons-material/Description";
import EngineerCogsIcon from "@mui/icons-material/EngineeringRounded";
import ExclamationMarkIcon from "@mui/icons-material/ErrorOutline";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ClockDottedOutlineIcon from "@mui/icons-material/HistoryToggleOffRounded";
import { useMaybeRef } from "@/hooks/useMaybeRef";
import type { WorkOrderStatus } from "@/graphql/types";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const WorkOrderStatusIcon = forwardRef<SVGSVGElement, WorkOrderStatusIconProps>(
  function WorkOrderStatusIcon({ status, ...svgIconProps }, ref) {
    const svgRef = useMaybeRef(ref);

    const StatusIcon = WO_STATUS_ICONS[status];

    return <StatusIcon ref={svgRef} {...svgIconProps} />;
  }
);

/**
 * Map of {@link WorkOrderStatus|WorkOrder statuses} to their corresponding icon component.
 */
export const WO_STATUS_ICONS = {
  UNASSIGNED: DocumentIcon,
  ASSIGNED: EngineerCogsIcon,
  IN_PROGRESS: ClockDottedOutlineIcon,
  DEFERRED: ExclamationMarkIcon,
  CANCELLED: EventBusyIcon,
  COMPLETE: CompleteIcon,
} as const satisfies Record<WorkOrderStatus, React.ComponentType>;

/**
 * Map of {@link WorkOrderStatus|WorkOrder statuses} to their corresponding icon as JSX.
 * > If you need to pass props to the icon, use {@link WO_STATUS_ICONS} instead.
 */
export const WO_STATUS_ICONS_JSX = Object.fromEntries(
  Object.entries(WO_STATUS_ICONS).map(([status, Icon]) => [status, <Icon key={status} />])
) as Record<WorkOrderStatus, JSX.Element>;

export type WorkOrderStatusIconProps = {
  status: WorkOrderStatus;
} & SvgIconProps;
