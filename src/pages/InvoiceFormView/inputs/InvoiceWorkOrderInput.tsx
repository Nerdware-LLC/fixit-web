import { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { getErrorMessage } from "@nerdware/ts-type-safety-utils";
import { useField } from "formik";
import Text from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Dialog, type DialogProps } from "@/components/Dialog";
import {
  AutoCompleteWorkOrder,
  type AutoCompleteWorkOrderProps,
  type AutoCompleteWorkOrderOptions,
} from "@/components/Form/Inputs/AutoCompleteWorkOrder.jsx";
import { QUERIES } from "@/graphql/queries.js";
import { InvoiceFormValues } from "../schema.js";
import type { AutoCompleteOnChangeFn } from "@/components/Form/Inputs/AutoComplete.jsx";
import type { Invoice, WorkOrder } from "@/types/graphql.js";
import type { Simplify } from "type-fest";

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
  id = "workOrder",
  label,
  existingInvoice,
  ...props
}: InvoiceWorkOrderInputProps) => {
  const { data, loading } = useQuery(QUERIES.MY_WORK_ORDERS, { fetchPolicy: "cache-only" });

  const [{ value: invoiceAssignedTo }, , { setValue: setAssignedTo }] =
    useField<InvoiceFormValues["assignedTo"]>("assignedTo");

  const invoiceAssignedToUserID = invoiceAssignedTo.id;

  const [, , { setValue: setWorkOrder, setError }] = useField(id);
  const [selectedWorkOrderCreatedBy, setSelectedWorkOrderCreatedBy] = useState<string | null>(null);
  const previousAssignedToUserIdValueRef = useRef<string>(invoiceAssignedToUserID);
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  useEffect(() => {
    if (
      !!invoiceAssignedToUserID &&
      !!selectedWorkOrderCreatedBy &&
      invoiceAssignedToUserID !== selectedWorkOrderCreatedBy
    ) {
      openDialog();
    } else {
      previousAssignedToUserIdValueRef.current = invoiceAssignedToUserID;
    }
  }, [invoiceAssignedToUserID, selectedWorkOrderCreatedBy, openDialog]);

  const woOptions: AutoCompleteWorkOrderOptions =
    loading || !data?.myWorkOrders.assignedToUser
      ? []
      : data.myWorkOrders.assignedToUser.reduce(
          (acc: AutoCompleteWorkOrderOptions, wo) =>
            // If there's an assignedTo value, place their WOs at the top
            invoiceAssignedToUserID === wo.createdBy.id
              ? [{ ...wo, userToDisplay: wo.createdBy }, ...acc]
              : [...acc, { ...wo, userToDisplay: wo.createdBy }],
          []
        );

  const handleError = (error: unknown) => setError(getErrorMessage(error));

  // The AutoComplete runs this after running internal Form-related `onChange` logic:
  const acOnChange: AutoCompleteOnChangeFn<WorkOrder> = async (_event, selectedWorkOrder) => {
    const woCreatedByID = selectedWorkOrder?.createdBy.id;
    setSelectedWorkOrderCreatedBy(woCreatedByID ?? null);
    if (!!woCreatedByID && !invoiceAssignedToUserID) {
      await setAssignedTo({ id: woCreatedByID }).catch(handleError);
    }
  };

  // Dialog fns:

  const handleAcceptDialog: DialogProps["handleAccept"] = async () => {
    await setWorkOrder(null).catch(handleError);
    setSelectedWorkOrderCreatedBy(null);
    closeDialog();
  };

  const handleCancelDialog: DialogProps["handleCancel"] = async () => {
    await setAssignedTo({ id: previousAssignedToUserIdValueRef.current }).catch(handleError);
    closeDialog();
  };

  return (
    <>
      <AutoCompleteWorkOrder
        id={id}
        label={label}
        options={woOptions}
        getOptionDisabled={(option) =>
          !!invoiceAssignedToUserID && option.createdBy.id !== invoiceAssignedToUserID
        }
        disabled={!!existingInvoice && existingInvoice.status === "CLOSED"}
        onChange={acOnChange}
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

export type InvoiceWorkOrderInputProps = Simplify<
  Omit<AutoCompleteWorkOrderProps, "options"> & {
    id: "workOrder";
    existingInvoice?: Invoice; // <-- indicates UPDATE operation
  }
>;
