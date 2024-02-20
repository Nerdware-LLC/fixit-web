import { styled } from "@mui/material/styles";
import Chip, { chipClasses, type ChipProps } from "@mui/material/Chip";

/**
 * A Mui `Chip` which is always at least as wide as its contents (label + icon).
 */
export const StyledChip = styled(Chip)({
  minWidth: "fit-content",
  [`& > .${chipClasses.label}`]: {
    width: "min-content",
  },
});

export type StyledChipProps = ChipProps;
