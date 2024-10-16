import Text from "@mui/material/Typography";
import { StoryInfoDecorator, type StoryInfoDecoratorProps } from "./StoryInfoDecorator.jsx";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction } from "@storybook/types";

type LayoutInfoDecoratorProps = Omit<StoryInfoDecoratorProps, "storyInfo">;

/**
 * This `decorator` component uses the {@link StoryInfoDecorator} to display a
 * message indicating that the child component is layout-dependent, and invites
 * the user to change the viewport and/or userAgent using the toolbar.
 */
export const LayoutInfoDecorator = ({
  disabled = false,
  children, // <-- the story
}: LayoutInfoDecoratorProps) => (
  <StoryInfoDecorator storyInfo={LayoutInfo} disabled={disabled}>
    {children}
  </StoryInfoDecorator>
);

const LayoutInfo = (
  <Text
    variant="subtitle1"
    sx={({ palette, breakpoints }) => ({
      pointerEvents: "none",
      lineHeight: 1.5,
      [breakpoints.down("md")]: { fontSize: "0.9rem" },
      "& i": { color: palette.secondary.main },
    })}
  >
    This component renders different content depending on the <i>viewport</i> and <i>userAgent</i>
    <p style={{ margin: 0, fontStyle: "italic" }}>
      — try switching between mobile/desktop <i>viewports</i> and <i>userAgents</i> using the
      toolbar.
    </p>
  </Text>
);

/**
 * This `decorator` wraps a `Story` in a component that displays a message
 * indicating that the component is layout-dependent, and invites the user
 * to change the viewport and/or userAgent using the toolbar.
 */
export const withLayoutInfoDecorator: DecoratorFunction<ReactRenderer> = (
  storyFn,
  { viewMode }
) => <LayoutInfoDecorator disabled={viewMode === "docs"}>{storyFn()}</LayoutInfoDecorator>;
