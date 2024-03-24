import { object as yupObject } from "yup";
import {
  withFormDecorator,
  type FormDecoratorArgs,
} from "@/../.storybook/decorators/FormDecorator";
import {
  SliderWorkOrderPriority,
  type SliderWorkOrderPriorityProps,
} from "./SliderWorkOrderPriority";
import { yupCommonSchema } from "../helpers/yupCommonSchema";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/SliderWorkOrderPriority",
  component: SliderWorkOrderPriority,
  decorators: [withFormDecorator],
  tags: ["autodocs"],
  parameters: {
    /* SB addon-actions currently intercepts events in the component as implemented, and
    is preventing the relevant handlers from being called, so the addon is disabled for
    now. This is the same issue in the `Tabs` SB story - I suspect this is due to some
    event handlers being defined internally rather than an SB story/component `arg`. */
    actions: false,
  },
} satisfies Meta<SliderWorkOrderPriorityProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "priority",
    label: "Priority",

    _form_decorator_args: {
      validationSchema: yupObject({ priority: yupCommonSchema.stringNullable }),
      initialValues: { priority: null },
    },
  },
} satisfies Story;
