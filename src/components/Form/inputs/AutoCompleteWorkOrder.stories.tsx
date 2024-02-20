import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { MOCK_WORK_ORDERS } from "@/tests/mockItems";
import { AutoCompleteWorkOrder, type AutoCompleteWorkOrderProps } from "./AutoCompleteWorkOrder";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/AutoCompleteWorkOrder",
  component: AutoCompleteWorkOrder,
  decorators: [withFormDecorator],
  tags: ["autodocs"],
  parameters: {
    /* SB addon-actions currently intercepts events in the component as implemented, and
    is preventing the relevant handlers from being called, so the addon is disabled for
    now. This is the same issue in the `Tabs` SB story - I suspect this is due to some
    event handlers being defined internally rather than an SB story/component `arg`. */
    actions: false,
  },
} satisfies Meta<AutoCompleteWorkOrderProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "workOrder",
    label: "Work Order",
    options: MOCK_WORK_ORDERS.myWorkOrders.assignedToUser.map((wo) => ({
      ...wo,
      userToDisplay: wo.createdBy,
    })),

    _form_decorator_args: {
      validationSchema: yupObject({ workOrder: yupCommonSchema.stringNullable }),
      initialValues: { workOrder: null },
    },
  },
} satisfies Story;
