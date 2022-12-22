import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import CheckmarkCircleIcon from "@mui/icons-material/CheckCircle";
import EmptyCheckBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import type { WorkOrderChecklistItem } from "@types";

export const ChecklistItem = ({ checklistItem }: { checklistItem: WorkOrderChecklistItem }) => (
  <ChecklistItemContainer>
    {checklistItem.isCompleted ? <CheckmarkCircleIcon color="success" /> : <EmptyCheckBoxIcon />}
    <Text style={{ marginLeft: "1rem" }}>{checklistItem.description}</Text>
  </ChecklistItemContainer>
);

const ChecklistItemContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "0.9rem 0",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: theme.palette.divider
}));
