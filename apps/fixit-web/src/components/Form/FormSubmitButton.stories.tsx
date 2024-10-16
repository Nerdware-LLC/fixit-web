import { object as yupObject, mixed as yupMixed } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { FormSubmitButton, type FormSubmitButtonProps } from "./FormSubmitButton.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/FormSubmitButton",
  component: FormSubmitButton,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
} satisfies Meta<FormSubmitButtonProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    _form_decorator_args: {
      validationSchema: yupObject({ fooField: yupMixed().defined().nullable().default(null) }),
      initialValues: { fooField: null },
      style: { display: "grid", placeItems: "center" },
    },

    style: {
      width: "8rem",
    },
  },
} satisfies Story;
