import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Text from "@mui/material/Typography";
import PlusIcon from "@mui/icons-material/ControlPoint";
import { CoreContentViewLayout } from "@layouts/CoreContentViewLayout";
import type { ListViewHeader, CoreItemsListConfig, ListViewRenderItemFn } from "./types";

/**
 * ListView layout component for WorkOrders, Invoices, and Contacts.
 * - **_createItemFormPath_** is an optional prop with a default value of `[viewBasePath]/form`.
 */
export const CoreItemsListView = ({
  viewHeader,
  viewBasePath,
  createItemFormPath = `${viewBasePath}/form`,
  headerRowListControlComponents,
  lists,
  renderItem,
  ...containerProps
}: {
  viewHeader: ListViewHeader;
  viewBasePath: string;
  createItemFormPath?: string;
  headerRowListControlComponents?: React.ReactNode;
  lists: Array<CoreItemsListConfig>;
  renderItem: ListViewRenderItemFn;
} & Omit<React.ComponentProps<typeof StyledCoreItemsListView>, "children">) => {
  const nav = useNavigate();

  const handleClickCreateItem = () => nav(createItemFormPath);

  const handleClickItem = (event: React.MouseEvent<HTMLDivElement & HTMLLIElement>) => {
    const { itemId: itemID, parentListName } = event.currentTarget.dataset;

    if (typeof itemID === "string" && typeof parentListName === "string") {
      nav(`${viewBasePath}/${encodeURIComponent(itemID)}`, {
        state: { isItemOwnedByUser: parentListName === "Sent" }
      });
    }
  };

  const visibleLists = lists.filter((listParams) => listParams?.isListVisible !== false);

  return (
    <StyledCoreItemsListView
      className="core-items-list-view-container"
      headerLabel={viewHeader}
      headerComponents={
        <>
          {headerRowListControlComponents}
          <Button
            onClick={handleClickCreateItem}
            startIcon={<PlusIcon style={{ marginBottom: "0.12rem" }} />}
            style={{
              height: "2rem",
              width: "14rem",
              paddingBottom: "0.16rem",
              borderRadius: "1.5rem"
            }}
          >
            {`Create ${viewHeader.replace(/s$/, "")}`}
          </Button>
        </>
      }
      {...containerProps}
    >
      <Box className="list-view-lists-container">
        {visibleLists.map(({ listName, items }, index) => (
          <React.Fragment key={`CoreItemsListView:list-Container${listName && `:${listName}`}`}>
            {index === 1 && (
              <Divider
                className="list-view-lists-divider"
                orientation="vertical"
                variant="middle"
              />
            )}
            <Box className="list-view-list-container" {...containerProps}>
              {!!listName && (
                <Text variant="h6" component="h3" className="core-items-list-header">
                  {listName}
                </Text>
              )}
              <List className="core-items-list">
                {items.map((item) =>
                  renderItem({
                    key: `CoreItemsListView${listName && `:${listName}`}:${item.id}`,
                    item,
                    onClick: handleClickItem,
                    ...(!!listName && { parentListName: listName })
                  })
                )}
              </List>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </StyledCoreItemsListView>
  );
};

const StyledCoreItemsListView = styled(CoreContentViewLayout)(({ theme }) => ({
  // styled applied to "core-content-view-container":

  // All ListView text doesn't wrap by default
  "& *": {
    whiteSpace: "nowrap"
  },

  // Scroll container:

  "& > div.core-content-view-scroll-container": {
    height: "calc(100% - 7rem)", // 7rem = 4rem (header-height) + 1rem (hr-mt) + 2rem (self-mt)
    margin: theme.variables.isMobilePageLayout ? "0 0 1rem 0" : "2rem 0",

    "& > div.list-view-lists-container": {
      width: "100%",
      display: "flex",
      flexDirection: "row",

      // This ensures in mobile view, only 1 list is ever shown
      "&>*:not(:first-of-type)": {
        display: theme.variables.isMobilePageLayout ? "none" : "block"
      },

      "& > hr.list-view-lists-divider": {
        height: "auto",
        alignSelf: "stretch",
        minWidth: "1px",
        margin: "0 clamp(0.5rem, 1.5%, 1rem)"
      },

      "& > div.list-view-list-container": {
        // These flexGrow and maxWidth values ensure lists always have correct width
        flexGrow: 1,
        maxWidth: theme.variables.isMobilePageLayout ? "100%" : "48%",
        "&:only-of-type": {
          // prettier-ignore
          maxWidth: theme.variables.isMobilePageLayout
            ? "100%"
            : "calc(96% + 2rem + 1px)" // ( 2 x 48% ) + hr-margin + hr-width
        },

        "& > .core-items-list-header": {
          paddingLeft: "1rem",
          backgroundColor: theme.palette.background.paper
        },

        "& > ul.core-items-list": {
          padding: 0
        }
      }
    }
  }
}));
