import { object as yupObject, date as yupDate } from "yup";
import {
  withFormDecorator,
  withLayoutInfoDecorator,
  type FormDecoratorArgs,
} from "@/../.storybook/decorators";
import { DatePicker, type DatePickerProps } from "./DatePicker";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
    (Story, { viewMode }) => (
      <div
        style={{
          ...(viewMode === "story" && {
            /* In "story" mode, the component is rendered higher in the viewport to
            ensure the input's Popper isn't covered by the SB controls panel. This is
            ignored for "docs" to ensure the component is visible in the preview. */
            transform: "translateY(-10rem)",
          }),
        }}
      >
        <Story />
      </div>
    ),
    withLayoutInfoDecorator,
    withFormDecorator,
  ],
} satisfies Meta<DatePickerProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "date",
    label: "Pick a Date",

    _form_decorator_args: {
      validationSchema: yupObject({ date: yupDate().defined().nullable().default(null) }),
      initialValues: { date: null },
    },
  },
} satisfies Story;
