import { object as yupObject, number as yupNumber } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { Slider, type SliderProps } from "./Slider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
} satisfies Meta<SliderProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "number",
    label: "Pick a Number",
    marks: Array.from({ length: 9 }).map((_, index) => ({
      value: (index + 1) * 10,
      label: `${(index + 1) * 10}`,
    })),
    min: 0,
    max: 100,
    defaultValue: 50,
    step: null,
    valueLabelDisplay: "auto",
    style: {
      minWidth: "300px",
    },

    _form_decorator_args: {
      validationSchema: yupObject({ number: yupNumber().defined().nullable().default(null) }),
      initialValues: { number: null },
    },
  },
} satisfies Story;
