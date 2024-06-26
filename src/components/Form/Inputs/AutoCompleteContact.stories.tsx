import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { STATIC_MOCK_CONTACTS } from "@/tests/mockItems/staticMockContacts.js";
import { AutoCompleteContact, type AutoCompleteContactProps } from "./AutoCompleteContact.jsx";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/AutoCompleteContact",
  component: AutoCompleteContact,
  tags: ["autodocs"],
  decorators: [withFormDecorator],
  parameters: {
    /* SB addon-actions currently intercepts events in the component as implemented, and
    is preventing the relevant handlers from being called, so the addon is disabled for
    now. This is the same issue in the `Tabs` SB story - I suspect this is due to some
    event handlers being defined internally rather than an SB story/component `arg`. */
    actions: false,
  },
} satisfies Meta<AutoCompleteContactProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "contact",
    label: "Contact",
    options: Object.values(STATIC_MOCK_CONTACTS),

    _form_decorator_args: {
      validationSchema: yupObject({ contact: yupCommonSchema.stringNullable }),
      initialValues: { contact: null },
    },
  },
} satisfies Story;
