import { styled } from "@mui/material/styles";
import PlusIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import Text from "@mui/material/Typography";
import { useField } from "formik";
import { AddChecklistItemButton } from "./AddChecklistItemButton";

export const ChecklistLabelBar = ({
  isExpanded,
  addChecklistItem
}: {
  isExpanded: boolean;
  addChecklistItem: Function;
}) => {
  const [field, meta] = useField("checklist");

  const doesChecklistExist = field.value;
  const textColor = meta.error ? "error" : isExpanded ? "secondary" : "primary";

  const iconProps = {
    color: textColor,
    style: { marginRight: "0.25rem" }
  } as const;

  return (
    <ChecklistLabelContainer isExpanded={isExpanded}>
      <span style={{ display: "inline-flex", verticalAlign: "middle", marginTop: "1px" }}>
        {doesChecklistExist ? <ListIcon {...iconProps} /> : <PlusIcon {...iconProps} />}
        <Text color={textColor} style={{ marginTop: "1px" }}>
          {doesChecklistExist ? "CHECKLIST" : "CREATE CHECKLIST"}
        </Text>
      </span>
      {isExpanded && <AddChecklistItemButton addChecklistItem={addChecklistItem} />}
    </ChecklistLabelContainer>
  );
};

const ChecklistLabelContainer = styled("div")<{ isExpanded: boolean }>(({ isExpanded }) => ({
  width: "100%",
  padding: "1rem 1rem calc(1rem - 5px) 1rem",
  verticalAlign: "middle",
  display: "flex",
  flex: "0 1 auto",
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 5,
  backgroundColor: "transparent",
  ...(isExpanded
    ? {
        justifyContent: "space-between"
      }
    : {
        padding: "0",
        justifyContent: "center",
        "&: hover": {
          cursor: "pointer"
        }
      })
}));
