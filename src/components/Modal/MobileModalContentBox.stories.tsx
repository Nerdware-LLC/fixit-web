import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper, { paperClasses } from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Text from "@mui/material/Typography";
import { MobileModalContentBox } from "./MobileModalContentBox";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Modal/MobileModalContentBox",
  component: MobileModalContentBox,
} satisfies Meta<typeof MobileModalContentBox>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const InteractiveDemo = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    return (
      <Paper
        style={{
          position: "absolute",
          top: "10%",
          transform: "translateX(-50%)",
          padding: "1rem",
        }}
      >
        <FormControlLabel
          control={<Switch checked={isOpen} onChange={handleChange} />}
          label={`${isOpen ? "Hide" : "Show"} Modal`}
          style={{ margin: 0 }}
        />
        {isOpen && (
          <MobileModalContentBox
            open={isOpen}
            onClose={handleClose}
            sx={{
              [`& > .${paperClasses.root}`]: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                padding: "1rem",
              },
            }}
          >
            <Text>This is modal content.</Text>
            <Text>Click anywhere outside of the modal within the viewport to close it.</Text>
          </MobileModalContentBox>
        )}
      </Paper>
    );
  },
} satisfies Omit<Story, "args">;
