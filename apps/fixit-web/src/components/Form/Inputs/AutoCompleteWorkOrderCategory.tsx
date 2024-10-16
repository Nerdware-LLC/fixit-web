import { WO_CATEGORY_ICONS_JSX } from "@/components/Icons/WorkOrderCategoryIcon.jsx";
import { WorkOrderCategoryListItem } from "@/components/List/listItems/WorkOrderCategoryListItem.jsx";
import { WORK_ORDER_CATEGORIES } from "@/types/WorkOrder.js";
import {
  AutoComplete,
  type AutoCompleteProps,
  type BaseAutoCompleteOption,
} from "./AutoComplete.jsx";
import type { WorkOrderCategory } from "@/types/graphql.js";
import type { OverrideProperties } from "type-fest";

/**
 * AutoCompleteWorkOrderCategory
 */
export const AutoCompleteWorkOrderCategory = ({
  renderOption,
  ...autoCompleteProps
}: AutoCompleteWorkOrderCategoryProps) => {
  // Assign default renderOption fn:
  renderOption ??= defaultRenderOption;

  return (
    <AutoComplete
      options={WORK_ORDER_CATEGORY_OPTIONS}
      renderOption={renderOption}
      {...autoCompleteProps}
    />
  );
};

const defaultRenderOption: NonNullable<AutoCompleteWorkOrderCategoryProps["renderOption"]> = (
  props,
  { label, icon }
) => <WorkOrderCategoryListItem category={label} icon={icon} {...props} />;

const WORK_ORDER_CATEGORY_OPTIONS: Array<AutoCompleteWorkOrderCategoryOption> =
  WORK_ORDER_CATEGORIES.map((category) => ({
    id: category,
    label: category,
    icon: WO_CATEGORY_ICONS_JSX[category],
  }));

export type AutoCompleteWorkOrderCategoryProps = Omit<
  AutoCompleteProps<AutoCompleteWorkOrderCategoryOption>,
  "options"
>;

export type AutoCompleteWorkOrderCategoryOption = OverrideProperties<
  BaseAutoCompleteOption,
  {
    id: WorkOrderCategory;
    label: WorkOrderCategory;
    icon: React.ReactNode;
  }
>;
