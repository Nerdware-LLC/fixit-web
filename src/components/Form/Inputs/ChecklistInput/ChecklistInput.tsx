import { useField } from "formik";
import { styled } from "@mui/material/styles";
import { Checklist, type ChecklistProps } from "@/components/Checklist";
import { AddChecklistItemButton } from "./AddChecklistItemButton.jsx";
import { ChecklistItemInput } from "./ChecklistItemInput";
import { CreateChecklistButton } from "./CreateChecklistButton.jsx";
import { RemoveChecklistButton } from "./RemoveChecklistButton.jsx";
import { checklistInputClassNames } from "./classNames.js";
import type { BaseChecklistItemType, RenderChecklistItemFn } from "@/components/Checklist/types.js";
import type { FormikFieldIdProp } from "@/components/Form/helpers/useFormikFieldProps.js";
import type { Simplify } from "type-fest";

export type ChecklistInputProps = Simplify<
  FormikFieldIdProp &
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
  fieldID = "checklist",
  ...checklistProps
}: ChecklistInputProps) => {
  const [{ value: checklistFieldValue }] = useField<BaseChecklistItemType>(fieldID);

  // If checklist field value is null, show 'create checklist' btn, else show checklist comp

  return !Array.isArray(checklistFieldValue) ? (
    <CreateChecklistButton fieldID={fieldID} />
  ) : (
    <StyledChecklist
      checklistItems={checklistFieldValue}
      renderChecklistItem={renderChecklistItemInput}
      headerComponents={<RemoveChecklistButton fieldID={fieldID} />}
      footerComponents={<AddChecklistItemButton fieldID={fieldID} />}
      itemProps={{ fieldID }}
      {...checklistProps}
    />
  );
};

const renderChecklistItemInput: RenderChecklistItemFn<BaseChecklistItemType, FormikFieldIdProp> = ({
  index,
  numItems,
  itemProps,
}) => (
  <ChecklistItemInput
    key={`ChecklistItemInput:${index}`}
    fieldID={itemProps.fieldID}
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
