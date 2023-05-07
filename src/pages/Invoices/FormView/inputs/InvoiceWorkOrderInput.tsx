import { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { useField } from "formik";
import Text from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Dialog } from "@components/Dialog";
import {
  AutoCompleteWorkOrder,
  type AutoCompleteWorkOrderProps,
} from "@components/Form/AutoCompleteWorkOrder";
import { QUERIES } from "@graphql/queries";
import type { Invoice, WorkOrder } from "@graphql/types";

/**
 * InvoiceWorkOrderInput is used to select a WorkOrder from a User's list of
 * existing WorkOrders. The value and enabled/disabled status of this input are
 * determined as follows:
 *
 * - _When CREATING a new invoice..._
 *
 *   - By default, all of the WorkOrders that have been ASSIGNED TO the User are
 *     made available for selection.
 *   - If User sets an `assignedTo` InvoiceForm value, then the list of WorkOrders
 *     is filtered to only include those CREATED BY the `assignedTo` User.
 *   - In `InvoiceAssignedToInput`, if User changes the `assignedTo` InvoiceForm
 *     value, and if the `assignedTo` User does not match the currently selected
 *     WorkOrder's `createdBy` User, then a confirmation dialog is triggered. If
 *     confirmed, the WorkOrder is cleared.
 *
 * - _When UPDATING an existing invoice..._
 *
 *   - The ASSIGNED TO User is fixed.
 *   - If the existing Invoice status is CLOSED, this input is disabled; otherwise,
 *     the list of WorkOrders is filtered using the existing `assignedTo` User.
 */
export const InvoiceWorkOrderInput = ({
  id,
  label,
  existingInvoice,
  ...props
}: InvoiceWorkOrderInputProps) => {
  const { data, loading } = useQuery(QUERIES.MY_WORK_ORDERS, {
    fetchPolicy: "cache-only",
  });
  const [{ value: invoiceAssignedTo }, , { setValue: setAssignedTo }] = useField("assignedTo");
  const [, , { setValue: setWorkOrder }] = useField("workOrder");
  const [selectedWorkOrderCreatedBy, setSelectedWorkOrderCreatedBy] = useState<string | null>(null);
  const previousAssignedToValueRef = useRef<string | null>(invoiceAssignedTo);
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  useEffect(() => {
    if (
      !!invoiceAssignedTo &&
      !!selectedWorkOrderCreatedBy &&
      invoiceAssignedTo !== selectedWorkOrderCreatedBy
    ) {
      openDialog();
    } else {
      previousAssignedToValueRef.current = invoiceAssignedTo;
    }
  }, [invoiceAssignedTo, selectedWorkOrderCreatedBy, openDialog]);

  const woOptions: AutoCompleteWorkOrderProps["options"] = [];

  if (!loading && data?.myWorkOrders?.assignedToUser) {
    woOptions.concat(
      data.myWorkOrders.assignedToUser.reduce(
        !invoiceAssignedTo
          ? (acc, wo) => [...acc, { ...wo, _renderUser: wo.createdBy }]
          : (acc, wo) =>
              // If there's an assignedTo value, place their WOs at the top
              invoiceAssignedTo === wo.createdBy.id
                ? [{ ...wo, _renderUser: wo.createdBy }, ...acc]
                : [...acc, { ...wo, _renderUser: wo.createdBy }],
        [] as Array<any>
      )
    );
  }

  const doAfterSetSelectedOption = (selectedWO: WorkOrder | null) => {
    const woCreatedByID = selectedWO?.createdBy?.id;
    setSelectedWorkOrderCreatedBy(woCreatedByID ?? null);
    if (!!woCreatedByID && !invoiceAssignedTo) {
      setAssignedTo(woCreatedByID);
    }
  };

  const handleAcceptDialog = () => {
    setWorkOrder(null);
    setSelectedWorkOrderCreatedBy(null);
    closeDialog();
  };

  const handleCancelDialog = () => {
    setAssignedTo(previousAssignedToValueRef.current);
    closeDialog();
  };

  return (
    <>
      <AutoCompleteWorkOrder
        id={id}
        label={label}
        options={woOptions}
        getOptionDisabled={(option) =>
          !!invoiceAssignedTo && (option as WorkOrder).createdBy.id !== invoiceAssignedTo
        }
        disabled={!!existingInvoice && existingInvoice.status === "CLOSED"}
        doAfterSetSelectedOption={doAfterSetSelectedOption}
        {...props}
      />
      {isDialogVisible && (
        <Dialog
          isVisible={isDialogVisible}
          title="Remove attached work order?"
          message={
            <div style={{ display: "flex" }}>
              <AnnouncementIcon style={{ marginRight: "0.5rem" }} />
              <Text>
                The selected recipient did not create the attached work order. <br /> Do you want to
                remove the work order?
              </Text>
            </div>
          }
          acceptLabel="Remove"
          handleAccept={handleAcceptDialog}
          handleCancel={handleCancelDialog}
        />
      )}
    </>
  );
};

export type InvoiceWorkOrderInputProps = Omit<AutoCompleteWorkOrderProps, "options"> & {
  existingInvoice?: Invoice; // <-- indicates UPDATE operation
};
