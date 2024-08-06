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
import { invFormViewElementIDs } from "./elementIDs.js";
import { InvoiceWorkOrderInput, InvoiceAmountInput } from "./inputs";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema.js";
import type { Invoice } from "@/types/graphql.js";

export type InvoiceFormProps = {
  initialFormValues: InvoiceFormValues;
  onSubmit: (submittedFormValues: InvoiceFormValues) => void | Promise<void>;
  existingInvoice?: Invoice; // <-- indicates UPDATE operation
};

export const InvoiceForm = ({ initialFormValues, onSubmit, existingInvoice }: InvoiceFormProps) => (
  <Form
    initialValues={initialFormValues}
    validationSchema={invoiceFormSchema}
    onSubmit={onSubmit}
    style={{ height: "100%", display: "flex", flexDirection: "column" }}
  >
    <StyledDiv id="invoice-form-content-div-wrapper">
      {/* INVOICE: assignedTo */}

      {!existingInvoice ? (
        <AutoCompleteMyContacts
          fieldID='assignedTo["id"]'
          label="To Recipient"
          gridArea="assign-to"
        />
      ) : (
        <ItemDetailsGroup
          label="To Recipient"
          labelIcon={<PersonIcon />}
          gridArea="assign-to"
          id={invFormViewElementIDs.invAssignedToIDG}
        >
          <ContactAvatar contact={existingInvoice.assignedTo} />
        </ItemDetailsGroup>
      )}

      {/* INVOICE: workOrder */}

      <InvoiceWorkOrderInput label="Work Order" gridArea="select-wo" />
      <FormInvoiceWorkOrderInfo gridArea="work-order" />

      {/* INVOICE: amount */}

      <InvoiceAmountInput fieldID="amount" gridArea="amount" />

      <FormControlButtons gridArea="form-btns" />
    </StyledDiv>
  </Form>
);

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  width: "100%",
  maxWidth: "max-content",

  ...(variables.isMobilePageLayout
    ? {
        minHeight: "min-content",
        alignSelf: "center",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }
    : {
        flexGrow: 0,
        height: "min-content",
        padding: "1rem 0",
        display: "grid",
        gap: "1rem 3rem",
        gridTemplateRows: "repeat( 4, min-content )",
        gridTemplateColumns: "repeat( 2, minmax(min-content,20rem))",
        gridTemplateAreas: `
          "assign-to  work-order"
          "select-wo  work-order"
          "amount     work-order"
          "form-btns  work-order"`,
      }),

  // IDGs: assignedTo + InvoiceWorkOrderInfo
  [`& > .${dataDisplayClassNames.groupRoot}`]: {
    // For even spacing, p-b is added to IDGs that's equal to the height of inputs' HelperText:
    paddingBottom: "22.906px",

    // INV assignedTo IDG
    [`&#${invFormViewElementIDs.invAssignedToIDG}`]: {
      [`& .${dataDisplayClassNames.groupContent}`]: {
        alignItems: "center",
        [`& .${avatarClassNames.displayName}`]: {
          // By default, Avatar displayName only has m-l, but that messes up the horizontal centering
          margin: "0 0.5rem",
        },
      },
    },
  },

  // FORM-CONTROL BUTTONS CONTAINER
  [`& .${formClassNames.controlButtonsContainer}`]: {
    justifyContent: "center",
    ...(variables.isMobilePageLayout ? { padding: "1rem 0 2rem 0" } : {}),
  },
}));
