import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { avatarClassNames } from "@components/Avatar";
import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { itemDetailsClassNames } from "@components/DataDisplay";
import { ItemDetailsGroup } from "@components/DataDisplay/ItemDetailsGroup";
import { Form, formClassNames } from "@components/Form";
import { AutoCompleteContact } from "@components/Form/AutoCompleteContact";
import { FormInvoiceWorkOrderInfo, invWorkOrderInfoClassNames } from "./FormInvoiceWorkOrderInfo";
import { InvoiceWorkOrderInput, InvoiceAmountInput } from "./inputs";
import { schema } from "./schema";
import type { Invoice } from "@graphql/types";
import type { InvoiceFormValues } from "./formFieldHandlers";

export const InvoiceForm = ({
  initialFormValues,
  onSubmit,
  existingInvoice,
}: {
  initialFormValues: InvoiceFormValues;
  onSubmit: (submittedFormValues: InvoiceFormValues) => Promise<void>;
  existingInvoice?: Invoice; // <-- indicates UPDATE operation
}) => (
  <Form
    initialValues={initialFormValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    style={{ height: "100%" }}
  >
    <StyledDiv>
      {/* INVOICE: assignedTo */}

      {!existingInvoice ? (
        // TODO Have AutoCompleteContact should show Avatar after selection
        <AutoCompleteContact
          id="assignedTo"
          label="To"
          gridArea="assign-to"
          isValueNullable={false}
          disabled={!!existingInvoice}
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

      <Form.ControlButtons gridArea="form-btns" />
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

  [`& > div:not(.${invWorkOrderInfoClassNames.root}):not(.${formClassNames.controlButtonsContainer})`]:
    {
      ...(theme.variables.isMobilePageLayout && {
        marginBottom: "1rem",
      }),
    },

  // INVOICE: assignedTo IDG (only visible during UPDATE, not CREATE)
  [`& .${itemDetailsClassNames.groupContent} .${avatarClassNames.muiAvatar.root}`]: {
    marginRight: "0.25rem",
  },

  // FORM-CONTROL BUTTONS CONTAINER

  [`& .${formClassNames.controlButtonsContainer}`]: {
    alignSelf: "end",
  },
}));
