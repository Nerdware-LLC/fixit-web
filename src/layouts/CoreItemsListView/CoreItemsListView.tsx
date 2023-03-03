import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { usePageLayoutContext } from "@app";
import { CoreContentViewLayout } from "@layouts/CoreContentViewLayout";
import { DataGrid, type GridEventListener, type GridRowParams } from "./DataGrid";
import { VirtualizedMuiList } from "./VirtualizedMuiList";
import { ListViewHeaderToggleButtons } from "./ListViewHeaderToggleButtons";
import { CreateItemButton } from "./CreateItemButton";
import { ListHeader, MobileListHeaderTabs, LIST_TABS_a11y_PROPS } from "./ListHeader";
import type { ListViewHeader, CoreItemsListConfig, ListViewRenderItemFn } from "./types";

/**
 * Provides common styles/props/logic to all core-item list views.
 */
export const CoreItemsListView = ({
  viewHeader,
  viewBasePath,
  lists,
  renderItem,
  tableProps,
  ...containerProps
}: {
  viewHeader: ListViewHeader;
  viewBasePath: string;
  lists: Array<CoreItemsListConfig>;
  renderItem: ListViewRenderItemFn;
  tableProps: React.ComponentProps<typeof DataGrid>;
} & Omit<React.ComponentProps<typeof StyledCoreContentViewLayout>, "children" | "listOrTable">) => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();
  const {
    listOrTable,
    handleChangeListOrTable,
    listVisibility,
    handleChangeListVisibility,
    toggleListVisibility
  } = ListViewHeaderToggleButtons.use({ numLists: lists.length, isMobilePageLayout });

  const handleClickCreateItem = () => nav(`${viewBasePath}/form`);

  // prettier-ignore
  const tryNavToItemView = ({ itemID, isItemOwnedByUser }: { itemID?: string; isItemOwnedByUser?: boolean; }) => {
    if (typeof itemID === "string") {
      nav(`${viewBasePath}/${encodeURIComponent(itemID)}`, {
        ...(typeof isItemOwnedByUser === "boolean" && {
          state: { isItemOwnedByUser }
        })
      });
    }
  };

  const handleClickDataGridRow: GridEventListener<"rowClick"> = ({ id, row }: GridRowParams) => {
    tryNavToItemView({
      itemID: id as string,
      ...(!!row?.isItemOwnedByUser && { isItemOwnedByUser: row.isItemOwnedByUser })
    });
  };

  const handleClickListItem = (event: React.MouseEvent<HTMLDivElement & HTMLLIElement>) => {
    const { itemId: itemID, listName } = event.currentTarget.dataset;
    tryNavToItemView({
      itemID,
      ...(!!listName && { isItemOwnedByUser: listName === "Sent" })
    });
  };

  const numVisibleLists = listVisibility
    ? Object.values(listVisibility).filter((isVisible) => isVisible).length
    : 1;

  const showMobileListHeaderTabs =
    isMobilePageLayout && lists.length > 1 && listVisibility && toggleListVisibility;

  return (
    <StyledCoreContentViewLayout
      className="core-items-list-view-container"
      headerLabel={viewHeader}
      headerComponents={
        <>
          <ListViewHeaderToggleButtons
            listOrTable={listOrTable}
            handleChangeListOrTable={handleChangeListOrTable}
            listVisibility={listVisibility}
            handleChangeListVisibility={handleChangeListVisibility}
            isMobilePageLayout={isMobilePageLayout}
          />
          <CreateItemButton
            handleClickCreateItem={handleClickCreateItem}
            viewHeader={viewHeader}
            isMobilePageLayout={isMobilePageLayout}
          />
        </>
      }
      {...containerProps}
    >
      <Box className="list-view-content-container">
        <DataGrid
          onRowClick={handleClickDataGridRow}
          style={{ display: listOrTable === "TABLE" ? "flex" : "none" }}
          logLevel={false} // silences "invalid height/width" err msg caused by display: none
          componentsProps={{
            toolbar: {
              csvOptions: {
                // TODO this sets the timestamp in the filename to when this RENDERS.
                // See if we can generate the timestamp when PRINT is called instead.
                fileName: `Fixit_${viewHeader}_${new Date().toLocaleString()}`
                  .replace(/\s/g, "_") // convert spaces to underscores
                  .replace(/,/g, "") // rm the comma in toLocaleString output
              }
            }
          }}
          {...tableProps}
        />
        {showMobileListHeaderTabs && (
          <MobileListHeaderTabs
            listVisibility={listVisibility}
            toggleListVisibility={toggleListVisibility}
          />
        )}
        {lists.map(({ listName, items }, index) => (
          <React.Fragment key={`lists-container${listName && `:${listName}`}`}>
            {index === 1 && (
              <Divider
                className="list-view-lists-divider"
                orientation="vertical"
                variant="middle"
                style={{
                  display:
                    numVisibleLists < 2 || isMobilePageLayout || listOrTable === "TABLE"
                      ? "none"
                      : "block"
                }}
              />
            )}
            <Box
              className="list-view-list-container"
              style={{
                display:
                  (listVisibility && (!listName || !listVisibility?.[listName])) ||
                  listOrTable === "TABLE"
                    ? "none"
                    : "flex",
                // MobileListHeaderTabs uses position absolute, so add padding to account for its size
                paddingTop: showMobileListHeaderTabs ? "3rem" : 0
              }}
            >
              {listName && !showMobileListHeaderTabs && <ListHeader listName={listName} />}
              <VirtualizedMuiList
                className="core-items-list"
                totalCount={items.length}
                itemContent={(index) =>
                  renderItem({
                    item: items[index],
                    onClick: handleClickListItem,
                    ...(!!listName && { listName })
                  })
                }
                // a11y props for ListHeader mobile tabs:
                {...(listName && isMobilePageLayout && LIST_TABS_a11y_PROPS[listName].TAB_PANEL)}
              />
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </StyledCoreContentViewLayout>
  );
};

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme }) => ({
  // All ListView text doesn't wrap by default
  "& *": {
    whiteSpace: "nowrap"
  },

  // CONTENT CONTAINER:

  "& .list-view-content-container": {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    "& .MuiDataGrid-root": {
      marginBottom: "1rem !important"
    },

    "& > hr.list-view-lists-divider": {
      height: "auto",
      alignSelf: "stretch",
      minWidth: "1px",
      margin: "0 clamp(0.5rem, 1.5%, 1rem)"
    },

    "& > .list-view-list-container": {
      flexGrow: 1,
      width: theme.variables.isMobilePageLayout ? "100%" : "50%",
      flexDirection: "column"
    }
  }
}));
