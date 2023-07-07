import { useField } from "formik";
import { dialogContentClasses } from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Text from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Dialog } from "@components/Dialog";
import { checklistInputClassNames as classNames } from "./classNames";

export const RemoveChecklistButton = () => {
  const [{ value: checklist }, { initialValue }, { setValue, setTouched }] = useField("checklist");
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  const resetChecklist = () => {
    setValue(null, false);
    setTouched(false);
  };

  // onClick, open confirmation dialog if checklist has at least 1 item with a description
  const handleClickRemove = () => {
    if ((checklist[0]?.description?.length ?? 0) > 0) openDialog();
    else resetChecklist();
  };

  return (
    <>
      <Tooltip
        title="Remove checklist"
        arrow
        PopperProps={{
          sx: {
            [`& > .${tooltipClasses.tooltip}`]: {
              backgroundColor: "rgb(97,97,97)", // rm's the usual 0.92 alpha from tooltip bg
              paddingBottom: "1px", // better spacing and text alignment
            },
          },
        }}
      >
        <IconButton
          onClick={handleClickRemove}
          aria-label="remove checklist"
          className={classNames.removeChecklistButton}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {isDialogVisible && (
        <Dialog
          isVisible={isDialogVisible}
          title="Confirm Checklist Removal"
          handleAccept={resetChecklist as React.MouseEventHandler<HTMLButtonElement>}
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
