import { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Button, { buttonClasses } from "@mui/material/Button";
import Divider, { dividerClasses } from "@mui/material/Divider";
import IconButton, { iconButtonClasses } from "@mui/material/IconButton";
import { svgIconClasses } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import VisibileIcon from "@mui/icons-material/Visibility";
import NotVisibileIcon from "@mui/icons-material/VisibilityOff";
import { sbDecoratorElementIDs } from "./elementIDs.js";
import type { Simplify } from "type-fest";

/**
 * Props for the {@link StoryInfoDecorator} component.
 */
export type StoryInfoDecoratorProps = Simplify<
  BoxProps & {
    /** The `Story` component to be wrapped by the `StoryInfoDecorator`. */
    children: React.ReactNode;
    /** Info about the `Story` to be displayed at the bottom of the SB preview viewport. */
    storyInfo: React.ReactNode;
    /** Pass `disabled={true}` to cause the `storyInfo` to not be displayed. */
    disabled?: boolean;
  }
>;

/**
 * This `decorator` component displays text conveying pertinent info to the viewer of a Story.
 */
export const StoryInfoDecorator = ({
  children, // <-- the story
  storyInfo,
  disabled = false,
  ...boxProps
}: StoryInfoDecoratorProps) => {
  // Memoize children so that toggling visibility doesn't cause the story to re-render
  const memoizedChildren = useMemo(() => children, [children]);

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <Box id={sbDecoratorElementIDs.storyInfoRoot} {...boxProps}>
      {memoizedChildren}
      <StyledBox
        id={sbDecoratorElementIDs.storyInfoPanelRoot}
        disabled={disabled}
        isVisible={isVisible}
      >
        <Divider id={sbDecoratorElementIDs.storyInfoDivider}>
          <InfoIcon />
        </Divider>
        {isVisible ? (
          <Tooltip title="Hide Story Info" placement="top">
            <IconButton id={sbDecoratorElementIDs.storyInfoShowHideBtn} onClick={toggleVisibility}>
              <NotVisibileIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            id={sbDecoratorElementIDs.storyInfoShowHideBtn}
            onClick={toggleVisibility}
            startIcon={<VisibileIcon />}
            variant="text"
            aria-label="show story info"
          >
            Show Story Info
          </Button>
        )}
        <div id={sbDecoratorElementIDs.storyInfoWrapper}>{storyInfo}</div>
      </StyledBox>
    </Box>
  );
};

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "disabled" && prop !== "isVisible",
})<{ disabled: boolean; isVisible: boolean }>(
  ({ disabled, isVisible, theme: { palette, variables } }) => ({
    display: disabled ? "none" : "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: 0,
    left: "5%",
    width: "90%",
    padding: !isVisible ? "0.75rem 1rem 1rem 1rem" : "1rem",
    alignItems: "center",
    justifyContent: "center",

    "& *": {
      textAlign: "center",
      opacity: 0.9,
    },

    // STORY INFO — PANEL DIVIDER
    [`& > #${sbDecoratorElementIDs.storyInfoDivider}`]: {
      position: "absolute",
      top: "-1rem",
      right: 0,
      width: "100%",
      [`& > .${dividerClasses.wrapper}`]: {
        padding: "0 0.5rem",
        display: "inline-flex",
        alignItems: "center",
        opacity: 0.5,
      },
    },

    // STORY INFO — PANEL SHOW/HIDE BTN
    [`& > #${sbDecoratorElementIDs.storyInfoShowHideBtn}`]: {
      // Vis/NoVis Icon:
      [`& .${svgIconClasses.root}`]: { fontSize: "1.25rem" },

      // When isVisible is true, the button is a Mui `IconButton`
      [`&.${iconButtonClasses.root}`]: {
        position: "absolute",
        top: "-0.25rem",
        right: "-0.25rem",
        color: palette.primary.main,
        opacity: 0.85,
      },

      // When isVisible is false, the button is a Mui `Button`
      [`&.${buttonClasses.root}`]: {
        fontSize: "0.9rem",
        textTransform: "none",
        fontWeight: "lighter",
        ...(variables.isMobilePageLayout && { padding: "0.25rem 0.5rem" }),
        [`& > .${buttonClasses.startIcon}`]: {
          margin: "1px 0.375rem 0 0",
        },
      },
    },

    // STORY INFO — WRAPPER
    [`& > #${sbDecoratorElementIDs.storyInfoWrapper}`]: {
      ...(!isVisible && { display: "none" }),
    },
  })
);
