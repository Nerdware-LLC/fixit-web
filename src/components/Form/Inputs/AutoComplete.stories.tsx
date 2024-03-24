import { object as yupObject } from "yup";
import { withFormDecorator, type FormDecoratorArgs } from "@/../.storybook/decorators";
import { AutoComplete, type AutoCompleteProps } from "./AutoComplete";
import { yupCommonSchema } from "../helpers";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Form/AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  decorators: [withFormDecorator<AutoCompleteProps>],
  parameters: {
    /* SB addon-actions currently intercepts events in the component as implemented, and
    is preventing the relevant handlers from being called, so the addon is disabled for
    now. This is the same issue in the `Tabs` SB story - I suspect this is due to some
    event handlers being defined internally rather than an SB story/component `arg`. */
    actions: false,
  },
} satisfies Meta<AutoCompleteProps & FormDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    id: "movie",
    label: "Select a Movie",
    options: [
      "2001: A Space Odyssey",
      "Alien",
      "Back to the Future",
      "Contact",
      "Encanto",
      "Frozen",
      "Harry Potter",
      "Independence Day",
      "Ip Man",
      "Jurassic Park",
      "Lord of the Rings",
      "Moana",
      "Pirates of the Caribbean",
      "Raiders of the Lost Ark",
      "Star Wars",
      "The Hobbit",
      "X-Men",
    ].map((movieName, index) => ({ id: `movie_${index + 1}`, label: movieName })),
    style: { width: "13rem" },

    _form_decorator_args: {
      validationSchema: yupObject({ movie: yupCommonSchema.stringNullable }),
      initialValues: { movie: null },
    },
  },
} satisfies Story;

// TODO Add stories/controls for AutoComplete variations: FreeSolo, grouped opts
