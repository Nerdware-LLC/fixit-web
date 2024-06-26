import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { PhoneInput, type PhoneInputProps } from "./PhoneInput.jsx";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
} satisfies Meta<PhoneInputProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "phone",
    label: "Phone",

    _form_decorator_args: {
      validationSchema: yupObject({ phone: yupCommonSchema.stringNullable }),
      initialValues: { phone: null },
    },
  },
} satisfies Story;
