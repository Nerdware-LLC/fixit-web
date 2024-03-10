import { styled } from "@mui/material/styles";
import Text, { type TypographyProps } from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmptyCheckBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { checklistClassNames } from "./classNames";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Simplify } from "type-fest";
import type { BaseChecklistItemType } from "./types";

/**
 * A component for displaying a single checklist item's `description` and `isCompleted` values.
 *
 * > Use in `renderChecklistItem` prop of `Checklist` components.
 */
export const ChecklistItem = <ItemType extends BaseChecklistItemType>({
  item: { id: checklistItemID, isCompleted, description },
  iconProps = {},
  textProps = {},
  ...listItemProps
}: CheckListItemProps<ItemType>) => (
  <StyledLI key={checklistItemID} className={checklistClassNames.itemRoot} {...listItemProps}>
    {isCompleted ? (
      <CheckBoxIcon color="success" {...iconProps} />
    ) : (
      <EmptyCheckBoxIcon {...iconProps} />
    )}
    <Text {...textProps}>{description}</Text>
  </StyledLI>
);

const StyledLI = styled("li")(({ theme: { palette } }) => ({
  width: "100%",
  padding: "0.9rem 0",
  display: "flex",
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: palette.divider,
  "&:last-of-type": {
    borderWidth: 0,
  },
  "& > svg": {
    marginRight: "1rem",
  },
}));

export type CheckListItemProps<ItemType extends BaseChecklistItemType> = Simplify<
  {
    item: ItemType;
    iconProps?: SvgIconProps;
    textProps?: Omit<TypographyProps, "children">;
  } & Omit<React.ComponentProps<"li">, "children" | "className">
>;
