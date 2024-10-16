import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BackButton } from "./BackButton.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Navigation/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof BackButton>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithIcon = {
  args: {
    icon: true,
  },
} satisfies Story;
