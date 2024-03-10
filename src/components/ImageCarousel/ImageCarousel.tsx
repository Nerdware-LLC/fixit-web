import { useState } from "react";
import SwipeableViews, { type SwipeableViewsProps } from "react-swipeable-views-react-18-fix";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MobileStepper, {
  mobileStepperClasses,
  type MobileStepperProps,
} from "@mui/material/MobileStepper";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { imageCarouselClassNames } from "./classNames";
import type { Simplify, SetRequired } from "type-fest";

/**
 * This component displays images in a carousel that allows the user to navigate
 * between multiple images using left/right swipes and/or the back/next buttons.
 *
 * This component is based on the Mui `MobileStepper` demo:
 * https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
 *
 * `react-swipeable-views` docs: https://react-swipeable-views.com/api/api/
 */
export const ImageCarousel = ({
  images,
  initialImageIndex = 0,
  showImageLabels = false,
  SwipeableViewsProps = {},
  MobileStepperProps = {},
  ...paperProps
}: ImageCarouselProps) => {
  // If an image exists at the given index, use it. Otherwise, use zero.
  const [activeImgIndex, setActiveImgIndex] = useState(
    images?.[initialImageIndex] ? initialImageIndex : 0
  );

  const numImages = images.length;

  const handleBack = () => {
    setActiveImgIndex((prevActiveImgIndex) => {
      const maybeNextIndex = prevActiveImgIndex - 1;
      return maybeNextIndex < 0
        ? numImages - 1 // Wrap around to the last image
        : maybeNextIndex;
    });
  };

  const handleNext = () => {
    setActiveImgIndex((prevActiveImgIndex) => {
      const maybeNextIndex = prevActiveImgIndex + 1;
      return maybeNextIndex > numImages - 1
        ? 0 // Wrap around to the first image
        : maybeNextIndex;
    });
  };

  const handleChangeIndex = (step: number) => setActiveImgIndex(step);

  // Destructure any provided styles from the `SwipeableViewsProps` object for merging:
  const {
    style: swipeableViewsStyles,
    containerStyle: swipeableViewsContainerStyles,
    slideStyle: swipeableViewsSlideStyles,
    ...swipeableViewsProps
  } = SwipeableViewsProps;

  return (
    <StyledPaper className={imageCarouselClassNames.root} {...paperProps}>
      {showImageLabels && (
        <Paper elevation={0} className={imageCarouselClassNames.headerRoot}>
          <Text className={imageCarouselClassNames.headerText}>
            {images[activeImgIndex]?.label ?? "?"}
          </Text>
        </Paper>
      )}

      <SwipeableViews
        index={activeImgIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        style={{
          // THE ROOT SwipeableViews <div> (there's only 1)
          flexGrow: 1,
          flexShrink: 1,
          ...swipeableViewsStyles,
        }}
        containerStyle={{
          // THE CHILD OF THE ROOT SwipeableViews <div> (there's only 1)
          height: "100%",
          ...swipeableViewsContainerStyles,
        }}
        slideStyle={{
          // THE DIV THAT WRAPS EACH <img>
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...swipeableViewsSlideStyles,
        }}
        {...swipeableViewsProps}
      >
        {images.map(({ src, label, alt, ...imgProps }) => (
          <img
            key={label}
            src={src}
            alt={alt || label}
            className={imageCarouselClassNames.image}
            {...imgProps}
          />
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={numImages}
        activeStep={activeImgIndex}
        variant={numImages > 5 ? "text" : "dots"}
        position="static"
        backButton={
          <IconButton onClick={handleBack}>
            <KeyboardArrowLeft />
          </IconButton>
        }
        nextButton={
          <IconButton onClick={handleNext}>
            <KeyboardArrowRight />
          </IconButton>
        }
        {...MobileStepperProps}
      />
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)(({ style = {} }) => {
  const borderRadius = style?.borderRadius || "inherit";

  return {
    // THE ROOT PAPER
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // some default dimensions to ensure the carousel never extends beyond the viewport:
    maxHeight: style?.maxHeight || "95vh",
    maxWidth: style?.maxWidth || "95vw",
    height: style?.height || "100%",
    width: style?.width || "100%",

    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,

    // HEADER
    [`& > .${imageCarouselClassNames.headerRoot}`]: {
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      borderBottom: "1px solid black",
      backgroundColor: "inherit",
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      borderBottomLeftRadius: "0 !important",
      borderBottomRightRadius: "0 !important",
    },

    // IMAGES
    [`& .${imageCarouselClassNames.image}`]: {
      maxHeight: "98%",
      maxWidth: "98%",
      objectFit: "contain",
      imageRendering: "crisp-edges",
    },

    // FOOTER/MOBILE STEPPER CONTROLS
    [`& > .${mobileStepperClasses.root}`]: {
      backgroundColor: "inherit",
      borderTop: "1px solid black",
      borderTopLeftRadius: "0 !important",
      borderTopRightRadius: "0 !important",
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: "inherit",
    },
  };
});

/**
 * A `label` for an image and its `src` URL. If `alt` is not provided, the `label` is used.
 */
export type CarouselImageConfig = { label: string } & SetRequired<
  React.ComponentPropsWithoutRef<"img">,
  "src"
>;

export type ImageCarouselProps = {
  /** An array of {@link CarouselImageConfig|image config} objects. */
  images: Array<CarouselImageConfig>;
  /**
   * The index of the image to display first. If an {@link CarouselImageConfig|image config}
   * does not exist at the given index, the zero-index image is used as a fallback.
   */
  initialImageIndex?: number;
  showImageLabels?: boolean;
  SwipeableViewsProps?: Simplify<
    Pick<
      SwipeableViewsProps,
      | "animateHeight"
      | "animateTransitions"
      | "containerStyle"
      | "disabled"
      | "hysteresis"
      | "onSwitching"
      | "onTransitionEnd"
      | "resistance"
      | "slideClassName"
      | "slideStyle"
      | "springConfig"
      | "style"
      | "threshold"
    >
  >;
  MobileStepperProps?: Simplify<
    Omit<MobileStepperProps, "steps" | "activeStep" | "backButton" | "nextButton" | "children">
  >;
} & Omit<PaperProps, "children">;
