import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmptyCheckBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checklist as ChecklistComp, type RenderChecklistItemFn } from "@components/Checklist";
import type { ChecklistItem } from "@graphql/types";

export const Checklist = ({ checklist }: { checklist: Array<ChecklistItem> }) => (
  <StyledChecklist checklistItems={checklist} renderChecklistItem={renderChecklistItem} />
);

const renderChecklistItem: RenderChecklistItemFn = ({ item }) => (
  <li key={`ChecklistItem:${item.id}`}>
    {item.isCompleted ? <CheckBoxIcon color="success" /> : <EmptyCheckBoxIcon />}
    <Text>{item.description}</Text>
  </li>
);

const StyledChecklist = styled(ChecklistComp)(({ theme }) => ({
  height: "40vh",
  maxHeight: "40vh",

  "& li": {
    width: "100%",
    padding: "0.9rem 0",
    display: "flex",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    "&:last-of-type": {
      borderWidth: 0,
    },
    "& > svg": {
      marginRight: "1rem",
    },
  },
}));
