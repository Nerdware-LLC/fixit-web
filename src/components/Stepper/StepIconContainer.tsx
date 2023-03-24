import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import AlertTriangleIcon from "@mui/icons-material/Warning";
import type { StepIconProps } from "@mui/material/StepIcon";

export const StepIconContainer = ({ icon, active, completed, className, error }: StepIconProps) => (
  <StyledStepIconContainer ownerState={{ completed, active, error }} className={className}>
    {completed ? <CheckIcon /> : active ? error ? <AlertTriangleIcon /> : icon : <Text>...</Text>}
  </StyledStepIconContainer>
);

const StyledStepIconContainer = styled("div")<StepIconOwnerState>(
  ({ theme: { palette }, ownerState }) => ({
    width: "100%",
    height: "100%",
    zIndex: 1,
    color: "#fff",
    backgroundColor: palette.mode === "dark" ? palette.grey[700] : palette.grey[400],
    borderRadius: "50%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",

    ...(ownerState.active && {
      backgroundImage: `linear-gradient(135deg, ${palette.primary.dark} 30%, ${palette.primary.light})`,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),

    ...(ownerState.completed && {
      backgroundImage: `linear-gradient(135deg, ${palette.success.dark} 40%, ${palette.success.light})`
    }),

    ...(ownerState.error && {
      backgroundImage: `linear-gradient(135deg, ${palette.error.dark} 40%, ${palette.error.light})`
    }),

    [`& > .${typographyClasses.root}`]: {
      transform: "translateY(-2px)"
    }
  })
);

interface StepIconOwnerState {
  ownerState: {
    completed?: boolean;
    active?: boolean;
    error?: boolean;
  };
}
