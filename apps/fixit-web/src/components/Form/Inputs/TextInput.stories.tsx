import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { TextInput, type TextInputProps } from "./TextInput.jsx";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
} satisfies Meta<TextInputProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    fieldID: "text",
    label: "Foo Text",
    placeholder: "Type some text here ...",

    _form_decorator_args: {
      validationSchema: yupObject({ text: yupCommonSchema.stringNullable }),
      initialValues: { text: null },
    },
  },
} satisfies Story;
