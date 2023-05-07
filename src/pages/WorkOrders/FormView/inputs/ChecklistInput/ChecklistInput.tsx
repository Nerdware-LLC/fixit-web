import { useField } from "formik";
import { styled } from "@mui/material/styles";
import { Checklist, type RenderChecklistItemFn } from "@components/Checklist";
import { AddChecklistItemButton } from "./AddChecklistItemButton";
import { ChecklistItemInput } from "./ChecklistItemInput";
import { CreateChecklistButton } from "./CreateChecklistButton";
import { RemoveChecklistButton } from "./RemoveChecklistButton";
import { checklistInputClassNames as classNames } from "./classNames";

// TODO Make an "editable version" of @comps/Checklist, renderItem pattern too slow here

/**
 * This component wraps the `Checklist` component with a null check; if the
 * checklist field value is not an array (would be null), this component renders
 * the `CreateChecklistButton` instead.
 */
export const ChecklistInput = () => {
  const [checklistField] = useField("checklist");

  // If checklist field value is null, show 'create checklist' btn, else show checklist comp

  return !Array.isArray(checklistField.value) ? (
    <CreateChecklistButton />
  ) : (
    <StyledChecklist
      checklistItems={checklistField.value}
      renderChecklistItem={renderWorkOrderChecklistItemInput}
      headerComponents={<RemoveChecklistButton />}
      footerComponents={<AddChecklistItemButton />}
    />
  );
};

const renderWorkOrderChecklistItemInput: RenderChecklistItemFn = ({ index, numItems }) => (
  <ChecklistItemInput
    key={`ChecklistItem:${index}`}
    checklistItemIndex={index}
    autoFocus={index === numItems - 1}
    enableDelete={numItems >= 2}
  />
);

const StyledChecklist = styled(Checklist)(({ theme }) => ({
  ...(theme.variables.isMobilePageLayout && {
    maxHeight: "40vh",
  }),

  [`& .${classNames.removeChecklistButton}`]: {
    marginLeft: "auto", // pushes the delete-btn right, and `ListIcon CHECKLIST` left
    transform: "translateX(4px)",
    color: theme.palette.primary.dark,
    "&:hover": {
      opacity: 0.6,
    },
  },
}));
