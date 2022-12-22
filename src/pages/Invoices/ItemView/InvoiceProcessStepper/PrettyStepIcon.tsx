import { styled } from "@mui/material/styles";
import { INV_STATUS_ICONS } from "@components";
import DollarSignIcon from "@mui/icons-material/AttachMoney";
import AlertTriangleIcon from "@mui/icons-material/Warning";
import type { StepIconProps } from "@mui/material/StepIcon";

export const PrettyStepIcon = ({ icon, active, completed, className, error }: StepIconProps) => (
  <StyledPrettyStepIcon ownerState={{ completed, active, error }} className={className}>
    {error === true ? ICONS.ERROR : ICONS[String(icon)]}
  </StyledPrettyStepIcon>
);

const ICONS: { [index: string]: React.ReactElement } = {
  1: INV_STATUS_ICONS.OPEN as any,
  2: <DollarSignIcon />,
  3: INV_STATUS_ICONS.CLOSED as any,
  ERROR: <AlertTriangleIcon style={{ marginBottom: "0.2rem" }} />
};

const StyledPrettyStepIcon = styled("div")<StepIconOwnerState>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[400],
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light})`,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.success.dark} 40%, ${theme.palette.success.light})`
  }),
  ...(ownerState.error && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.error.dark} 40%, ${theme.palette.error.light})`
  })
}));

interface StepIconOwnerState {
  ownerState: {
    completed?: boolean;
    active?: boolean;
    error?: boolean;
  };
}
