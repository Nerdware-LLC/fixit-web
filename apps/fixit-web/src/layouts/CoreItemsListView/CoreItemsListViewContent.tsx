import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { DataGrid, dataGridClassNames, type DataGridProps } from "@/components/DataGrid";
import {
  VirtualizedList,
  ListFooter,
  listClassNames,
  type VirtualizedListProps,
} from "@/components/List";
import { getTabPanelA11yProps } from "@/components/Tabs/helpers.js";
import {
  CoreContentViewLayout,
  coreContentViewLayoutClassNames,
  type CoreContentViewLayoutProps,
} from "@/layouts/CoreContentViewLayout";
import {
  listViewSettingsStore,
  type ListViewSettingsStoreKey,
} from "@/stores/listviewSettingsStore.js";
import { ListHeader, MobileListHeaderTabs } from "./ListHeader";
import { ListViewHeaderToggleButtons } from "./ListViewHeaderToggleButtons.jsx";
import { coreItemsListViewClassNames as listViewClassNames } from "./classNames.js";
import { LIST_VIEW_MODES, type ListViewListName } from "./types.js";
import type { ListViewAppPath } from "@/routes/appPaths.js";
import type { GridEventListener, GridValidRowModel } from "@mui/x-data-grid";

/**
 * Provides common styles/props/logic to all core-item list views.
 */
export const CoreItemsListViewContent = <
  ListItemType extends Record<string, unknown>,
  DataGridItemType extends GridValidRowModel = ListItemType,
>({
  // TABLE/DataGrid PROPS:
  tableProps,
  // LIST/VirtualizedList PROPS:
  lists,
  renderItem,
  virtualizedListProps = {},
  // HEADER-RELATED PROPS:
  headerLabel,
  itemViewBasePath,
  headerComponents,
  listViewSettingsStoreKey,
  ...containerProps
}: CoreItemsListViewContentProps<ListItemType, DataGridItemType>) => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();
  const { viewMode, listVisibility } =
    listViewSettingsStore[listViewSettingsStoreKey].useSubToStore();

  const tryNavToItemView = ({ itemID }: { itemID?: string | number }) => {
    if (itemID) nav(`${itemViewBasePath}/${encodeURIComponent(itemID)}`);
  };

  const handleClickDataGridRow: GridEventListener<"rowClick"> = ({ id }) => {
    tryNavToItemView({ itemID: id });
  };

  const handleClickListItem = (event: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => {
    const { itemId: itemID } = event.currentTarget.dataset;
    tryNavToItemView({ itemID });
  };

  const numVisibleLists = listVisibility
    ? Object.values(listVisibility).filter((isVisible) => isVisible).length
    : 1;

  const showMobileListHeaderTabs =
    isMobilePageLayout &&
    viewMode === LIST_VIEW_MODES.LIST &&
    lists.length > 1 &&
    listViewSettingsStoreKey !== "contacts"; /* <-- This last condition is implied by
      `lists.length > 1`, but is included to help TS narrow `listViewSettingsStoreKey`.
      Without this, TS complains when the key is passed to MobileListHeaderTabs.  */

  return (
    <StyledCoreContentViewLayout
      className={listViewClassNames.root}
      headerLabel={headerLabel}
      headerComponents={
        <>
          <ListViewHeaderToggleButtons
            listViewSettingsStoreKey={listViewSettingsStoreKey}
            isMobilePageLayout={isMobilePageLayout}
          />
          {headerComponents}
        </>
      }
      {...containerProps}
    >
      <Box className={listViewClassNames.contentContainer}>
        <DataGrid<DataGridItemType>
          rowDataItemName={headerLabel}
          onRowClick={handleClickDataGridRow}
          style={{ display: viewMode === LIST_VIEW_MODES.TABLE ? "flex" : "none" }}
          logLevel={false} // silences "invalid height/width" err msg caused by display: none
          {...tableProps}
        />
        {showMobileListHeaderTabs && (
          <MobileListHeaderTabs listViewSettingsStoreKey={listViewSettingsStoreKey} />
        )}
        {lists.map(({ listName, items, listComponentProps = {} }, index) => (
          <Fragment key={`lists-container:${listName ?? "list"}`}>
            {index === 1 && (
              <Divider
                className={listViewClassNames.listsDivider}
                orientation="vertical"
                variant="middle"
                style={{
                  display:
                    numVisibleLists < 2 || isMobilePageLayout || viewMode === LIST_VIEW_MODES.TABLE
                      ? "none"
                      : "block",
                }}
              />
            )}
            <Box
              className={listViewClassNames.listContainer}
              style={{
                display:
                  (listVisibility && (!listName || !listVisibility[listName])) ||
                  viewMode === LIST_VIEW_MODES.TABLE
                    ? "none"
                    : "flex",
                // MobileListHeaderTabs uses position absolute, so add padding to account for its size
                paddingTop: showMobileListHeaderTabs ? "3rem" : 0,
              }}
              // a11y props for MobileListHeaderTabs (in which case this Box is a TabPanel):
              {...(listName && showMobileListHeaderTabs && getTabPanelA11yProps(listName))}
            >
              {listName && !showMobileListHeaderTabs && <ListHeader listName={listName} />}
              <VirtualizedList
                components={{ Footer: ListFooter as React.ComponentType }}
                componentProps={listComponentProps}
                totalCount={items.length}
                itemContent={(index) =>
                  renderItem({
                    item: items[index],
                    onClick: handleClickListItem,
                    ...(!!listName && { listName }),
                  })
                }
                {...virtualizedListProps}
              />
            </Box>
          </Fragment>
        ))}
      </Box>
    </StyledCoreContentViewLayout>
  );
};

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme: { variables } }) => ({
  [`& .${coreContentViewLayoutClassNames.childrenContainer}`]: {
    paddingBottom: 0,
  },

  "& *": {
    whiteSpace: "nowrap",
  },

  // CONTENT CONTAINER:
  [`& .${listViewClassNames.contentContainer}`]: {
    position: "relative",
    height: "100%",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    [`& .${dataGridClassNames.root}`]: {
      height: variables.isMobilePageLayout ? "calc( 100% - 5rem )" : "calc( 100% - 7rem )",
      marginBottom: "1rem !important",
    },

    [`& > hr.${listViewClassNames.listsDivider}`]: {
      height: "auto",
      alignSelf: "stretch",
      minWidth: "1px",
      margin: "0 clamp(0.5rem, 1.5%, 1rem)",
    },

    [`& > .${listViewClassNames.listContainer}`]: {
      flexGrow: 1,
      width: variables.isMobilePageLayout ? "100%" : "50%",
      flexDirection: "column",
      minHeight: "50vh",

      [`& .${listClassNames.virtualizedList.emptyPlaceHolderComponent.root}`]: {
        height: "95%", // prevents scrollbar from appearing
      },
    },
  },
}));

