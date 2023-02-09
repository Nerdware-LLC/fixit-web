import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useField } from "formik";
import { ChecklistContainer } from "./ChecklistContainer";
import { ChecklistLabelBar } from "./ChecklistLabelBar";
import { ChecklistItem } from "./ChecklistItem";
import type { WorkOrderFormChecklistItem } from "../../formFieldHandlers";

export const ChecklistInput = ({
  isInitiallyExpanded = false
}: {
  isInitiallyExpanded?: boolean;
}) => {
  const [checklistField, , { setValue }] = useField("checklist");
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const [shouldAutoFocusLastItem, setShouldAutoFocusLastItem] = useState(false);
  const [nextIndex, setNextIndex] = useState<number>(checklistField.value?.length ?? 1);

  const handleClickContainer = () => {
    // Once opened, container does not close, ignore clicks
    if (isExpanded === false) {
      if (checklistField.value === null) addChecklistItem();
      setIsExpanded(true);
    }
  };

  const addChecklistItem = () => {
    const newFieldValue = [
      ...(checklistField.value ?? []),
      {
        id: null,
        description: null,
        isCompleted: false,
        [Symbol("localIndex")]: nextIndex
      }
    ];
    if (!shouldAutoFocusLastItem) setShouldAutoFocusLastItem(true);
    setValue(newFieldValue, false);
    setNextIndex(nextIndex + 1);
  };

  const removeChecklistItem = (itemLocalIndex: number) => {
    const filtered = checklistField.value.filter((existingItem: WorkOrderFormChecklistItem) => {
      return existingItem[Object.getOwnPropertySymbols(existingItem)[0]] !== itemLocalIndex;
    });

    const newFieldValue = filtered.length !== 0 ? filtered : null;
    setValue(newFieldValue, false);
  };

  const isRemoveItemBtnDisabled = (checklistField.value?.length ?? 0) < 2;

  return (
    <ChecklistContainer isExpanded={isExpanded} onClick={handleClickContainer}>
      <ChecklistLabelBar isExpanded={isExpanded} addChecklistItem={addChecklistItem} />
      {isExpanded && (
        <ScrollableListContainer showScrollbar={(checklistField.value?.length ?? 0) > 5}>
          {checklistField.value.map((item: WorkOrderFormChecklistItem, index: number) => {
            const localIndexSymbol = Object.getOwnPropertySymbols(item)[0];
            return (
              <ChecklistItem
                key={`ChecklistItem:${item[localIndexSymbol]}]`}
                formikFieldID={`checklist[${index}]`}
                autoFocus={shouldAutoFocusLastItem && index === checklistField.value.length - 1}
                enableDelete={!isRemoveItemBtnDisabled}
                handleClickDelete={() => removeChecklistItem(item[localIndexSymbol])}
              />
            );
          })}
        </ScrollableListContainer>
      )}
    </ChecklistContainer>
  );
};

const ScrollableListContainer = styled("div")<{ showScrollbar: boolean }>(
  ({ theme, showScrollbar }) => ({
    height: "100%",
    width: "100%",
    padding: "5px 0 0 1rem",
    display: "flex",
    flexDirection: "column",
    flex: "0 1 auto",
    justifyContent: "flex-start",
    overflowY: "scroll",
    borderWidth: "1px 0 0 0",
    borderStyle: "solid",
    borderColor: showScrollbar ? theme.palette.divider : "transparent",
    "&::-webkit-scrollbar": {
      width: "calc(1rem + 6px)"
    },
    "&::-webkit-scrollbar-track": {
      ...(showScrollbar
        ? {
            backgroundColor: theme.palette.divider,
            boxShadow: `inset 0 0 0.1rem 0.5rem ${theme.palette.divider}`
          }
        : {
            backgroundColor: "transparent",
            boxShadow: "inset 0 0 0.1rem 0.1rem transparent"
          }),
      // emulated margin:
      borderStyle: "solid",
      borderColor: theme.palette.background.paper,
      borderWidth: "0 0 0 6px"
    },
    "&::-webkit-scrollbar-thumb": {
      width: "0.5rem",
      backgroundColor: "transparent",
      boxShadow: `inset 0 0 0.1rem 0.5rem #272727`,
      // emulated margin:
      borderStyle: "solid",
      borderColor: "transparent",
      borderWidth: "0 calc(0.5rem - 7px) 0 calc(0.5rem - 1px)"
    }
  })
);
