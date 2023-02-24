import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Text from "@mui/material/Typography";
import PlusIcon from "@mui/icons-material/ControlPoint";
import { CoreContentViewLayout } from "@layouts/CoreContentViewLayout";
import { DataGrid, type GridEventListener, type GridRowParams } from "./DataGrid";
import { VirtualizedMuiList } from "./VirtualizedMuiList";
import { ListViewHeaderToggleButtons } from "./ListViewHeaderToggleButtons";
import type { ListViewHeader, CoreItemsListConfig, ListViewRenderItemFn } from "./types";

// TODO On mobile, mv "create-btn" somewhere
// TODO on mobile, ensure DataGrid toolbar btns don't wrap

/**
 * Provides common styles/props/logic to all core-item list views.
 *
 * - **_createItemFormPath_** is an optional prop with a default value of `[viewBasePath]/form`.
 */
export const CoreItemsListView = ({
  viewHeader,
  viewBasePath,
  createItemFormPath = `${viewBasePath}/form`,
  lists,
  renderItem,
  tableProps,
  ...containerProps
}: {
  viewHeader: ListViewHeader;
  viewBasePath: string;
  createItemFormPath?: string;
  lists: Array<CoreItemsListConfig>;
  renderItem: ListViewRenderItemFn;
  tableProps: React.ComponentProps<typeof DataGrid>;
} & Omit<React.ComponentProps<typeof StyledCoreContentViewLayout>, "children" | "listOrTable">) => {
  const nav = useNavigate();
  const { listOrTable, handleChangeListOrTable, listVisibility, handleChangeListVisibility } =
    ListViewHeaderToggleButtons.use(lists.length);

  const handleClickCreateItem = () => nav(createItemFormPath);

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

  return (
    <StyledCoreContentViewLayout
      className="core-items-list-view-container"
      headerLabel={viewHeader}
      headerComponents={
        <Box className="list-view-header-components-container">
          <ListViewHeaderToggleButtons
            listOrTable={listOrTable}
            handleChangeListOrTable={handleChangeListOrTable}
            listVisibility={listVisibility}
            handleChangeListVisibility={handleChangeListVisibility}
          />
          <Button
            onClick={handleClickCreateItem}
            startIcon={<PlusIcon />}
            className="list-view-create-item-button"
          >
            {`Create ${viewHeader.replace(/s$/, "")}`}
          </Button>
        </Box>
      }
      {...containerProps}
    >
      <Box className="list-view-content-container">
        <DataGrid
          onRowClick={handleClickDataGridRow}
          style={{ display: listOrTable === "TABLE" ? "flex" : "none" }}
          componentsProps={{
            toolbar: {
              csvOptions: {
                fileName: `Fixit_${viewHeader}_${new Date().toLocaleString()}`
                  .replace(/\s/g, "_") // convert spaces to underscores
                  .replace(/,/g, "") // rm the comma in toLocaleString output
              }
            }
          }}
          {...tableProps}
        />
        {lists.map(({ listName, items }, index) => (
          <React.Fragment key={`lists-container${listName && `:${listName}`}`}>
            {index === 1 && (
              <Divider
                className="list-view-lists-divider"
                orientation="vertical"
                variant="middle"
                sx={(theme) => ({
                  display:
                    numVisibleLists < 2 ||
                    theme.variables.isMobilePageLayout ||
                    listOrTable === "TABLE"
                      ? "none"
                      : "block"
                })}
              />
            )}
            <Box
              className="list-view-list-container"
              sx={(theme) => ({
                display:
                  (listVisibility && (!listName || !listVisibility?.[listName])) ||
                  (theme.variables.isMobilePageLayout && index > 0) ||
                  listOrTable === "TABLE"
                    ? "none"
                    : "flex"
              })}
            >
              {!!listName && (
                <Text variant="h6" component="h3" className="core-items-list-header">
                  {listName}
                </Text>
              )}
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
              />
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </StyledCoreContentViewLayout>
  );
};

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme }) => ({
  height: "100%",

  // All ListView text doesn't wrap by default
  "& *": {
    whiteSpace: "nowrap"
  },

  // LIST-VIEW HEADER CONTAINER:

  "& > .core-content-view-header-container > .list-view-header-components-container": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    // create item button:
    "& > .list-view-create-item-button": {
      height: "2rem",
      width: "14rem",
      paddingTop: "0.26rem",
      paddingBottom: "0.2rem",
      borderRadius: "1.5rem",
      // startIcon:
      "& svg": {
        marginBottom: "0.12rem"
      }
    }
  },

  // CORE-CONTENT CHILDREN CONTAINER:

  "& > .core-content-view-children-container": {
    margin: theme.variables.isMobilePageLayout ? "0 !important" : "2rem 0 0 0 !important",

    "& > .list-view-content-container": {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",

      "& .MuiDataGrid-root": {
        marginBottom: "1rem !important"
      },

      // LIST ELEMENT STYLES:

      "& > hr.list-view-lists-divider": {
        height: "auto",
        alignSelf: "stretch",
        minWidth: "1px",
        margin: "0 clamp(0.5rem, 1.5%, 1rem)"
      },

      "& > .list-view-list-container": {
        flexGrow: 1,
        width: theme.variables.isMobilePageLayout ? "100%" : "50%",
        flexDirection: "column",

        "& > .core-items-list-header": {
          paddingLeft: "1rem",
          marginBottom: "0.5rem",
          backgroundColor: theme.palette.background.paper
        }
      }
    }
  }
}));
