import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getMuiPaperStyles } from "@/app/ThemeProvider/helpers";
import { Dialog } from "@/components/Dialog";
import { DefaultErrorFallback } from "./DefaultErrorFallback";
import { ErrorBoundary } from "./ErrorBoundary";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
  /* To use the ErrorBoundary component in a Story, we need a component that throws an
  error instead of returning JSX. This is accomplished in the below `render` fn using a
  state param called `shouldThrow` - this makes it necessary to implement ErrorBoundary
  as a `decorator` to ensure it is always rendered as a parent of the "Throw Error" btn. */
  decorators: [
    (Story, { args }) => (
      <Box
        component="fieldset"
        maxWidth="md"
        sx={{
          width: "21rem",
          height: "12rem",
          border: "2px dashed red",
          borderRadius: "0.5rem",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& > legend": {
            whiteSpace: "nowrap",
            padding: "0 7px",
            margin: "auto",
          },
        }}
      >
        <legend>ErrorBoundary visual representation</legend>
        <ErrorBoundary {...args}>
          <Story />
        </ErrorBoundary>
      </Box>
    ),
  ],
  render: () => {
    const [shouldThrow, setShouldThrow] = useState(false);
    if (shouldThrow) throw new Error();
    return <Button onClick={() => setShouldThrow(true)}>Throw an Error</Button>;
  },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    fallback: ({ resetError }) => (
      <Dialog
        title={`You clicked the "Throw Error" button!`}
        message={
          <Box
            component="span"
            sx={(theme) => ({
              "& > code": {
                padding: "2px 4px",
                borderRadius: "3px",
                ...getMuiPaperStyles(1, theme),
              },
            })}
          >
            More info regarding the error and its handling is available in the <code>console</code>,
            as well as the Storybook <code>Actions</code> tab.
          </Box>
        }
        acceptLabel="OK - Reset Error"
        handleAccept={() => resetError()}
      />
    ),
  },
} satisfies Story;

export const WithDefaultFallback = {
  args: {
    fallback: ({ resetError }) => (
      <DefaultErrorFallback
        onClick={() => resetError()}
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
} satisfies Story;
