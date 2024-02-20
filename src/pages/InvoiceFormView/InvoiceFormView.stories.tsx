import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import {
  withHomePageLayoutDecorator,
  withMockApolloDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { CoreItemView } from "@/layouts/CoreItemView";
import { MOCK_INVOICES } from "@/tests/mockItems/mockInvoices";
import { InvoiceForm, type InvoiceFormProps } from "./InvoiceForm";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/InvoiceFormView",
  component: InvoiceForm,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, { args }) => (
      <CoreItemView headerLabel={args?.existingInvoice ? "Update Invoice" : "Create Invoice"}>
        <Story />
      </CoreItemView>
    ),
    withHomePageLayoutDecorator,
    withMockApolloDecorator,
  ],
  args: {
    onSubmit: (formValues: InvoiceFormValues) => {
      alert(`Form values: ${safeJsonStringify(formValues, null, 2)}`);
    },
  },
} satisfies Meta<InvoiceFormProps & MockApolloDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const CreateInvoice = {
  args: {
    initialFormValues: getInitialValuesFromSchema(invoiceFormSchema),
  },
} satisfies Story;

// Pick an arbitrary mock INV for the 'update' form
const updateFormExistingINV = MOCK_INVOICES.myInvoices.createdByUser[0];

export const UpdateInvoice = {
  args: {
    initialFormValues: getInitialValuesFromSchema(invoiceFormSchema, { ...updateFormExistingINV }),
    existingInvoice: { ...updateFormExistingINV },
  },
} satisfies Story;
