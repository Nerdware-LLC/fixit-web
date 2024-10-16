import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Except } from "type-fest";

export const CloseIconButton = ({
  iconProps = {},
  "aria-label": ariaLabel = "close",
  ...iconButtonProps
}: CloseIconButtonProps) => (
  <IconButton aria-label={ariaLabel} {...iconButtonProps}>
    <CloseIcon {...iconProps} />
  </IconButton>
);

export type CloseIconButtonProps = Except<IconButtonProps, "children"> & {
  iconProps?: SvgIconProps;
};
