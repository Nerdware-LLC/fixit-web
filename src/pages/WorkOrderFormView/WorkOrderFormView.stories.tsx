import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import {
  withHomePageLayoutDecorator,
  withMockApolloDecorator,
  type MockApolloDecoratorArgs,
} from "@/../.storybook/decorators";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { CoreItemView } from "@/layouts/CoreItemView";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems/mockWorkOrders.js";
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
        headerLabel={args?.existingWorkOrder ? "Update Work Order" : "Create Work Order"}
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
