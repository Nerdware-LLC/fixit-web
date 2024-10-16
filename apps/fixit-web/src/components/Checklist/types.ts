/**
 * The base checklist-item type used by checklist components.
 */
export interface BaseChecklistItemType {
  id: string | null;
  description: string;
  isCompleted: boolean;
}

/**
 * The base checklist type used by checklist components.
 */
export type BaseChecklistType = Array<BaseChecklistItemType>;

/**
 * A function that renders a checklist-item.
 */
export type RenderChecklistItemFn<
  ItemType extends BaseChecklistItemType,
  ItemProps extends BaseRenderedChecklistItemProps | undefined = undefined,
> = (checklistItemRenderProps: {
  item: ItemType;
  index: number;
  numItems: number;
  itemProps: ItemProps;
}) => JSX.Element;

/**
 * The base type for props passed to components rendered by a
 * {@link RenderChecklistItemFn|`renderChecklistItem` function}.
 */
export type BaseRenderedChecklistItemProps = Record<string, unknown>;
