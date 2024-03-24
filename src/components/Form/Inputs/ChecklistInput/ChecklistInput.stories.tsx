import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { BasicDemo } from "@/components/Checklist/Checklist.stories";
import { ChecklistInput, type ChecklistInputProps } from "./ChecklistInput";
import { yupChecklistFieldSchema } from "./helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/ChecklistInput",
  component: ChecklistInput,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
  args: {
    checklistFieldID: "checklist",

    _form_decorator_args: {
      validationSchema: yupChecklistFieldSchema,
      initialValues: {
        checklist: BasicDemo.args.checklistItems,
      },
    },
  },
} satisfies Meta<ChecklistInputProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const InteractiveDemo = {} satisfies Story;

export const Empty = {
  args: {
    _form_decorator_args: {
      ...meta.args._form_decorator_args,
      initialValues: {
        checklist: [],
      },
    },
  },
} satisfies Story;
