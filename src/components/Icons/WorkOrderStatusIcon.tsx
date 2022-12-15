import DocumentIcon from "@mui/icons-material/Description";
import EngineerCogsIcon from "@mui/icons-material/EngineeringRounded";
import ClockDottedOutlineIcon from "@mui/icons-material/HistoryToggleOffRounded";
import ExclamationMarkIcon from "@mui/icons-material/PriorityHighRounded";
import CompleteIcon from "@mui/icons-material/CheckCircleRounded";
import { StyledIconContainer } from "./StyledIconContainer";
import type { WorkOrder } from "@types";

export const WorkOrderStatusIcon = ({
  status,
  style = {},
  ...props
}: {
  status: WorkOrder["status"];
} & React.ComponentProps<typeof StyledIconContainer>) => (
  <StyledIconContainer style={style} {...props}>
    {STATUS_ICONS[status]}
  </StyledIconContainer>
);

const STATUS_ICONS: Record<WorkOrder["status"], React.ReactNode> = {
  UNASSIGNED: <DocumentIcon sx={{ fontSize: 33, marginLeft: "1.5px" }} />,
  ASSIGNED: <EngineerCogsIcon sx={{ fontSize: 30, marginLeft: "1px" }} />,
  IN_PROGRESS: <ClockDottedOutlineIcon sx={{ fontSize: 35, marginTop: "1px" }} />,
  DEFERRED: <ExclamationMarkIcon sx={{ fontSize: 34 }} />,
  COMPLETE: <CompleteIcon sx={{ fontSize: 37, marginTop: "1px" }} />
};
