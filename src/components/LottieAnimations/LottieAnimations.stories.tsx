import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLottie } from "./useLottie";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/LottieAnimations",
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const SuccessAnimation = {
  render: () => {
    const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
    const [showLottie, setShowLottie] = useState(false);

    const handleClickBtn = async () => {
      setShowLottie(true);
      await playLottie();
      setShowLottie(false);
    };

    return (
      <Box>
        <Button onClick={handleClickBtn} style={{ width: "10rem" }}>
          Play Lottie
        </Button>
        <Backdrop open={showLottie} style={{ backdropFilter: "blur(1000px)" }}>
          {LottieView}
        </Backdrop>
      </Box>
    );
  },
} satisfies Story;
