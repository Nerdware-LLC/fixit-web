import { useQuery } from "@apollo/client/react/hooks";
import { Select, type SelectOptions } from "@components";
import { QUERIES } from "@graphql/queries";
import type { WorkOrder, Contact } from "@types";

/**
 * WorkOrder: SelectAssignee
 */
export const SelectAssignee = ({
  currentWorkOrderStatus,
  ...props
}: {
  currentWorkOrderStatus: WorkOrder["status"];
} & Omit<React.ComponentProps<typeof Select>, "options">) => {
  const { data, loading } = useQuery(QUERIES.MY_CONTACTS, {
    fetchPolicy: "cache-only",
    skip: true // FIXME
  });

  const woAssigneeOptions: SelectOptions = [{ value: null, label: "Unassigned" }];

  if (!loading && data && Array.isArray(data?.myContacts) && data.myContacts.length > 0) {
    woAssigneeOptions.concat(
      (data.myContacts as Array<Contact>).reduce((accum, { id, profile }) => {
        return [...accum, { value: id, label: profile.displayName }];
      }, [] as SelectOptions)
    );
  }

  /* SelectContractor enabled/disabled based on WO status:

    Enabled:  UNASSIGNED, ASSIGNED
    Disabled: IN_PROGRESS, DEFERRED, COMPLETE
  */
  const isEnabled = ENABLE_SELECT_CONTRACTOR_STATUSES?.[currentWorkOrderStatus] ?? true;

  return (
    <Select
      options={woAssigneeOptions}
      disabled={!isEnabled}
      placeholder="Assign to Contact (UNASSIGNED)"
      renderValue={(selectedValue: unknown) => {
        return selectedValue === "" ? <em>Unassigned</em> : (selectedValue as React.ReactNode);
      }}
      {...props}
    />
  );
};

const ENABLE_SELECT_CONTRACTOR_STATUSES = {
  UNASSIGNED: true,
  ASSIGNED: true,
  IN_PROGRESS: false,
  DEFERRED: false,
  COMPLETE: false
};
