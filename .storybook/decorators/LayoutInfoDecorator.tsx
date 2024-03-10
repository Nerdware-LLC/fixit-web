import Text, { typographyClasses } from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { StoryInfoDecorator, type StoryInfoDecoratorProps } from "./StoryInfoDecorator";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction } from "@storybook/types";

const LayoutInfo = (
  <Text variant="subtitle1">
    <InfoIcon />
    This component renders different content depending on the <i>viewport</i> and <i>userAgent</i>
    <p>
      — try switching between mobile/desktop <i>viewports</i> and <i>userAgents</i> using the
      toolbar.
    </p>
  </Text>
);

/**
 * This `decorator` component uses the {@link StoryInfoDecorator} to display a
 * message indicating that the child component is layout-dependent, and invites
 * the user to change the viewport and/or userAgent using the toolbar.
 */
export const LayoutInfoDecorator = ({
  disabled = false,
  children, // <-- the story
  storyInfoContainerProps: { sx = {}, ...storyInfoContainerProps } = {},
}: LayoutInfoDecoratorProps) => (
  <StoryInfoDecorator
    storyInfo={LayoutInfo}
    disabled={disabled}
    storyInfoContainerProps={{
      sx: ({ palette, breakpoints }) => ({
        [`& ${typographyClasses.subtitle1}`]: {
          [breakpoints.down("md")]: { fontSize: "0.9rem" },
          "& > svg": {
            verticalAlign: "middle",
            margin: "-0.1rem 0.35rem 0 0",
          },
          "& > p": {
            margin: 0,
            fontStyle: "italic",
            [breakpoints.down("md")]: { fontSize: "0.75rem" },
          },
          "& svg,i": {
            color: palette.secondary.main,
          },
        },
        ...sx,
      }),
      ...storyInfoContainerProps,
    }}
  >
    {children}
  </StoryInfoDecorator>
);

type LayoutInfoDecoratorProps = Omit<StoryInfoDecoratorProps, "storyInfo">;

/**
 * This `decorator` wraps a `Story` in a component that displays a message
 * indicating that the component is layout-dependent, and invites the user
 * to change the viewport and/or userAgent using the toolbar.
 */
export const withLayoutInfoDecorator: DecoratorFunction<ReactRenderer> = (
  storyFn,
  { viewMode }
) => <LayoutInfoDecorator disabled={viewMode === "docs"}>{storyFn()}</LayoutInfoDecorator>;
