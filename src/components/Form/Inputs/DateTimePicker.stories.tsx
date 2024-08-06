import { object as yupObject } from "yup";
import {
  withFormDecorator,
  withLayoutInfoDecorator,
  type FormDecoratorArgs,
} from "@/../.storybook/decorators";
import { yupCommonSchema } from "@/components/Form/helpers/yupCommonSchema.js";
import { DateTimePicker, type DateTimePickerProps } from "./DateTimePicker.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  decorators: [withLayoutInfoDecorator, withFormDecorator],
} satisfies Meta<DateTimePickerProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    fieldID: "datetime",
    label: "Pick a DateTime",

    _form_decorator_args: {
      validationSchema: yupObject({
        datetime: yupCommonSchema.dayjsObject.nullable().default(null),
      }),
      initialValues: { datetime: null },
    },
  },
} satisfies Story;
