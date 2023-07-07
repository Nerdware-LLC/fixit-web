import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import Autocomplete, { type AutocompleteProps } from "@mui/material/Autocomplete";

/**
 * Mui Autocomplete with grid sx props. Usage example:
 *
 * ```
 * <StyledAutoComplete gridArea="top-left" {...otherProps} />
 * ```
 */
export const StyledAutoComplete = styled(Autocomplete, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as <
  OptionType,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>(
  props: StyledAutoCompleteProps<OptionType, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement;

export type StyledAutoCompleteProps<
  OptionType,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = AutocompleteProps<OptionType, Multiple, DisableClearable, FreeSolo> & MuiGridSxProps;
