import { useState, useRef } from "react";
import { lighten } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Text, { typographyClasses } from "@mui/material/Typography";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { SlideTransition } from "./SlideTransition";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Transitions/SlideTransition",
  component: SlideTransition,
  tags: ["autodocs"],
} satisfies Meta<typeof SlideTransition>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const InteractiveDemo = {
  args: {
    children: <WavingHandIcon style={{ height: "100%", width: "25%" }} />,
  },
  render: ({ direction = "up", timeout = 1000, children }) => {
    const [isIconVisible, setIsIconVisible] = useState(false);
    const [shouldSlideFromContainer, setShouldSlideFromContainer] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChangeIsIconVisible = () => setIsIconVisible((prev) => !prev);
    const handleChangeShouldSlideFromContainer = () => setShouldSlideFromContainer((prev) => !prev);

    return (
      <Paper
        variant="outlined"
        style={{
          width: "320px",
          height: "clamp(320px, 80vh, 500px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={({ palette }) => ({
            width: "100%",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: "0.5rem",
            display: "grid",
            gridTemplateColumns: "60px auto",
            gridTemplateRows: "repeat( auto-fit, 1fr )",
            alignItems: "center",
            justifyItems: "stretch",
            columnGap: "0.5rem",
            [`& > .${typographyClasses.root}`]: {
              backgroundColor: lighten(palette.background.paper, 0.05),
              /* backgroundColor is explicitly provided here to addresses a11y contrast warning:
              "Element's background color could not be determined due to a background gradient." */
            },
          })}
        >
          <Switch
            checked={isIconVisible}
            onChange={handleChangeIsIconVisible}
            inputProps={{ "aria-labelledby": ELEMENT_IDS.SHOW_ICON_INPUT_LABEL }}
          />
          <Text id={ELEMENT_IDS.SHOW_ICON_INPUT_LABEL}>
            {`${isIconVisible ? "Hide" : "Show"} Icon`}
          </Text>
          <Checkbox
            checked={shouldSlideFromContainer}
            onChange={handleChangeShouldSlideFromContainer}
            inputProps={{ "aria-labelledby": ELEMENT_IDS.SLIDE_FROM_CONTAINER_INPUT_LABEL }}
          />
          <Text id={ELEMENT_IDS.SLIDE_FROM_CONTAINER_INPUT_LABEL}>Slide Relative to Container</Text>
        </Paper>
        <Box
          ref={containerRef}
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...(shouldSlideFromContainer && { overflow: "hidden" }),
          }}
        >
          <SlideTransition
            direction={direction}
            in={isIconVisible}
            timeout={timeout}
            mountOnEnter
            unmountOnExit
            {...(shouldSlideFromContainer && { container: containerRef.current })}
          >
            {children}
          </SlideTransition>
        </Box>
      </Paper>
    );
  },
} satisfies Story;

const ELEMENT_IDS = {
  SHOW_ICON_INPUT_LABEL: "show-icon-input-label",
  SLIDE_FROM_CONTAINER_INPUT_LABEL: "slide-from-container-input-label",
};
