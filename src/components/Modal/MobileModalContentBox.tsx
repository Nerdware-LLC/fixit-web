import { styled } from "@mui/material/styles";
import Modal, { type ModalProps } from "@mui/material/Modal";
import Paper, { paperClasses, type PaperProps } from "@mui/material/Paper";

/**
 * A Mui-Modal which places its children within a Paper-container styled for
 * mobile viewports.
 */
export const MobileModalContentBox = ({ children, ...props }: MobileModalContentBoxProps) => (
  <StyledModal {...props}>
    <Paper>{children}</Paper>
  </StyledModal>
);

const StyledModal = styled(Modal)({
  [`& > .${paperClasses.root}`]: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80dvw",
    border: "2px solid #000",
    borderRadius: "0.35rem",
    boxShadow: "24",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export type MobileModalContentBoxProps = Omit<ModalProps, "children"> &
  Pick<PaperProps, "children">;
