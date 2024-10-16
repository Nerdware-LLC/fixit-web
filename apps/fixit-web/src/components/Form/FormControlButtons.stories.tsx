import { object as yupObject, mixed as yupMixed } from "yup";
import {
  withFormDecorator,
  withNavDecorator,
  type FormDecoratorArgs,
  type NavDecoratorArgs,
} from "@/../.storybook/decorators";
import { FormControlButtons, type FormControlButtonsProps } from "./FormControlButtons.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/FormControlButtons",
  component: FormControlButtons,
  tags: ["autodocs"],
  decorators: [withFormDecorator, withNavDecorator],
} satisfies Meta<FormControlButtonsProps & FormDecoratorArgs & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    _form_decorator_args: {
      validationSchema: yupObject({ fooField: yupMixed().defined().nullable().default(null) }),
      initialValues: { fooField: null },
    },
  },
} satisfies Story;
