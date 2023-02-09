import Button from "@mui/material/Button";
import Text from "@mui/material/Typography";
import PlusIcon from "@mui/icons-material/Add";
import { useField, useFormikContext } from "formik";
import type { WorkOrderFormChecklistItem } from "../../formFieldHandlers";

export const AddChecklistItemButton = ({ addChecklistItem }: { addChecklistItem: Function }) => {
  const [field, meta] = useField("checklist");
  const { setFieldTouched, setFieldError } = useFormikContext();

  const addChecklistItemIfValid = () => {
    const badFieldIndex = field.value.findIndex(
      (item: WorkOrderFormChecklistItem) => item.description === null
    );

    if (badFieldIndex !== -1) {
      setFieldTouched(`checklist[${badFieldIndex}]`, true, false);
      setFieldError("checklist", "Description required");
      setFieldError(`checklist[${badFieldIndex}]`, "Description required");
    } else {
      addChecklistItem();
    }
  };

  const textColor = meta.error ? "disabled" : "primary";

  return (
    <Button
      onClick={addChecklistItemIfValid}
      startIcon={<PlusIcon color={textColor} />}
      disabled={!!meta.error}
    >
      <Text style={{ marginTop: "2px" }}>LIST ITEM</Text>
    </Button>
  );
};
