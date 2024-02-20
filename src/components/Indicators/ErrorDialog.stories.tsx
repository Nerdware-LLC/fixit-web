import { useState } from "react";
import Button from "@mui/material/Button";
import { ErrorDialog } from "./ErrorDialog";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Indicators/ErrorDialog",
  component: ErrorDialog,
} satisfies Meta<typeof ErrorDialog>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    title: "Demo Error Title",
    error: "This is a demo error message.",
  },
  render: function RenderError({ ...args }) {
    const [showError, setShowError] = useState(false);
    return (
      <>
        <Button onClick={() => setShowError(true)}>Show Error Indicator</Button>
        {showError && <ErrorDialog {...args} onDismiss={() => setShowError(false)} />}
      </>
    );
  },
} satisfies Story;
