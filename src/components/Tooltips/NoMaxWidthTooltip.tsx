import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, type TooltipProps } from "@mui/material/Tooltip";

/**
 * A Mui `Tooltip` with no max-width.
 *
 * Source: https://mui.com/material-ui/react-tooltip/#variable-width
 */
export const NoMaxWidthTooltip = styled(({ className, ...tooltipProps }: TooltipProps) => (
  <Tooltip classes={{ popper: className }} {...tooltipProps} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

export type NoMaxWidthTooltipProps = Omit<TooltipProps, "classes">;
