import SvgIcon from "@mui/material/SvgIcon";
import DocumentIcon from "@mui/icons-material/Description";
import EngineerCogsIcon from "@mui/icons-material/EngineeringRounded";
import ClockDottedOutlineIcon from "@mui/icons-material/HistoryToggleOffRounded";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import CompleteIcon from "@mui/icons-material/CheckCircleRounded";
import type { WorkOrder } from "@types";

export const WorkOrderStatusIcon = ({
  status,
  ...props
}: {
  status: WorkOrder["status"];
} & React.ComponentProps<typeof SvgIcon>) => {
  const WOStatusIcon = WO_STATUS_ICONS[status];

  return <WOStatusIcon {...props} />;
};

export const WO_STATUS_ICONS: Record<WorkOrder["status"], typeof SvgIcon> = {
  UNASSIGNED: DocumentIcon,
  ASSIGNED: EngineerCogsIcon,
  IN_PROGRESS: ClockDottedOutlineIcon,
  DEFERRED: ExclamationMarkIcon,
  COMPLETE: CompleteIcon
};

export const WO_STATUS_ICON_REACT_NODES: Record<WorkOrder["status"], React.ReactNode> = {
  UNASSIGNED: <DocumentIcon />,
  ASSIGNED: <EngineerCogsIcon />,
  IN_PROGRESS: <ClockDottedOutlineIcon />,
  DEFERRED: <ExclamationMarkIcon />,
  COMPLETE: <CompleteIcon />
};
