import { useField } from "formik";
import { styled } from "@mui/material/styles";
import { Checklist, type ChecklistProps } from "@/components/Checklist";
import { AddChecklistItemButton } from "./AddChecklistItemButton";
import { ChecklistItemInput } from "./ChecklistItemInput";
import { CreateChecklistButton } from "./CreateChecklistButton";
import { RemoveChecklistButton } from "./RemoveChecklistButton";
import { checklistInputClassNames } from "./classNames";
import type { BaseChecklistItemType, RenderChecklistItemFn } from "@/components/Checklist/types";
import type { Simplify } from "type-fest";
import type { ChecklistInputFormProps } from "./types";

/**
 * This input facilitates the creation, modification, and/or removal of checklist values within a
 * Formik form.
 *
 * If the checklist field value is null (or some other non-array value), this component renders a
 * {@link CreateChecklistButton} which, when clicked, will create a new empty checklist array.
 *
 * > Note: Unlike the base `Checlist` component this is based on, this component and its related
 *   input components are _**not generic**_ due to the fact that the item type is pre-determined.
 */
export const ChecklistInput = ({
  checklistFieldID = "checklist",
  ...checklistProps
}: ChecklistInputProps) => {
  const [{ value: checklistFieldValue }] = useField<BaseChecklistItemType>(checklistFieldID);

  // If checklist field value is null, show 'create checklist' btn, else show checklist comp

  return !Array.isArray(checklistFieldValue) ? (
    <CreateChecklistButton checklistFieldID={checklistFieldID} />
  ) : (
    <StyledChecklist
      checklistItems={checklistFieldValue}
      renderChecklistItem={renderChecklistItemInput}
      headerComponents={<RemoveChecklistButton checklistFieldID={checklistFieldID} />}
      footerComponents={<AddChecklistItemButton checklistFieldID={checklistFieldID} />}
      itemProps={{ checklistFieldID }}
      {...checklistProps}
    />
  );
};

const renderChecklistItemInput: RenderChecklistItemFn<
  BaseChecklistItemType,
  ChecklistInputFormProps
> = ({ index, numItems, itemProps }) => (
  <ChecklistItemInput
    key={`ChecklistItemInput:${index}`}
    checklistFieldID={itemProps.checklistFieldID}
    checklistItemIndex={index}
    autoFocus={index === numItems - 1}
    enableDelete={numItems >= 2}
  />
);

const StyledChecklist = styled(Checklist)(({ theme: { palette } }) => ({
  [`& .${checklistInputClassNames.removeChecklistButton}`]: {
    marginLeft: "auto", // pushes the delete-btn right, and `ListIcon CHECKLIST` left
    transform: "translateX(4px)",
    color: palette.primary.dark,
    "&:hover": {
      opacity: 0.6,
    },
  },
})) as typeof Checklist; // <-- Necessary to ensure generic props are passed through

export type ChecklistInputProps = Simplify<
  ChecklistInputFormProps &
    Omit<
      ChecklistProps<BaseChecklistItemType>,
      | "checklistItems"
      | "renderChecklistItem"
      | "headerTitle"
      | "headerComponents"
      | "footerComponents"
      | "itemProps"
    >
>;
