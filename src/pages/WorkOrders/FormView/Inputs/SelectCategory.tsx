import { Select } from "@components";
import { CONSTANTS } from "@types";
import { prettifyStr } from "@utils";

/**
 * WorkOrder: SelectCategory
 *
 * // TODO Make this into an autocomplete
 */
export const SelectCategory = (props: Omit<React.ComponentProps<typeof Select>, "options">) => (
  <Select options={CATEGORY_OPTIONS} {...props} />
);

const CATEGORY_OPTIONS = CONSTANTS.WORK_ORDER.CATEGORIES.map((category) => ({
  value: category ?? "",
  label: category ? prettifyStr.capFirstLetterOnly(category) : "- None -"
}));
