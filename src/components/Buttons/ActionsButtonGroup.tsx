import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup, { type ButtonGroupProps } from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 * A Mui ButtonGroup which will render a drop-down menu when more than one
 * option is provided to the `options` prop.
 *
 * - The "primary" option is rendered as a regular button next to the drop-down
 *   icon button.
 * - Set any option as the "primary" option via the `isPrimary` key option key.
 * - If no option has `isPrimary: true`, the 0-index option is chosen as the
 *   primary option.
 * - Use the `updatePrimaryOptionOnClick` prop to have a dynamic "primary"
 *   option which updates upon menu-item selection.
 */
export const ActionsButtonGroup = ({
  options,
  updatePrimaryOnClick = true,
  variant = "contained",
  ...buttonGroupProps
}: ActionsButtonGroupProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [primaryOptionIndex, setPrimaryOptionIndex] = useState<number>(() =>
    options.reduce((accum, { isPrimary = false }, idx) => (isPrimary ? idx : accum), 0)
  );

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    if (updatePrimaryOnClick) setPrimaryOptionIndex(index);
    options[index].handleClick(event);
    setIsOpen(false);
  };

  const handleClose = (event: Event) => {
    if (!anchorRef.current || !anchorRef.current.contains(event.target as HTMLElement)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} variant={variant} {...buttonGroupProps}>
        <Button onClick={options[primaryOptionIndex].handleClick}>
          {options[primaryOptionIndex].label}
        </Button>
        <Button
          onClick={() => setIsOpen((prevOpen) => !prevOpen)}
          size="small"
          aria-haspopup="menu"
          {...(isOpen && {
            "aria-controls": ariaElementIDs.menu,
            "aria-expanded": "true",
          })}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        style={{ zIndex: 1 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id={ariaElementIDs.menu} autoFocusItem disablePadding>
                  {options.map(({ label, isDisabled = false }, index) => (
                    <MenuItem
                      key={label.replace(/\s/g, "-")}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      selected={index === primaryOptionIndex}
                      disabled={isDisabled}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const ariaElementIDs = {
  menu: "split-actions-button-menu",
};

export type ActionsButtonGroupProps = {
  options: ActionsButtonGroupOptions;
  updatePrimaryOnClick?: boolean;
} & ButtonGroupProps;

export type ActionsButtonGroupOptions = Array<ActionsButtonGroupOption>;
export interface ActionsButtonGroupOption {
  label: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  isPrimary?: boolean;
  isDisabled?: boolean;
}
