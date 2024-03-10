import { useState } from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import Button, { buttonClasses } from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import VisibileIcon from "@mui/icons-material/Visibility";
import NotVisibileIcon from "@mui/icons-material/VisibilityOff";
import { sbDecoratorClassNames } from "./classNames";

/**
 * A Mui `Box` fixed to the bottom of the Story viewport for displaying the `storyInfo`.
 */
const StoryInfoContainer = ({
  children, // <-- the storyInfo
  disabled = false,
  sx = {},
  ...boxProps
}: StoryInfoContainerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <Box
      className={sbDecoratorClassNames.storyInfo}
      sx={{
        display: disabled ? "none" : "flex",
        visibility: isVisible ? "visible" : "collapse",
        position: "fixed",
        bottom: 0,
        left: "10%",
        width: "80%",
        padding: "0.75rem 1rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& *": {
          textAlign: "center",
          opacity: 0.9,
        },
        [`& .${sbDecoratorClassNames.storyInfo}`]: {
          position: "absolute",
          top: 0,
          right: 0,
          visibility: "visible !important",
        },
        ...sx,
      }}
      {...boxProps}
    >
      <Divider className={sbDecoratorClassNames.storyInfo} style={{ width: "100%" }} />
      <Button
        variant="text"
        onClick={toggleVisibility}
        startIcon={isVisible ? <VisibileIcon /> : <NotVisibileIcon />}
        className={sbDecoratorClassNames.storyInfo}
        sx={{
          fontSize: "0.9rem",
          fontWeight: 200,
          textTransform: "none",
          [`& .${buttonClasses.startIcon}`]: {
            marginLeft: "2px",
          },
        }}
      >
        {isVisible ? "Hide" : "Show Story Info"}
      </Button>
      {children /* <-- the storyInfo */}
    </Box>
  );
};

/**
 * This `decorator` component displays text conveying pertinent info to the viewer of a Story.
 */
export const StoryInfoDecorator = ({
  children, // <-- the story
  storyInfo,
  disabled = false,
  storyInfoContainerProps = {}, // <-- equivalent to `BoxProps`
}: StoryInfoDecoratorProps) => (
  <Box className={sbDecoratorClassNames.storyInfo}>
    {children}
    <StoryInfoContainer disabled={disabled} {...storyInfoContainerProps}>
      {storyInfo}
    </StoryInfoContainer>
  </Box>
);

type StoryInfoContainerProps = { disabled?: boolean } & BoxProps;

export type StoryInfoDecoratorProps = {
  storyInfo: React.ReactNode;
  children: React.ReactNode;
  disabled?: StoryInfoContainerProps["disabled"];
  storyInfoContainerProps?: Omit<StoryInfoContainerProps, "disabled">;
};
