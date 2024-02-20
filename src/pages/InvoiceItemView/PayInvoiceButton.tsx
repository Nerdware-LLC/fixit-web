import { toast } from "react-toastify";
import { useMutation } from "@apollo/client/react/hooks";
import Box from "@mui/material/Box";
import Button, { buttonClasses, type ButtonProps } from "@mui/material/Button";
import Text, { typographyClasses } from "@mui/material/Typography";
import PayIcon from "@mui/icons-material/Paid";
import { ContactAvatar, avatarClassNames } from "@/components/Avatar";
import { Dialog } from "@/components/Dialog";
import { MUTATIONS } from "@/graphql/mutations";
import { fmt } from "@/utils/formatters";
import { invoiceItemViewClassNames } from "./classNames";
import type { Invoice } from "@/graphql/types";

export const PayInvoiceButton = ({
  invoice,
  label = "Pay Invoice",
  ...props
}: PayInvoiceButtonProps) => {
  const [payInvoice] = useMutation(MUTATIONS.PAY_INVOICE);
  const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

  const handlePayInvoice = async () => {
    return await payInvoice({
      variables: { invoiceID: invoice.id },
      onCompleted: () =>
        toast.success("Payment successfully submitted 👍", { toastId: "payment-success" }),
    });
  };

  return (
    <>
      <Button
        onClick={openDialog}
        startIcon={<PayIcon />}
        sx={{
          height: "2rem",
          maxHeight: "2rem",
          padding: "calc(0.5rem + 1px) 1rem calc(0.5rem - 1px) 1rem",
          whiteSpace: "nowrap",
          [`& > .${buttonClasses.startIcon}`]: {
            position: "relative",
            top: "-1px",
            marginRight: "0.375rem",
          },
        }}
        {...props}
      >
        {label}
      </Button>
      {isDialogVisible && (
        <Dialog
          isVisible={isDialogVisible}
          title="Confirm Payment"
          acceptLabel="SUBMIT PAYMENT"
          // IDEA Add info about when the payment will be completed
          handleAccept={handlePayInvoice}
          handleCancel={closeDialog}
        >
          <Box
            sx={{
              padding: "0 2rem 0 1rem",
              display: "grid",
              gridTemplate: "2fr 1fr / 1fr 2fr",
              gap: "1rem 2rem", // row col

              "& > div": {
                // All direct-child divs are flex rows
                display: "flex",
                alignItems: "center",

                // All text, font size 1.5rem
                [`& .${typographyClasses.root}`]: {
                  fontSize: "1.5rem",
                },

                // LEFT COL
                [`&.${invoiceItemViewClassNames.payInvoiceDialogLeftCol}`]: {
                  justifyContent: "flex-end",
                  [`& .${typographyClasses.root}`]: {
                    float: "right",
                  },
                },

                // RIGHT COL
                [`&.${invoiceItemViewClassNames.payInvoiceDialogRightCol}`]: {
                  justifyContent: "flex-start",
                  [`& .${avatarClassNames.muiAvatar.root}`]: {
                    height: "3rem",
                    width: "3rem",
                  },
                },

                // GRID AREAS
                "&:first-of-type": { gridArea: "1 / 1" },
                "&:nth-of-type(2)": { gridArea: "1 / 2" },
                "&:nth-of-type(3)": { gridArea: "2 / 1" },
                "&:last-of-type": { gridArea: "2 / 2" },
              },
            }}
          >
            <div className={invoiceItemViewClassNames.payInvoiceDialogLeftCol}>
              <Text>Recipient:</Text>
            </div>
            <div className={invoiceItemViewClassNames.payInvoiceDialogRightCol}>
              <ContactAvatar contact={invoice.createdBy} />
            </div>
            <div className={invoiceItemViewClassNames.payInvoiceDialogLeftCol}>
              <Text>Amount:</Text>
            </div>
            <div className={invoiceItemViewClassNames.payInvoiceDialogRightCol}>
              <Text>{fmt.intToCurrencyStr(invoice.amount)}</Text>
            </div>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export type PayInvoiceButtonProps = { invoice: Invoice; label?: string } & Omit<
  ButtonProps,
  "onClick" | "startIcon"
>;
