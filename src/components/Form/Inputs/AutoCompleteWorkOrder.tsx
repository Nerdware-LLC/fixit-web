import dayjs from "dayjs";
import { AutoComplete, type AutoCompleteProps } from "@/components/Form/Inputs";
import {
  WorkOrderListItem,
  type WorkOrderListItemProps,
} from "@/components/List/listItems/WorkOrderListItem.jsx";

export type AutoCompleteWorkOrderProps = AutoCompleteProps<AutoCompleteWorkOrderOption>;

/**
 * AutoCompleteWorkOrderOption is a `WorkOrder` with additional internal property
 * `userToDisplay`, which the {@link WorkOrderListItem|`WorkOrderListItem`} component
 * in the {@link defaultRenderOption|`defaultRenderOption` fn} uses to determine which
 * of the WorkOrder's associated users to display (i.e. `createdBy` or `assignedTo`).
 */
export type AutoCompleteWorkOrderOption = WorkOrderListItemProps["workOrder"] &
  Pick<WorkOrderListItemProps, "userToDisplay">;

export type AutoCompleteWorkOrderOptions = Array<AutoCompleteWorkOrderOption>;

/**
 * `AutoCompleteWorkOrder` is a Mui Autocomplete input used to select a WorkOrder
 * from the provided list of WorkOrder `options`.
 *
 * @note This component uses a `multiline` Input, which with Mui's Autocomplete
 * currently causes the following console warning in non-prod envs: `A textarea
 * element was provided to Autocomplete where input was expected.`. This warning
 * currently only appears in dev, so is being ignored for now.
 */
export const AutoCompleteWorkOrder = ({
  renderOption,
  getOptionLabel,
  InputProps = {},
  ...autoCompleteProps
}: AutoCompleteWorkOrderProps) => {
  // Assign default fns:
  renderOption ??= defaultRenderOption;
  getOptionLabel ??= defaultGetOptionLabel;

  return (
    <AutoComplete
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      InputProps={{
        multiline: true, // to show WO info on multiple lines in the TextField
        ...InputProps,
      }}
      {...autoCompleteProps}
    />
  );
};

/**
 * Default `renderOption` fn for {@link AutoCompleteWorkOrder}.
 */
const defaultRenderOption: AutoCompleteWorkOrderProps["renderOption"] = (
  { key, ...listItemProps },
  { userToDisplay, ...workOrder } // option
  // other available props: state, ownerState
) => (
  <WorkOrderListItem
    key={key}
    workOrder={workOrder}
    userToDisplay={userToDisplay}
    {...listItemProps}
  />
);

/**
 * Default `getOptionLabel` fn for {@link AutoCompleteWorkOrder}.
 */
const defaultGetOptionLabel: AutoCompleteWorkOrderProps["getOptionLabel"] = ({
  userToDisplay,
  location: { streetLine1 } = {},
  createdAt,
}) => {
  let optionLabel = userToDisplay?.profile.displayName ?? "";

  if (streetLine1) optionLabel += `\n${streetLine1}`;
  if (createdAt as Date | undefined) optionLabel += `\n${dayjs(createdAt).format("M/D/YY h:mm a")}`;

  return optionLabel;
};
