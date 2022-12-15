import React from "react";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import PlusIcon from "@mui/icons-material/ControlPoint";
import { Button } from "@components";
import type { WorkOrder, Invoice, Contact } from "@types";

export const CoreItemsListView = ({
  viewHeader,
  viewBasePath,
  headerRowListControlComponents,
  lists,
  listItemComponent,
  styles = {}
}: {
  viewHeader: "Work Orders" | "Invoices" | "Contacts";
  viewBasePath: string;
  headerRowListControlComponents?: React.ReactNode;
  lists: Array<{
    listName?: "Inbox" | "Sent";
    isListVisible?: boolean;
    items: Array<WorkOrder> | Array<Invoice> | Array<Contact>;
  }>;
  listItemComponent: any;
  styles?: {
    headerRowContainer?: React.CSSProperties;
    listAreaContainer?: React.CSSProperties;
  };
}) => {
  const nav = useNavigate();

  /* All core items currently use the convention "/home/[item-type]/form" for
  the path to their respective form (e.g., /home/workorders/form). If an existing
  item is provided to location-state, the form is an UPDATE form, otherwise no
  item results in a CREATE form. If this convention changes for whatever reason,
  the below value will need to be parameterized.  */
  const createItemNavPath = `${viewBasePath}/form`;
  const createItemBtnLabel = `Create ${viewHeader.replace(/s$/, "")}`;

  const visibleLists = lists.filter((listParams) => listParams?.isListVisible !== false);
  const numVisibleLists = visibleLists.length;
  const listWidth = `${Math.floor(100 / numVisibleLists)}%`;

  return (
    <>
      <HeaderRowContainer style={styles?.headerRowContainer ?? {}}>
        <h2 style={{ whiteSpace: "nowrap", width: "10rem" }}>{viewHeader}</h2>
        {headerRowListControlComponents}
        <Button
          label={createItemBtnLabel}
          startIcon={<PlusIcon />}
          onClick={() => nav(createItemNavPath)}
          style={{ whiteSpace: "nowrap", width: "13rem" }}
        />
      </HeaderRowContainer>
      <Divider style={{ marginBottom: "1rem" }} />
      <ListAreaContainer style={styles?.listAreaContainer ?? {}}>
        {visibleLists.map(({ listName, items }, index) => (
          <React.Fragment key={`CoreItemsListView:list-Container${listName && `:${listName}`}`}>
            {index % 2 === 1 && index !== numVisibleLists - 1 && <ListDivider />}
            <div style={{ height: "100%", width: listWidth }}>
              {!!listName && <h4>{listName}</h4>}
              <div style={{ height: "100%" }}>
                <List>
                  {items.map((item) => (
                    <React.Fragment
                      key={`CoreItemsListView${listName && `:${listName}`}:${item.id}`}
                    >
                      {React.cloneElement(listItemComponent, {
                        item,
                        onClick: () => nav(`${viewBasePath}/${item.id}`, {
                          state: { isItemOwnedByUser: listName === "Sent" }
                        }),
                        ...(!!listName && { parentListName: listName })
                      })}
                    </React.Fragment>
                  ))}
                </List>
              </div>
            </div>
          </React.Fragment>
        ))}
      </ListAreaContainer>
    </>
  );
};

const HeaderRowContainer = muiStyled("div")(() => ({
  height: "5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden"
}));

const ListAreaContainer = muiStyled("div")(() => ({
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}));

/**
 * This component is rendered between lists of core items.
 */
const ListDivider = muiStyled("div")(({ theme }) => ({
  height: "100%",
  width: "1px",
  margin: "0 0.5rem",
  display: "flex",
  backgroundColor: theme.palette.divider
}));
