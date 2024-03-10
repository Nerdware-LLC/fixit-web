import { useState, useRef } from "react";
import { popperClasses } from "@mui/base/Popper";
import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import ButtonGroup, { type ButtonGroupProps } from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper, { paperClasses } from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 * A Mui ButtonGroup which will render a drop-down menu when more than one option is
 * provided to the `options` prop.
 *
 * - The "primary" option is rendered as a regular button next to the drop-down icon button.
 * - Set any option as the "primary" option via the `isPrimary` key option key.
 * - If no option has `isPrimary: true`, the 0-index option is chosen as the primary option.
 * - Use the `updatePrimaryOptionOnClick` prop to have a dynamic "primary" option which
 *   updates upon menu-item selection.
 */
export const ActionsButtonGroup = ({
  options,
  updatePrimaryOnClick = true,
  variant = "contained",
  ...buttonGroupProps
}: ActionsButtonGroupProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [primaryOptionIndex, setPrimaryOptionIndex] = useState<number>(() =>
    options.reduce((accum, { isPrimary = false }, idx) => (isPrimary ? idx : accum), 0)
  );

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
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
      <StyledButtonGroup ref={anchorRef} variant={variant} isOpen={isOpen} {...buttonGroupProps}>
        <Button onClick={options[primaryOptionIndex].handleClick} style={{ flexGrow: 1 }}>
          {options[primaryOptionIndex].label}
        </Button>
        <Button
          onClick={() => setIsOpen((prevOpen) => !prevOpen)}
          aria-label="ButtonGroup popup menu button"
          size="small"
          aria-haspopup="menu"
          {...(isOpen && {
            "aria-controls": elementIDs.menu,
            "aria-expanded": "true",
          })}
        >
          <ArrowDropDownIcon />
        </Button>
      </StyledButtonGroup>
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
                <MenuList id={elementIDs.menu} autoFocusItem disablePadding>
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

const elementIDs = {
  menu: "split-actions-button-menu",
} as const;

const StyledButtonGroup = styled(ButtonGroup, {
  shouldForwardProp: (propName: string) => propName !== "isOpen",
})<{ isOpen?: boolean }>(({ isOpen }) => ({
  /* All of the border-radius changes below ensure there is no visible gap where the
  corners of the ButtonGroup and the Popper meet (by default they're all rounded).*/

  // The larger "primary" button:
  [`& > .${buttonClasses.sizeMedium}`]: {
    flexGrow: 1,
    ...(isOpen && { borderBottomLeftRadius: 0 }),
  },

  // The smaller dropdown/caret button:
  [`& > .${buttonClasses.sizeSmall}`]: {
    ...(isOpen && { borderBottomRightRadius: 0 }),
  },

  // Popper sibling (shown when isOpen is true):
  [`& + .${popperClasses.root}`]: {
    [`& > .${paperClasses.root}`]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
}));

export type ActionsButtonGroupProps = {
  options: ActionsButtonGroupOptions;
  updatePrimaryOnClick?: boolean;
} & React.ComponentProps<typeof StyledButtonGroup> &
  Pick<ButtonGroupProps, "variant" | "style">;

export type ActionsButtonGroupOptions = Array<ActionsButtonGroupOption>;
export interface ActionsButtonGroupOption {
  label: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  isPrimary?: boolean;
  isDisabled?: boolean;
}
