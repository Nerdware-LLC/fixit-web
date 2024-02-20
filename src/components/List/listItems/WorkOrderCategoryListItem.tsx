import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { type ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemIcon, { type ListItemIconProps } from "@mui/material/ListItemIcon";
import ListItemText, { type ListItemTextProps } from "@mui/material/ListItemText";
import { WO_CATEGORY_ICONS_JSX } from "@/components/Icons/WorkOrderCategoryIcon";
import { capitalize } from "@/utils/formatters/strings";
import type { WorkOrderCategory } from "@/graphql/types";
import type { Simplify } from "type-fest";

export const WorkOrderCategoryListItem = ({
  category,
  icon,
  ListItemIconProps = {},
  ListItemTextProps = {},
  divider = true,
  ...listItemProps
}: WorkOrderCategoryListItemProps) => (
  <ListItem divider={divider} {...listItemProps}>
    <WorkOrderCategoryListItemContent
      category={category}
      icon={icon}
      {...ListItemIconProps}
      {...ListItemTextProps}
    />
  </ListItem>
);

export const WorkOrderCategoryListItemButton = ({
  category,
  icon,
  ListItemIconProps = {},
  ListItemTextProps = {},
  divider = true,
  ...listItemButtonProps
}: WorkOrderCategoryListItemButtonProps) => (
  <ListItemButton divider={divider} {...listItemButtonProps}>
    <WorkOrderCategoryListItemContent
      category={category}
      icon={icon}
      {...ListItemIconProps}
      {...ListItemTextProps}
    />
  </ListItemButton>
);

export const WorkOrderCategoryListItemContent = ({
  category,
  icon,
  ListItemIconProps: { style: listItemIconStyle = {}, ...listItemIconProps } = {},
  ListItemTextProps: { primaryTypographyProps = {}, ...listItemTextProps } = {},
}: WorkOrderCategoryListItemContentProps) => (
  <>
    {icon && (
      <ListItemIcon
        style={{
          minWidth: "2.5rem",
          ...listItemIconStyle,
        }}
        {...listItemIconProps}
      >
        {icon === true ? WO_CATEGORY_ICONS_JSX[category] : icon}
      </ListItemIcon>
    )}
    <ListItemText
      primary={capitalize(category)}
      primaryTypographyProps={{
        fontWeight: icon ? "normal" : "bold",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...primaryTypographyProps,
      }}
      {...listItemTextProps}
    />
  </>
);

export type WorkOrderCategoryListItemProps = Simplify<
  WorkOrderCategoryListItemContentProps & Omit<ListItemProps, "children">
>;

export type WorkOrderCategoryListItemButtonProps = Simplify<
  WorkOrderCategoryListItemContentProps & Omit<ListItemButtonProps, "children">
>;

type WorkOrderCategoryListItemContentProps = {
  category: WorkOrderCategory;
  /**
   * - If `icon` is `true` (default), the default icon for the `category` will be displayed.
   * - If `icon` is `false`/`null`/`undefined`, no icon will be displayed.
   * - If `icon` is a `React.ReactNode`, that node will be displayed as the icon.
   */
  icon?: React.ReactNode;
  ListItemIconProps?: Omit<ListItemIconProps, "children">;
  ListItemTextProps?: Omit<ListItemTextProps, "primary">;
};
