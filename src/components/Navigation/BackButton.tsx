import { useNavigate } from "react-router-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";

/**
 * A button to navigate back to the previous page.
 */
export const BackButton = ({
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
    nav(-1);
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
  label?: string;
  icon?: boolean;
  tooltip?: string;
  tooltipProps?: Omit<TooltipProps, "title" | "children">;
};
