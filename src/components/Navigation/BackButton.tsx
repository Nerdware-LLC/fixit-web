import { useNavigate, type To } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";

/**
 * A button to navigate back to the previous page.
 *
 * - An explicit `to` prop will override the default behavior of using the browser's
 *   history.
 */
export const BackButton = ({
  to = "-1",
  label,
  children = "Back",
  icon = false,
  tooltip = "Go back to the previous page",
  tooltipProps = {},
  ...props
}: BackButtonProps) => {
  const nav = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    nav(to);
  };

  return (
    <Tooltip title={tooltip} {...tooltipProps}>
      {icon === true ? (
        <IconButton onClick={handleClick} {...props}>
          <ArrowBackIcon />
        </IconButton>
      ) : (
        <Button onClick={handleClick} variant="text" style={{ fontWeight: "normal" }} {...props}>
          {label ?? children}
        </Button>
      )}
    </Tooltip>
  );
};

export type BackButtonProps = Omit<ButtonProps, "onClick"> & {
  to?: To;
  label?: string;
  icon?: boolean;
  tooltip?: string;
  tooltipProps?: Omit<TooltipProps, "title" | "children">;
};
