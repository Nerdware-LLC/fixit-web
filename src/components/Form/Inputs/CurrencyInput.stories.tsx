import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { CurrencyInput, type CurrencyInputProps } from "./CurrencyInput";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
} satisfies Meta<CurrencyInputProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "amount",
    label: "Amount",

    _form_decorator_args: {
      validationSchema: yupObject({ amount: yupCommonSchema.stringNullable }),
      initialValues: { amount: null },
    },
  },
} satisfies Story;
