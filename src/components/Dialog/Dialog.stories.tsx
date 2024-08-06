import Button from "@mui/material/Button";
import { Dialog, type DialogProps } from "./Dialog.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  render: ({ title, children }) => {
    const { isDialogVisible, openDialog, closeDialog } = Dialog.use();

    return (
      <>
        <Button onClick={openDialog}>Open Dialog</Button>
        {isDialogVisible && (
          <Dialog
            title={title}
            isVisible={isDialogVisible}
            handleAccept={closeDialog}
            handleCancel={closeDialog}
          >
            {children}
          </Dialog>
        )}
      </>
    );
  },
} satisfies Meta<typeof Dialog>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

/**
 * Dialog story args = {@link DialogProps} without `isVisible`, which
 * is handled by a `render` function in Dialog's Storybook meta object.
 */
type DialogStoryArgs = Omit<DialogProps, "isVisible">;

type Story = StoryObj<DialogStoryArgs>;

export const BasicDemo = {
  args: {
    title: "Dialog Demo Title",
    children: (
      <span>
        This is demo dialog content.
        <p style={{ marginBottom: 0 }}>Any of the following actions will close this dialog:</p>
        <ul>
          <li>Click "OK"</li>
          <li>Click "Cancel"</li>
          <li>Click anywhere outside of this dialog</li>
        </ul>
      </span>
    ),
  },
} satisfies Story;
