import { object as yupObject, date as yupDate } from "yup";
import {
  withFormDecorator,
  withLayoutInfoDecorator,
  type FormDecoratorArgs,
} from "@/../.storybook/decorators";
import { DateTimePicker, type DateTimePickerProps } from "./DateTimePicker.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/DateTimePicker",
  component: DateTimePicker,
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
} satisfies Meta<DateTimePickerProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "datetime",
    label: "Pick a DateTime",

    _form_decorator_args: {
      validationSchema: yupObject({ datetime: yupDate().defined().nullable().default(null) }),
      initialValues: { datetime: null },
    },
  },
} satisfies Story;
