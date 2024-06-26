import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/List";
import { globalClassNames } from "@/app/GlobalStyles/classNames.js";
import { checklistClassNames } from "./classNames.js";
import type {
  BaseChecklistItemType,
  BaseRenderedChecklistItemProps,
  RenderChecklistItemFn,
} from "./types.js";

/**
 * This Checklist component renders an array of checklist-items along with a list header and footer.
 * It is designed with the following goals in mind:
 *
 * - UI: Provide a solid base checklist UI that's simple, intuitive, and responsive.
 * - Flexibility: Allow the caller to define their own item, header, and footer components.
 * - Consistency: Provide a generally consistent layout / look and feel.
 * - Deduplication: Provide common typings and a consistent component interface.
 * - Accessibility: Address common a11y concerns (see below).
 *
 * `a11y` note: The ul element in this component uses `list-style-type: none` by default, which
 * currently causes Safari browsers to not recognize the ul as a list. To address this a11y issue,
 * the recommended fix of providing the ul with an explicit `role="list"` has been implemented, and
 * the relevant ESLint rule has been silenced (jsx-a11y/no-redundant-roles).
 *
 * Docs regarding this issue and the relevant fix:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns
 *
 * @template ChecklistItemType - The type of items in `checklistItems` (can be inferred).
 */
export const Checklist = <
  ChecklistItemType extends BaseChecklistItemType,
  ItemProps extends BaseRenderedChecklistItemProps | undefined,
>({
  checklistItems,
  renderChecklistItem,
  headerTitle = "Checklist",
  headerComponents,
  footerComponents,
  itemProps = {},
  ...containerProps
}: ChecklistProps<ChecklistItemType, ItemProps>) => (
  <StyledDiv
    className={checklistClassNames.root}
    hasFooterComponents={!!footerComponents}
    {...containerProps}
  >
    <div className={checklistClassNames.header}>
      <ListIcon className={checklistClassNames.headerIcon} />
      <Text className={checklistClassNames.headerTitle}>{headerTitle}</Text>
      {headerComponents}
    </div>
    {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
    <ul
      role="list" // see jsdoc for details on why this is needed
      className={[
        checklistClassNames.scrollableListContainer,
        globalClassNames.scrollbar.forceShowPaperBG,
      ].join(" ")}
    >
      {checklistItems.map((item, index) =>
        renderChecklistItem({
          item,
          index,
          numItems: checklistItems.length,
          itemProps: itemProps as ItemProps,
        })
      )}
    </ul>
    <div className={checklistClassNames.footer}>{footerComponents}</div>
  </StyledDiv>
);

const StyledDiv = styled("div", {
  shouldForwardProp: (propName) => propName !== "hasFooterComponents",
})<{ hasFooterComponents: boolean }>(({ theme: { palette }, hasFooterComponents = false }) => {
  const headerHeight = "3.5rem";
  const footerHeight = hasFooterComponents ? "3.5rem" : "1rem";
  const scrollableListContainerHeight = `calc( 100% - (${headerHeight} + ${footerHeight}))`;

  return {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: "0.35rem",
    backgroundColor: palette.background.paper,
    ...(palette.mode === "light" && {
      border: `1px solid ${palette.divider}`,
    }),

    // HEADER
    [`& > .${checklistClassNames.header}`]: {
      height: headerHeight,
      maxHeight: headerHeight,
      width: "100%",
      padding: "1rem 0.75rem 1rem 1rem", // a little less m-r so the IconButton looks aligned w textfields
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "0.35rem",
      borderWidth: "1px",
      borderRadius: "0.35rem 0.35rem 0 0",
      backgroundColor: `rgba(0,0,0, ${palette.mode === "dark" ? "0.1" : "0.05"})`,
    },

    // SCROLLABLE LIST CONTAINER
    [`& > .${checklistClassNames.scrollableListContainer}`]: {
      height: scrollableListContainerHeight,
      maxHeight: scrollableListContainerHeight,
      width: "100%",
      listStyle: "none", // override ul default
      margin: 0, //         override ul default
      padding: "0.5rem 1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      overflowX: "hidden",
      overflowY: "auto",
      borderWidth: "1px 0 1px 0",
      borderStyle: "solid",
      borderColor: palette.divider,
    },

    // FOOTER
    [`& > .${checklistClassNames.footer}`]: {
      height: footerHeight,
      maxHeight: footerHeight,
      width: "100%",
      padding: "0.5rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: `rgba(0,0,0, ${palette.mode === "dark" ? "0.1" : "0.05"})`,
      borderRadius: "0 0 0.35rem 0.35rem",
    },
  };
});

export type ChecklistProps<
  ChecklistItemType extends BaseChecklistItemType,
  ItemProps extends BaseRenderedChecklistItemProps | undefined = undefined,
> = {
  checklistItems: Array<ChecklistItemType>;
  renderChecklistItem: RenderChecklistItemFn<ChecklistItemType, ItemProps>;
  headerTitle?: React.ReactNode;
  headerComponents?: React.ReactNode;
  footerComponents?: React.ReactNode;
  /** Any additional props to pass to each checklist item component. */
  itemProps?: ItemProps;
} & Omit<React.ComponentProps<typeof StyledDiv>, "hasFooterComponents">;
