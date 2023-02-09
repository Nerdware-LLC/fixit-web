import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Text from "@mui/material/Typography";
import PayIcon from "@mui/icons-material/Paid";
import { useMutation } from "@apollo/client/react/hooks";
import { MUTATIONS } from "@graphql";
import { Dialog, ContactAvatar } from "@components";
import { prettifyStr } from "@utils";
import type { Invoice } from "@types";

export const PayInvoiceButton = ({
  invoice,
  ...props
}: {
  invoice: Invoice;
} & Partial<React.ComponentProps<typeof Button>>) => {
  const [payInvoice] = useMutation(MUTATIONS.PAY_INVOICE);
  const { isDialogVisible, openDialog, closeDialog } = Dialog.useDialog();

  const handlePayInvoice = async () => {
    return await payInvoice({
      variables: { invoiceID: invoice.id },
      onCompleted: () =>
        toast.success("Payment successfully submitted 👍", { toastId: "payment-success" })
    });
  };

  return (
    <>
      <Button startIcon={<PayIcon />} onClick={openDialog} {...props}>
        Pay Invoice
      </Button>
      {isDialogVisible && (
        <Dialog
          isVisible={isDialogVisible}
          title="Confirm Payment:"
          acceptLabel="SUBMIT PAYMENT"
          handleAccept={handlePayInvoice}
          handleCancel={closeDialog}
          message={
            <div
              style={{
                padding: "0 2rem 0 1rem",
                display: "grid",
                gridTemplate: "2fr 1fr / 1fr 2fr",
                columnGap: "2rem"
              }}
            >
              <div
                style={{
                  gridArea: "1 / 1",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: "1rem"
                }}
              >
                <Text style={{ float: "right", fontSize: "1.5rem" }}>Recipient:</Text>
              </div>

              <div
                style={{
                  gridArea: "1 / 2",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "1rem"
                }}
              >
                <ContactAvatar
                  contact={invoice.createdBy}
                  containerProps={{
                    sx: {
                      "& > .MuiAvatar-root": {
                        height: "3rem",
                        width: "3rem"
                      },
                      "& > .MuiTypography-root": {
                        fontSize: "1.5rem",
                        whiteSpace: "nowrap"
                      }
                    }
                  }}
                />
              </div>

              <div
                style={{
                  gridArea: "2 / 1",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: "1rem"
                }}
              >
                <Text style={{ float: "right", fontSize: "1.5rem" }}>Amount:</Text>
              </div>

              <div
                style={{
                  gridArea: "2 / 2",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "1rem"
                }}
              >
                <Text style={{ fontSize: "1.5rem" }}>{prettifyStr.currency(invoice.amount)}</Text>
              </div>
            </div>
          }
          style={{
            // these styles are applied to the Dialog container
            width: "clamp(35rem, 50vw, 50vw)",
            margin: "auto"
          }}
        />
      )}
    </>
  );
};
