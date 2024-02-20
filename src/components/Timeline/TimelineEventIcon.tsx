import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { timelineClassNames } from "./classNames";
import type { PaletteColorKey } from "@/app/ThemeProvider/palettes";
import type { SvgIconProps } from "@mui/material/SvgIcon";

/**
 * An icon-container for timeline events with a discrete selection of highlight colors that reflect
 * the general state of the event.
 *
 * #### Stateful Highlight Colors:
 *
 * - `"blue"` - The event is complete, inactive, and/or does not require the user's attention.
 * - `"green"` - The event is in progress.
 * - `"yellow"` - The event is upcoming and requires the user's attention.
 * - `"red"` - The event is "past due" and requires the user's attention.
 * - `"secondary"`: The event is "special" in some way, such as a user-created note.
 * - `"primary"`: The event is related to the user's Fixit account, such as a subscription renewal.
 */
export const TimelineEventIcon = ({ icon, iconHighlight, ...boxProps }: TimelineEventIconProps) => (
  <StyledBox
    iconHighlight={iconHighlight}
    className={timelineClassNames.eventIconRoot}
    {...boxProps}
  >
    {icon}
  </StyledBox>
);

/**
 * A map of `iconHighlight` values to {@link PaletteColorKey}s like "primary", "success", etc.
 */
const ICON_HIGHLIGHT_PALETTE_COLOR_KEYS_MAP = {
  primary: "primary",
  secondary: "secondary",
  blue: "info",
  yellow: "warning",
  red: "error",
  green: "success",
} as const satisfies Record<string, PaletteColorKey>;

const StyledBox = styled(Box, {
  shouldForwardProp: (propName) => propName !== "iconHighlight",
})<Pick<TimelineEventIconProps, "iconHighlight">>(({
  theme: { palette },
  iconHighlight = "blue",
}) => {
  const paletteColorKey = ICON_HIGHLIGHT_PALETTE_COLOR_KEYS_MAP[iconHighlight];
  const iconColorBase = palette[paletteColorKey];

  return {
    position: "relative", // necessary for the TimelineEvent connector lines
    width: "2.5rem",
    minWidth: "2.5rem",
    height: "2.5rem",
    flexShrink: 0,
    display: "inline-flex",
    placeContent: "center",
    placeItems: "center",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${iconColorBase.dark} 40%, ${iconColorBase.light})`,
  };
});

/**
 * Props for {@link TimelineEventIcon} styled component.
 *
 * > **This component's child must be an {@link SvgIconProps|`SvgIcon`}.**
 */
export type TimelineEventIconProps = {
  icon: React.ReactElement<SvgIconProps, React.JSXElementConstructor<SvgIconProps>>;
  iconHighlight?: keyof typeof ICON_HIGHLIGHT_PALETTE_COLOR_KEYS_MAP;
} & Omit<BoxProps, "children">;
