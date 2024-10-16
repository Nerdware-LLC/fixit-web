import { object as yupObject } from "yup";
import {
  withFormDecorator,
  withLayoutInfoDecorator,
  type FormDecoratorArgs,
} from "@/../.storybook/decorators";
import { yupCommonSchema } from "@/components/Form/helpers/yupCommonSchema.js";
import { DatePicker, type DatePickerProps } from "./DatePicker.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [withLayoutInfoDecorator, withFormDecorator],
} satisfies Meta<DatePickerProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    fieldID: "date",
    label: "Pick a Date",

    _form_decorator_args: {
      validationSchema: yupObject({
        datetime: yupCommonSchema.dayjsObject.nullable().default(null),
      }),
      initialValues: { date: null },
    },
  },
} satisfies Story;
