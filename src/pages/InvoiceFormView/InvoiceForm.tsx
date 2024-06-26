import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { ContactAvatar, avatarClassNames } from "@/components/Avatar";
import { ItemDetailsGroup, dataDisplayClassNames } from "@/components/DataDisplay";
import {
  Form,
  FormControlButtons,
  AutoCompleteMyContacts,
  formClassNames,
} from "@/components/Form";
import { FormInvoiceWorkOrderInfo } from "./FormInvoiceWorkOrderInfo.jsx";
import { InvoiceWorkOrderInput, InvoiceAmountInput } from "./inputs";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema.js";
import type { Invoice } from "@/types/graphql.js";

export const InvoiceForm = ({ initialFormValues, onSubmit, existingInvoice }: InvoiceFormProps) => (
  <Form
    initialValues={initialFormValues}
    validationSchema={invoiceFormSchema}
    onSubmit={onSubmit}
    style={{ height: "100%" }}
  >
    <StyledDiv>
      {/* INVOICE: assignedTo */}

      {!existingInvoice ? (
        <AutoCompleteMyContacts
          id='assignedTo["id"]'
          label="To"
          gridArea="assign-to"
          disabled={!!existingInvoice}
          getFieldValueFromOption={(option) => option?.id || ""}
          // The above opt-chain ||'s to an empty string, bc value is non-nullable
        />
      ) : (
        <ItemDetailsGroup label="To" labelIcon={<PersonIcon />} gridArea="assign-to">
          <ContactAvatar contact={existingInvoice.assignedTo} />
        </ItemDetailsGroup>
      )}

      {/* INVOICE: workOrder */}

      <InvoiceWorkOrderInput id="workOrder" label="Work Order" gridArea="select-wo" />
      <FormInvoiceWorkOrderInfo gridArea="work-order" />

      {/* INVOICE: amount */}

      <InvoiceAmountInput id="amount" gridArea="amount" />

      <FormControlButtons gridArea="form-btns" />
    </StyledDiv>
  </Form>
);

const StyledDiv = styled("div")(({ theme }) => ({
  width: "auto",
  alignSelf: "center",
  display: "grid",
  ...(theme.variables.isMobilePageLayout
    ? {
        height: "100%",
        padding: "0.5rem 0",
        gap: "0", // m-b is used instead
        gridTemplateRows: "repeat(4,min-content) 1fr",
        gridTemplateColumns: "1fr",
        gridTemplateAreas: `
          "assign-to"
          "select-wo"
          "work-order"
          "amount"
          "form-btns"`,
      }
    : {
        padding: "1rem 0",
        gap: "2rem 6rem",
        gridTemplateRows: "repeat(3,min-content) 1fr",
        gridTemplateColumns: "minmax(20rem,1fr) minmax(0,2fr)",
        gridTemplateAreas: `
          "assign-to  work-order"
          "select-wo  work-order"
          "amount     work-order"
          "form-btns  work-order"`,
      }),

  [`& > div:not(.${dataDisplayClassNames.invoiceWorkOrderDetailsRoot}):not(.${formClassNames.controlButtonsContainer})`]:
    {
      ...(theme.variables.isMobilePageLayout && {
        marginBottom: "1rem",
      }),
    },

  // INVOICE: assignedTo IDG (only visible during UPDATE, not CREATE)
  [`& .${dataDisplayClassNames.groupContent} .${avatarClassNames.muiAvatar.root}`]: {
    marginRight: "0.25rem",
  },

  // FORM-CONTROL BUTTONS CONTAINER

  [`& .${formClassNames.controlButtonsContainer}`]: {
    alignSelf: "end",
  },
}));

export type InvoiceFormProps = {
  initialFormValues: InvoiceFormValues;
  onSubmit: (submittedFormValues: InvoiceFormValues) => void | Promise<void>;
  existingInvoice?: Invoice; // <-- indicates UPDATE operation
};
