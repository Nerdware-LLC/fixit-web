import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/List";
import { globalClassNames } from "@app/GlobalStyles/classNames";
import { checklistClassNames as classNames } from "./classNames";
import type { ChecklistItem, ChecklistItems } from "./types";

/**
 * `a11y` note: The ul element in this component uses `list-style-type: none`
 * by default, which currently causes Safari browsers to not recognize the ul
 * as a list. To address this a11y issue, the recommended fix of providing the
 * ul with an explicit `role="list"` has been implemented, and the relevant
 * ESLint rule has been silenced (jsx-a11y/no-redundant-roles).
 *
 * Docs regarding this issue and the relevant fix:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns
 */
export const Checklist = ({
  checklistItems,
  renderChecklistItem,
  headerTitle = "Checklist",
  headerComponents,
  footerComponents,
  ...containerProps
}: ChecklistProps) => (
  <StyledDiv
    className={classNames.root}
    hasFooterComponents={!!footerComponents}
    {...containerProps}
  >
    <div className={classNames.header}>
      <ListIcon className={classNames.headerIcon} />
      <Text className={classNames.headerTitle}>{headerTitle}</Text>
      {headerComponents}
    </div>
    {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
    <ul
      role="list" // see jsdoc for details on why this is needed
      className={[
        classNames.scrollableListContainer,
        globalClassNames.scrollbarForceShowPaperBG,
      ].join(" ")}
    >
      {checklistItems.map((item, index) =>
        renderChecklistItem({ item, index, numItems: checklistItems.length })
      )}
    </ul>
    <div className={classNames.footer}>{footerComponents}</div>
  </StyledDiv>
);

const StyledDiv = styled("div", {
  shouldForwardProp: (propName) => propName !== "hasFooterComponents",
})<{ hasFooterComponents: boolean }>(({ theme, hasFooterComponents = false }) => {
  const headerHeight = "3.5rem";
  const footerHeight = hasFooterComponents ? "3.5rem" : "1rem";
  const scrollableListContainerHeight = `calc( 100% - (${headerHeight} + ${footerHeight}))`;

  return {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: "0.35rem",
    backgroundColor: theme.palette.background.paper,
    ...(theme.palette.mode === "light" && {
      border: `1px solid ${theme.palette.divider}`,
    }),

    // Header

    [`& > .${classNames.header}`]: {
      height: headerHeight,
      maxHeight: headerHeight,
      width: "100%",
      padding: "1rem 0.75rem 1rem 1rem", // a little less m-r so the IconButton looks aligned w textfields
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: "1px",
      borderRadius: "0.35rem 0.35rem 0 0",
      backgroundColor: `rgba(0,0,0, ${theme.palette.mode === "dark" ? "0.1" : "0.05"})`,

      [`& > .${classNames.headerTitle}`]: {
        marginLeft: "0.35rem", // separates text from ListIcon
        marginTop: "2px", // nudges text down for better vertical alignment
      },
    },

    // Scrollable list container

    [`& > .${classNames.scrollableListContainer}`]: {
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
      borderColor: theme.palette.divider,
    },

    // Footer

    [`& > .${classNames.footer}`]: {
      height: footerHeight,
      maxHeight: footerHeight,
      width: "100%",
      padding: "0.5rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: `rgba(0,0,0, ${theme.palette.mode === "dark" ? "0.1" : "0.05"})`,
      borderRadius: "0 0 0.35rem 0.35rem",
    },
  };
});

export type ChecklistProps = {
  checklistItems: ChecklistItems;
  renderChecklistItem: RenderChecklistItemFn;
  headerTitle?: React.ReactNode;
  headerComponents?: React.ReactNode;
  footerComponents?: React.ReactNode;
} & Omit<React.ComponentProps<typeof StyledDiv>, "hasFooterComponents">;

export type RenderChecklistItemFn = ({
  item,
  index,
  numItems,
}: {
  item: ChecklistItem;
  index: number;
  numItems: number;
}) => JSX.Element;
