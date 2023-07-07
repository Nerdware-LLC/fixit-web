import React from "react";
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineSharp";
import { helpInfoClassNames as classNames } from "./classNames";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export const HelpInfoIcon = ({
  tooltip,
  color = "info",
  style = {},
  tooltipProps = {},
  iconProps = {},
}: HelpInfoIconProps) => (
  <Tooltip title={tooltip} arrow enterTouchDelay={0} {...tooltipProps}>
    <HelpOutlineIcon
      color={color}
      style={{ fontSize: "1.25rem", opacity: 0.85, ...style }}
      className={classNames.helpInfoIcon}
      {...iconProps}
    />
  </Tooltip>
);

export type HelpInfoIconProps = {
  tooltip: React.ReactNode;
  color?: SvgIconProps["color"];
  style?: SvgIconProps["style"];
  tooltipProps?: Omit<TooltipProps, "title" | "children">;
  iconProps?: Omit<SvgIconProps, "color" | "style">;
};
