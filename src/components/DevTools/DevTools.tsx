import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import { RainbowBorderBox } from "@/components/Containers/RainbowBorderBox";
import { CacheManagerDevTool } from "./CacheManagerDevTool";
import { devToolsElementIDs } from "./elementIDs";

export const DevTools = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <RainbowBorderBox>
        <Button
          onClick={handleOpenModal}
          variant="outlined"
          size="small"
          sx={({ palette, variables }) => {
            // Setting bg-color is necessary to ensure the rainbow-bg is not visible on the button
            const backgroundColor = variables.isMobilePageLayout
              ? palette.background.default
              : palette.background.paper;
            return {
              // Ensure the button can be seen in light mode:
              ...(palette.mode === "light" && { color: palette.text.primary }),
              backgroundColor,
              "&:hover": { backgroundColor: alpha(backgroundColor, 0.875) },
            };
          }}
        >
          Open Dev Tools
        </Button>
      </RainbowBorderBox>
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-label="Fixit Dev Tools">
        <StyledPaper id={devToolsElementIDs.modalRoot}>
          <Paper id={devToolsElementIDs.modalHeader} elevation={4}>
            <Text variant="h4" style={{ fontSize: "1.65rem" }}>
              ✨ Fixit Dev Tools ✨
            </Text>
            <Text variant="body2" style={{ textAlign: "center", lineHeight: 1.4, opacity: 0.75 }}>
              These tools will help you take Fixit for a spin - have fun!
            </Text>
          </Paper>
          <div id={devToolsElementIDs.modalContent}>
            <CacheManagerDevTool handleCloseModal={handleCloseModal} />
          </div>
        </StyledPaper>
      </Modal>
    </>
  );
};

// Exported as default for React lazy loading
export default DevTools;

const StyledPaper = styled(Paper)(({ theme: { palette } }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "clamp(328px, 35vw, 26rem)",
  maxWidth: "600px",
  border: `3px solid ${palette.divider}`,
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  // HEADER
  [`& > #${devToolsElementIDs.modalHeader}`]: {
    width: "100%",
    borderRadius: "0.3rem 0.3rem 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderBottom: `1px solid ${palette.divider}`,
  },

  // CONTENT
  [`& > #${devToolsElementIDs.modalContent}`]: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 0 0.5rem 0",
  },
}));
