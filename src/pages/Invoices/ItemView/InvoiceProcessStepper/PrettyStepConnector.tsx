import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

export const PrettyStepConnector = styled(StepConnector)<{ showerrorstyling: "yes" | "no" }>(
  ({ theme, showerrorstyling }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 23
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient(95deg, ${theme.palette.success.dark} 40%, ${theme.palette.success.light})`
      }
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          showerrorstyling === "no"
            ? `linear-gradient(95deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light})`
            : `linear-gradient(95deg, ${theme.palette.error.dark} 40%, ${theme.palette.error.light})`
      }
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[400],
      borderRadius: 1
    },
    ...(showerrorstyling === "yes" && {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.error.dark} 40%, ${theme.palette.error.light})`
    })
  })
);
