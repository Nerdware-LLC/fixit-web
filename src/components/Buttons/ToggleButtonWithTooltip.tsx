import { forwardRef, type ForwardedRef } from "react";
import ToggleButton, { type ToggleButtonProps } from "@mui/material/ToggleButton";
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";

export type ToggleButtonWithTooltipProps = {
  TooltipProps: Omit<TooltipProps, "children">;
} & ToggleButtonProps;

/**
 * Mui ToggleButton forwardRef-wrapped by Mui Tooltip.
 */
export const ToggleButtonWithTooltip = forwardRef(
  (
    { TooltipProps, ...toggleButtonProps }: ToggleButtonWithTooltipProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Tooltip {...TooltipProps}>
        <ToggleButton ref={ref} {...toggleButtonProps} />
      </Tooltip>
    );
  }
);
