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
import { MOCK_WORK_ORDERS, MOCK_MY_CONTACTS_RESPONSE } from "@/tests/mockItems";
import { WorkOrderForm, type WorkOrderFormProps } from "./WorkOrderForm.jsx";
import { workOrderFormSchema, type WorkOrderFormValues } from "./schema.js";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/WorkOrderFormView",
  component: WorkOrderForm,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, { args }) => (
      <CoreItemView
        headerLabel={args.existingWorkOrder ? "Update Work Order" : "Create Work Order"}
      >
        <Story />
      </CoreItemView>
    ),
    withHomePageLayoutDecorator,
    withMockApolloDecorator,
  ],
  args: {
    onSubmit: (formValues: WorkOrderFormValues) => {
      alert(`Form values: ${safeJsonStringify(formValues, null, 2)}`);
    },
  },
} satisfies Meta<WorkOrderFormProps & MockApolloDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

// Write mocks for queries with "cache-only" fetchPolicy:
apolloClient.writeQuery({ query: QUERIES.MY_CONTACTS, data: MOCK_MY_CONTACTS_RESPONSE });

export const CreateWorkOrder = {
  args: {
    initialFormValues: getInitialValuesFromSchema(workOrderFormSchema),
  },
} satisfies Story;

// Pick an arbitrary mock WO for the 'update' form
const updateFormExistingWO = MOCK_WORK_ORDERS.myWorkOrders.createdByUser[0];

export const UpdateWorkOrder = {
  args: {
    initialFormValues: getInitialValuesFromSchema(workOrderFormSchema, updateFormExistingWO),
    existingWorkOrder: updateFormExistingWO,
  },
} satisfies Story;
