import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { AutoComplete } from "@components/Form/AutoComplete";
import { WO_CATEGORY_ICON_REACT_NODES } from "@components/Icons/WorkOrderCategoryIcon";
import { prettifyStr } from "@utils/prettifyStr";
import { WORK_ORDER_CATEGORIES } from "@/types/WorkOrder";
import type { AutoCompleteProps, AutoCompleteOption } from "@components/Form/AutoComplete";

/**
 * AutoCompleteWorkOrderCategory
 */
export const AutoCompleteWorkOrderCategory = (props: AutoCompleteWorkOrderCategoryProps) => (
  <AutoComplete
    options={CATEGORY_OPTIONS}
    renderOption={(props, { label, icon }) => (
      <Box
        component="li"
        sx={{
          height: "2.5rem",
          "& .MuiSvgIcon-root": {
            marginRight: "0.75rem",
          },
        }}
        {...props}
      >
        {icon}
        <Text style={{ fontWeight: icon ? "normal" : "bold" }}>{label}</Text>
      </Box>
    )}
    {...props}
  />
);

const CATEGORY_OPTIONS: Array<AutoCompleteWorkOrderCategoryOption> = WORK_ORDER_CATEGORIES.map(
  (category) => ({
    id: category ?? "",
    label: category ? prettifyStr.capFirstLetterOnly(category) : "- None -",
    icon: category !== null ? WO_CATEGORY_ICON_REACT_NODES?.[category] : null,
  })
);

export type AutoCompleteWorkOrderCategoryProps = Omit<
  AutoCompleteProps<AutoCompleteWorkOrderCategoryOption>,
  "options" | "renderOption"
>;

export type AutoCompleteWorkOrderCategoryOption = AutoCompleteOption & {
  icon: React.ReactNode | null;
};
