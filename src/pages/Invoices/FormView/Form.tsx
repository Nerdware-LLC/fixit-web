import Text from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import {
  Form,
  CurrencyInput,
  AutocompleteContact,
  ContactAvatar,
  Link,
  FileInvoiceDollarIcon,
  ItemDetailsBox
} from "@components";
import { schema } from "./schema";
import { InfoHowToAttachWO } from "./InfoHowToAttachWO";
import type { Invoice } from "@types";
import type { InvoiceFormValues } from "./formFieldHandlers";

export const InvoiceForm = ({
  initialFormValues,
  onSubmit,
  existingInvoice
}: {
  initialFormValues: InvoiceFormValues;
  onSubmit: (submittedFormValues: InvoiceFormValues) => Promise<void>;
  existingInvoice?: Invoice; // <-- indicates UPDATE operation
}) => (
  <Form initialValues={initialFormValues} validationSchema={schema} onSubmit={onSubmit}>
    <div
      style={{
        width: "clamp(30rem, 40%, 50rem)",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* INVOICE: assignedTo */}

      <div style={{ marginBottom: "2rem" }}>
        {!existingInvoice ? (
          <AutocompleteContact id="assignedTo" label="Assign to Contact" />
        ) : (
          <ItemDetailsBox label="Recipient" icon={<PersonIcon />}>
            <ContactAvatar contact={existingInvoice.assignedTo} style={{ marginRight: "1rem" }} />
          </ItemDetailsBox>
        )}
      </div>

      {/* INVOICE: workOrder */}

      <ItemDetailsBox
        label="Work Order"
        icon={<FileInvoiceDollarIcon />}
        sx={{
          // styles applied to "item-details-box-container"
          marginBottom: "2rem",
          "& > div.item-details-box-content-container": {
            flexDirection: "column"
          }
        }}
      >
        {initialFormValues.workOrder ? (
          <Link
            to={`/home/workorders/${initialFormValues.workOrder}`}
            state={{ isItemOwnedByUser: false }}
            // NOTE re above: WO ownership will always be the inverse of INV ownership
          >
            View Work Order
          </Link>
        ) : (
          <>
            <Text style={{ marginBottom: "1rem" }}>- None -</Text>
            <InfoHowToAttachWO />
          </>
        )}
      </ItemDetailsBox>

      {/* INVOICE: amount */}

      <CurrencyInput
        id="amount"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Text style={{ fontSize: "3.5rem" }}>$</Text>
            </InputAdornment>
          ),
          style: { fontSize: "3rem", paddingTop: "1rem", height: "8rem" }
        }}
        // TODO See if the below style-related props can't be combined into 1 `sx` here.
        InputLabelProps={{ style: { fontSize: "1.5rem" } }}
        FormHelperTextProps={{ style: { whiteSpace: "nowrap", alignSelf: "center" } }}
        // above HelperText style looks better w long err msg
        style={{ marginBottom: "1rem" }}
      />
      <Form.SubmitButton />
    </div>
  </Form>
);
