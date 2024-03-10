import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineSharp";
import { dataDisplayClassNames } from "./classNames";
import type { SvgIconProps } from "@mui/material/SvgIcon";

/**
 * Displays a help icon with a `tooltip` on hover.
 */
export const HelpInfoIcon = ({
  color = "info",
  style = {},
  className = "",
  tooltip,
  tooltipProps = {},
  ...iconProps
}: HelpInfoIconProps) => (
  <Tooltip title={tooltip} enterTouchDelay={0} {...tooltipProps}>
    <HelpOutlineIcon
      color={color}
      style={{ fontSize: "1.25rem", opacity: 0.85, ...style }}
      className={dataDisplayClassNames.helpInfoIcon + " " + className}
      {...iconProps}
    />
  </Tooltip>
);

export type HelpInfoIconProps = {
  tooltip: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, "title" | "children">;
} & SvgIconProps;
