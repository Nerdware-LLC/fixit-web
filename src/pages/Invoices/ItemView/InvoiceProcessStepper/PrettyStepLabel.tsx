import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";

export const PrettyStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    color: theme.palette.text.primary
  },
  "& .Mui-active": {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
  "& .Mui-error": {
    color: theme.palette.error.main
  }
}));
