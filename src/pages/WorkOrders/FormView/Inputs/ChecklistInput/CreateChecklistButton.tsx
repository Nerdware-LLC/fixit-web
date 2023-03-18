import { useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/Add";

export const CreateChecklistButton = () => {
  const { setFieldValue } = useFormikContext();

  const handleCreateChecklist = () => {
    setFieldValue("checklist", [{ id: null, description: null, isCompleted: false }], false);
  };

  return (
    <StyledButton
      onClick={handleCreateChecklist}
      startIcon={<PlusIcon />}
      variant="text"
      color="secondary"
    >
      Create Checklist
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  ...(theme.variables.isMobilePageLayout
    ? {
        height: "3rem",
        width: "100%"
      }
    : {
        height: "3.5rem",
        width: "12rem"
      }),
  justifyContent: "flex-start",
  fontWeight: theme.palette.mode === "dark" ? 300 : 400,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis", // <-- shouldn't ever overflow, but just in case

  "& > .MuiButton-startIcon": {
    margin: "0 0.35rem 1px 0"
  }
}));
