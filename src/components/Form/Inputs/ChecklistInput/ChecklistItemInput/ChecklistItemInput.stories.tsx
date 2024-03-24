import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { BasicDemo } from "@/components/Checklist/Checklist.stories";
import { ChecklistItemInput, type CheckListItemInputProps } from "./ChecklistItemInput";
import ChecklistInputStoryMeta from "../ChecklistInput.stories";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/ChecklistItemInput",
  component: ChecklistItemInput,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
  args: {
    ...ChecklistInputStoryMeta.args,
  },
} satisfies Meta<CheckListItemInputProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const InteractiveDemo = {
  args: {
    checklistItemIndex: 0, // this demo has fixed length num checklist items
    autoFocus: true,
    enableDelete: false,

    _form_decorator_args: {
      initialValues: {
        checklist: [BasicDemo.args.checklistItems[0]],
      },
    },
  },
} satisfies Story;
