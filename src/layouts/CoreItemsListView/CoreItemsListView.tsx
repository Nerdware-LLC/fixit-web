import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { listViewSettingsStore, type ListViewSettingsStoreKey } from "@cache/listviewSettingsStore";
import { DataGrid, dataGridClassNames, type DataGridProps } from "@components/DataGrid";
import {
  EmptyDataGridFallback,
  type EmptyDataGridFallbackProps,
} from "@components/DataGrid/EmptyDataGridFallback";
import {
  CoreContentViewLayout,
  coreContentViewLayoutClassNames as ccvlClassNames,
} from "@layouts/CoreContentViewLayout";
import { ListHeader, MobileListHeaderTabs, listViewTabPanelA11yProps } from "./ListHeader";
import { ListViewHeaderToggleButtons } from "./ListViewHeaderToggleButtons";
import { VirtualizedMuiList } from "./VirtualizedMuiList";
import { coreItemsListViewClassNames as classNames } from "./classNames";
import type { GridEventListener } from "@mui/x-data-grid";
import type { OverrideProperties } from "type-fest";
import type { ListViewHeader, CoreItemsListConfig, ListViewRenderItemFn } from "./types";

/**
 * Provides common styles/props/logic to all core-item list views.
 */
export const CoreItemsListView = ({
  // list props:
  lists,
  renderItem,
  tableProps: { noRowsOverlayProps, ...tableProps },
  // header props:
  listViewSettingsStoreKey,
  headerComponents,
  viewHeader,
  viewBasePath,
  ...containerProps
}: CoreItemsListViewProps) => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();
  const { listOrTable, listVisibility = null } =
    listViewSettingsStore[listViewSettingsStoreKey].useSubToStore();

  const tryNavToItemView = ({ itemID }: { itemID?: string }) => {
    if (typeof itemID === "string") nav(`${viewBasePath}/${encodeURIComponent(itemID)}`);
  };

  const handleClickDataGridRow: GridEventListener<"rowClick"> = ({ id }) => {
    tryNavToItemView({ itemID: id as string });
  };

  const handleClickListItem = (event: React.MouseEvent<HTMLDivElement & HTMLLIElement>) => {
    const { itemId: itemID } = event.currentTarget.dataset;
    tryNavToItemView({ itemID });
  };

  const numVisibleLists = listVisibility
    ? Object.values(listVisibility).filter((isVisible) => isVisible).length
    : 1;

  const showMobileListHeaderTabs = listOrTable === "LIST" && isMobilePageLayout && lists.length > 1;

  return (
    <StyledCoreContentViewLayout
      className={classNames.root}
      headerLabel={viewHeader}
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
      <Box className={classNames.contentContainer}>
        <DataGrid
          onRowClick={handleClickDataGridRow}
          style={{ display: listOrTable === "TABLE" ? "flex" : "none" }}
          logLevel={false} // silences "invalid height/width" err msg caused by display: none
          slots={{
            noRowsOverlay: () => (
              <EmptyDataGridFallback
                nameOfMissingItems={viewHeader}
                backgroundIcon={noRowsOverlayProps.backgroundIcon}
              >
                {noRowsOverlayProps.children}
              </EmptyDataGridFallback>
            ),
          }}
          slotProps={{
            toolbar: {
              csvOptions: {
                fileName: `Fixit_${viewHeader}_${new Date().toLocaleString()}`
                  .replace(/\s/g, "_") // convert spaces to underscores
                  .replace(/,/g, ""), // rm the comma in toLocaleString output
              },
            },
          }}
          {...tableProps}
        />
        {showMobileListHeaderTabs && (
          <MobileListHeaderTabs listViewSettingsStoreKey={listViewSettingsStoreKey} />
        )}
        {lists.map(({ listName, items, emptyListFallback }, index) => (
          <React.Fragment key={`lists-container${listName && `:${listName}`}`}>
            {index === 1 && (
              <Divider
                className={classNames.listsDivider}
                orientation="vertical"
                variant="middle"
                style={{
                  display:
                    numVisibleLists < 2 || isMobilePageLayout || listOrTable === "TABLE"
                      ? "none"
                      : "block",
                }}
              />
            )}
            <Box
              className={classNames.listContainer}
              style={{
                display:
                  (listVisibility && (!listName || !listVisibility?.[listName])) ||
                  listOrTable === "TABLE"
                    ? "none"
                    : "flex",
                // MobileListHeaderTabs uses position absolute, so add padding to account for its size
                paddingTop: showMobileListHeaderTabs ? "3rem" : 0,
              }}
            >
              {listName && !showMobileListHeaderTabs && <ListHeader listName={listName} />}
              {items.length > 0 ? (
                <VirtualizedMuiList
                  className={classNames.list}
                  totalCount={items.length}
                  itemContent={(index) =>
                    renderItem({
                      item: items[index],
                      onClick: handleClickListItem,
                      ...(!!listName && { listName }),
                    })
                  }
                  // a11y props for ListHeader mobile tabs:
                  {...(listName && isMobilePageLayout && listViewTabPanelA11yProps[listName])}
                />
              ) : (
                emptyListFallback
              )}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </StyledCoreContentViewLayout>
  );
};

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme: { variables } }) => ({
  [`& .${ccvlClassNames.childrenContainer}`]: {
    paddingBottom: 0,
  },

  "& *": {
    whiteSpace: "nowrap",
  },

  // CONTENT CONTAINER:

  [`& .${classNames.contentContainer}`]: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    [`& .${dataGridClassNames.root}`]: {
      height: variables.isMobilePageLayout ? "calc( 100% - 5rem )" : "calc( 100% - 7rem )",
      marginBottom: "1rem !important",
    },

    [`& > hr.${classNames.listsDivider}`]: {
      height: "auto",
      alignSelf: "stretch",
      minWidth: "1px",
      margin: "0 clamp(0.5rem, 1.5%, 1rem)",
    },

    [`& > .${classNames.listContainer}`]: {
      flexGrow: 1,
      width: variables.isMobilePageLayout ? "100%" : "50%",
      flexDirection: "column",
    },
  },
}));

export type CoreItemsListViewProps = {
  lists: Array<CoreItemsListConfig>;
  renderItem: ListViewRenderItemFn;
  tableProps: OverrideProperties<
    DataGridProps,
    { slots?: Omit<NonNullable<DataGridProps["slots"]>, "noRowsOverlay"> }
  > & {
    noRowsOverlayProps: {
      backgroundIcon: EmptyDataGridFallbackProps["backgroundIcon"];
      children?: React.ReactNode;
    };
  };
  listViewSettingsStoreKey: ListViewSettingsStoreKey;
  headerComponents?: React.ReactNode; // made optional
  viewHeader: ListViewHeader;
  viewBasePath: string;
} & Omit<
  React.ComponentProps<typeof StyledCoreContentViewLayout>,
  "children" | "listOrTable" | "headerComponents"
>;
