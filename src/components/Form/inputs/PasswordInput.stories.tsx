import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { PasswordInput, type PasswordInputProps } from "./PasswordInput";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
} satisfies Meta<PasswordInputProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "password",
    label: "Password",

    _form_decorator_args: {
      validationSchema: yupObject({ password: yupCommonSchema.stringNullable }),
      initialValues: { password: null },
    },
  },
} satisfies Story;
