import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import DotDotDotIcon from "@mui/icons-material/MoreHoriz";
import AlertTriangleIcon from "@mui/icons-material/Warning";
import type { StepIconProps } from "@mui/material/StepIcon";

export const StepIconContainer = ({
  icon,
  active,
  completed,
  className,
  error,
  ref,
  ...containerProps
}: StepIconContainerProps) => (
  <StyledDiv
    ownerState={{ completed, active, error }}
    className={className}
    ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
    {...containerProps}
  >
    {completed ? (
      <CheckIcon />
    ) : active ? (
      error ? (
        <AlertTriangleIcon />
      ) : (
        icon
      )
    ) : (
      <DotDotDotIcon style={{ transform: "translateY(1px)" }} />
    )}
  </StyledDiv>
);

const StyledDiv = styled("div", {
  shouldForwardProp: (propName) => propName !== "ownerState",
})<StepIconOwnerState>(({ theme: { palette }, ownerState }) => ({
  width: "100%",
  height: "100%",
  zIndex: 1,
  color: "#fff",
  backgroundColor: palette.mode === "dark" ? palette.grey[700] : palette.grey[500],
  borderRadius: "50%",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",

  ...(ownerState.active && {
    backgroundImage: `linear-gradient(315deg, ${palette.primary.dark} 25%, ${palette.primary.light})`,
  }),

  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(315deg, ${palette.success.dark} 25%, ${palette.success.light})`,
  }),

  ...(ownerState.error && {
    backgroundImage: `linear-gradient(315deg, ${palette.error.dark} 25%, ${palette.error.light})`,
    "& > svg": {
      // These styles nudge the icon up a bit and ensures it doesn't visually overflow the container
      transform: "translateY(-1px)",
      maxWidth: "80%",
    },
  }),
}));

interface StepIconOwnerState {
  ownerState: {
    completed?: boolean;
    active?: boolean;
    error?: boolean;
  };
}

export type StepIconContainerProps = StepIconProps &
  Omit<React.ComponentPropsWithoutRef<typeof StyledDiv>, "ownerState" | "className" | "children">;
