import { object as yupObject, number as yupNumber } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { Select, type SelectProps } from "./Select.jsx";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
  parameters: {
    /* SB addon-actions currently intercepts events in the component as implemented, and
    is preventing the relevant handlers from being called, so the addon is disabled for
    now. This is the same issue in the `Tabs` SB story - I suspect this is due to some
    event handlers being defined internally rather than an SB story/component `arg`. */
    actions: false,
  },
} satisfies Meta<SelectProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

/**
 * - **Q:** Why not use `type Story = StoryObj<typeof meta>`?
 * - **A:** Such a `Story` type would not be re-usable across multiple `Select` stories
 *   due to the component's type params, e.g., `SelectProps<string | number | null>`.
 */

export const BasicDemo = {
  args: {
    fieldID: "food",
    label: "Favorite Food",
    options: ["🍕 Pizza", "🌮 Tacos", "🧁 Cupcakes"].map((value) => ({ value })),
    fullWidth: true,

    _form_decorator_args: {
      validationSchema: yupObject({ food: yupCommonSchema.stringNullable }),
      initialValues: { food: null },
    },
  },
} satisfies StoryObj<Meta<SelectProps<string | null> & FormDecoratorArgs>>;

export const PickANumber = {
  args: {
    fieldID: "number",
    label: "Pick a Number",
    options: [0, 1, 2, 3, 42, 199].map((value) => ({ value })),
    fullWidth: true,

    _form_decorator_args: {
      validationSchema: yupObject({ number: yupNumber().nullable().default(null) }),
      initialValues: { number: null },
    },
  },
} satisfies StoryObj<Meta<SelectProps<number | null> & FormDecoratorArgs>>;
