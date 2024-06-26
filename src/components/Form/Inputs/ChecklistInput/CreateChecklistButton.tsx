import { useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/Add";
import type { ChecklistInputFormProps } from "./types.js";

export const CreateChecklistButton = ({ checklistFieldID }: ChecklistInputFormProps) => {
  const { setFieldValue } = useFormikContext();

  const handleCreateChecklist = async () => {
    await setFieldValue(
      checklistFieldID,
      [{ id: null, description: "", isCompleted: false }],
      false
    );
  };

  return (
    <StyledButton
      onClick={handleCreateChecklist}
      startIcon={<PlusIcon />}
      variant="text"
      color="primary"
    >
      Create Checklist
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme: { palette, variables } }) => ({
  ...(variables.isMobilePageLayout
    ? {
        height: "3rem",
        width: "100%",
      }
    : {
        height: "2.5rem",
        width: "min-content",
        padding: "0.55rem 1rem 0.5rem 0.5rem",
        transform: "translateX(-0.25rem)",
      }),
  justifyContent: "flex-start",
  fontWeight: palette.mode === "dark" ? 300 : 400,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis", // <-- shouldn't ever overflow, but just in case
  textTransform: "none",

  [`& > .${buttonClasses.startIcon}`]: {
    margin: "0 0.35rem 0 0",
  },
}));
