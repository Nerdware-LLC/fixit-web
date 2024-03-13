import { useField } from "formik";
import { dialogContentClasses } from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Text from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Dialog } from "@/components/Dialog";
import { getTypeSafeError } from "@/utils/typeSafety/getTypeSafeError";
import { checklistInputClassNames } from "./classNames";
import type { BaseChecklistType } from "@/components/Checklist/types";
import type { ChecklistInputFormProps } from "./types";

export const RemoveChecklistButton = ({ checklistFieldID }: ChecklistInputFormProps) => {
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  const [{ value: checklist }, { initialValue }, { setValue, setTouched, setError }] =
    useField<BaseChecklistType | null>(checklistFieldID);

  const resetChecklist = async () => {
    try {
      await setValue(null, false);
      await setTouched(false);
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  // onClick, open confirmation dialog if checklist has at least 1 item with a description
  const handleClickRemove = async () => {
    if (Array.isArray(checklist) && (checklist[0]?.description?.length ?? 0) > 0) openDialog();
    else await resetChecklist();
  };

  return (
    <>
      <Tooltip title="Remove checklist">
        <IconButton
          onClick={handleClickRemove}
          aria-label="remove checklist"
          className={checklistInputClassNames.removeChecklistButton}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {isDialogVisible && (
        <Dialog
          isVisible={isDialogVisible}
          title="Confirm Checklist Removal"
          handleAccept={resetChecklist}
          handleCancel={closeDialog}
          sx={{
            [`& .${dialogContentClasses.root}`]: {
              "& em": {
                fontWeight: "bold",
                fontStyle: "normal",
              },
            },
          }}
        >
          {initialValue === null ? (
            <Text>
              Removing a checklist will <em>permanently</em> delete all checklist items -{" "}
              <em>this cannot be undone.</em>
            </Text>
          ) : (
            <Text>Removing this checklist will delete all checklist items.</Text>
          )}
        </Dialog>
      )}
    </>
  );
};
