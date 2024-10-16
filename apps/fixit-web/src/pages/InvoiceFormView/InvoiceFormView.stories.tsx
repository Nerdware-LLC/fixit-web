import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import {
  withHomePageLayoutDecorator,
  withMockApolloDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { apolloClient } from "@/app/ApolloProvider/apolloClient.js";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { QUERIES } from "@/graphql/queries.js";
import { CoreItemView } from "@/layouts/CoreItemView";
import { MOCK_INVOICES, MOCK_WORK_ORDERS, MOCK_MY_CONTACTS_RESPONSE } from "@/tests/mockItems";
import { InvoiceForm, type InvoiceFormProps } from "./InvoiceForm.jsx";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema.js";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/InvoiceFormView",
  component: InvoiceForm,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, { args }) => (
      <CoreItemView headerLabel={args.existingInvoice ? "Update Invoice" : "Create Invoice"}>
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

// Write mocks for queries with "cache-only" fetchPolicy:
apolloClient.writeQuery({ query: QUERIES.MY_WORK_ORDERS, data: MOCK_WORK_ORDERS });
apolloClient.writeQuery({ query: QUERIES.MY_CONTACTS, data: MOCK_MY_CONTACTS_RESPONSE });

export const CreateInvoice = {
  args: {
    initialFormValues: getInitialValuesFromSchema(invoiceFormSchema),
  },
} satisfies Story;

// Pick an arbitrary mock INV for the 'update' form
const updateFormExistingINV = MOCK_INVOICES.myInvoices.createdByUser[0];

export const UpdateInvoice = {
  args: {
    initialFormValues: getInitialValuesFromSchema(invoiceFormSchema, {
      assignedTo: { id: updateFormExistingINV.assignedTo.id },
      workOrder: updateFormExistingINV.workOrder?.id ?? null,
      amount: updateFormExistingINV.amount,
    }),

    existingInvoice: { ...updateFormExistingINV },
  },
} satisfies Story;