export type CoreItemsListViewContentProps<
  ListItemType extends Record<string, unknown>,
  DataGridItemType extends GridValidRowModel = ListItemType,
> = {
  // TABLE/DataGrid PROPS:
  tableProps: Omit<
    DataGridProps<DataGridItemType>,
    "rowDataItemName" | "onRowClick" | "style" | "logLevel"
  >;
  // LIST/VirtualizedList PROPS:
  lists: Array<{
    listName?: ListViewListName;
    items: Array<ListItemType>;
    listComponentProps?: VirtualizedListProps["componentProps"];
  }>;
  renderItem: ListViewRenderItemFn<ListItemType>;
  virtualizedListProps?: Omit<
    VirtualizedListProps,
    "components" | "componentProps" | "totalCount" | "itemContent"
  >;
  // HEADER-RELATED PROPS:
  headerLabel: Exclude<CoreContentViewLayoutProps["headerLabel"], undefined>; // made required
  headerComponents?: CoreContentViewLayoutProps["headerComponents"]; // made optional
  itemViewBasePath: ListViewAppPath;
  listViewSettingsStoreKey: ListViewSettingsStoreKey;
} & Pick<React.ComponentProps<typeof StyledCoreContentViewLayout>, "style" | "sx">;

/**
 * A function used by `VirtualizedList` to render a list item.
 */
export type ListViewRenderItemFn<ListItemType extends Record<string, unknown>> = ({
  item,
  onClick,
  listName,
}: {
  item: ListItemType;
  onClick?: React.MouseEventHandler<HTMLLIElement | HTMLDivElement>;
  listName?: ListViewListName;
}) => React.ReactNode;
