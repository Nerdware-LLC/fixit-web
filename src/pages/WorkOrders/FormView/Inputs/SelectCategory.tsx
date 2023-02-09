import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { Autocomplete, WO_CATEGORY_ICON_REACT_NODES, type AutocompleteOption } from "@components";
import { CONSTANTS } from "@types";
import { prettifyStr } from "@utils";

/**
 * WorkOrder: SelectCategory
 * - Uses MUI Autocomplete input
 */
export const SelectCategory = (
  props: Omit<React.ComponentProps<typeof Autocomplete>, "options">
) => (
  <Autocomplete
    options={CATEGORY_OPTIONS}
    renderOption={(props, option) => {
      const { label, icon } = option as SelectWorkOrderCategoryOption;

      return (
        <Box component="li" style={{ height: "2.5rem" }} {...props}>
          {!!icon && icon}
          <Text style={icon ? { marginLeft: "0.75rem" } : { fontWeight: "bold" }}>{label}</Text>
        </Box>
      );
    }}
    {...props}
  />
);

const CATEGORY_OPTIONS = CONSTANTS.WORK_ORDER.CATEGORIES.map((category) => ({
  id: category ?? "",
  label: category ? prettifyStr.capFirstLetterOnly(category) : "- None -",
  icon: category !== null ? WO_CATEGORY_ICON_REACT_NODES?.[category] : null
}));

type SelectWorkOrderCategoryOption = AutocompleteOption & { icon: React.ReactNode | null };
