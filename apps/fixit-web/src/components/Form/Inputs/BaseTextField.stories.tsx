import { BaseTextField, type BaseTextFieldProps } from "./BaseTextField.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/BaseTextField",
  component: BaseTextField,
  tags: ["autodocs"],
} satisfies Meta<BaseTextFieldProps>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "fooField",
    label: "Foo Field",
    placeholder: "Foo placeholder",
  },
} satisfies Story;
