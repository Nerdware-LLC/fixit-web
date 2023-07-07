import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import CompleteIcon from "@mui/icons-material/CheckCircleRounded";
import DocumentIcon from "@mui/icons-material/Description";
import EngineerCogsIcon from "@mui/icons-material/EngineeringRounded";
import ClockDottedOutlineIcon from "@mui/icons-material/HistoryToggleOffRounded";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import type { WorkOrderStatus } from "@graphql/types";

export const WorkOrderStatusIcon = ({ status, ...props }: WorkOrderStatusIconProps) => {
  const WOStatusIcon = WO_STATUS_ICONS[status];

  return <WOStatusIcon {...props} />;
};

export const WO_STATUS_ICONS: Record<WorkOrderStatus, typeof SvgIcon> = {
  UNASSIGNED: DocumentIcon,
  ASSIGNED: EngineerCogsIcon,
  IN_PROGRESS: ClockDottedOutlineIcon,
  DEFERRED: ExclamationMarkIcon,
  CANCELLED: NotInterestedIcon,
  COMPLETE: CompleteIcon,
};

export const WO_STATUS_ICON_REACT_NODES: Record<WorkOrderStatus, React.ReactElement> = {
  UNASSIGNED: <DocumentIcon />,
  ASSIGNED: <EngineerCogsIcon />,
  IN_PROGRESS: <ClockDottedOutlineIcon />,
  DEFERRED: <ExclamationMarkIcon />,
  CANCELLED: <NotInterestedIcon />,
  COMPLETE: <CompleteIcon />,
};

export type WorkOrderStatusIconProps = {
  status: WorkOrderStatus;
} & SvgIconProps;
