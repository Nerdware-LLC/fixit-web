import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import { XscrollContainer } from "./XscrollContainer.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Containers/XscrollContainer",
  component: XscrollContainer,
} satisfies Meta<typeof XscrollContainer>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  render: () => (
    <Box
      style={{
        margin: "auto",
        maxHeight: "60%",
        minWidth: "5rem",
        width: "clamp(5rem, 100%, 30rem)",
        maxWidth: "30rem",
        padding: "1rem",
        border: "1px dashed red",
      }}
    >
      <XscrollContainer style={{ border: "1px dashed yellow" }}>
        <Text style={{ whiteSpace: "nowrap" }}>
          This long string of text takes up space to facilitate the demonstration of
          XScollContainer's ability to scroll horizontally on any device viewport in a manner that
          reflects the user's expectation of how horizontal scrolling should work.
        </Text>
      </XscrollContainer>
    </Box>
  ),
} satisfies Story;
