import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Surface from "@mui/material/Paper";
import ListIcon from "@mui/icons-material/ViewList";
import { ChecklistItem } from "./ChecklistItem";
import type { WorkOrderChecklist } from "@types";

export const Checklist = ({ checklist }: { checklist: WorkOrderChecklist }) => (
  <ChecklistContainer>
    <ChecklistLabelContainer>
      <ListIcon style={{ marginRight: "0.25rem" }} />
      <Text>CHECKLIST</Text>
    </ChecklistLabelContainer>
    <div style={{ width: "100%", padding: "0 1rem" }}>
      {/* TODO add quick-action buttons like "Mark All Complete" */}
      {checklist.map((item) => (
        <ChecklistItem key={`ChecklistItem:${item.id}]`} checklistItem={item} />
      ))}
    </div>
  </ChecklistContainer>
);

const ChecklistContainer = styled(Surface)(({ theme }) => ({
  width: "100%",
  borderRadius: "1rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  display: "flex",
  flexDirection: "column",
  flex: "0 1 auto",
  alignItems: "flex-start", //    x-axis
  justifyContent: "flex-start" // y-axis
}));

const ChecklistLabelContainer = styled("div")(({ theme }) => ({
  height: "2.5rem",
  width: "100%",
  padding: "1rem",
  verticalAlign: "middle",
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}));
