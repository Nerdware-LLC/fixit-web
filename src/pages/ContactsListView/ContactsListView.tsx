import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Group";
import { listClassNames } from "@/components/List";
import { ContactListItemButton } from "@/components/List/listItems/ContactListItem.jsx";
import { QUERIES } from "@/graphql/queries.js";
import { coreContentViewLayoutClassNames } from "@/layouts/CoreContentViewLayout";
import { CoreItemsListView } from "@/layouts/CoreItemsListView";
import { APP_PATHS } from "@/routes/appPaths.js";
import { SearchUsers } from "./SearchUsers";
import { contactTableProps, type ContactTableRowData } from "./tableProps.jsx";
import type { ListViewRenderItemFn } from "@/layouts/CoreItemsListView";
import type { Contact } from "@/types/graphql.js";

type MyContactsQueryData = { myContacts: Array<Contact> };

const getListsAndTablePropsFromMyContacts = (data: MyContactsQueryData) => {
  const contactsArray = data?.myContacts ?? [];
  return {
    lists: [
      {
        items: contactsArray,
        listComponentProps: {
          EmptyPlaceholder: {
            text: "No Contacts Available",
            tooltip: `Use the "Search & Invite Users" search bar above to start adding Contacts`,
            backgroundIcon: <GroupIcon />,
          },
        },
      },
    ],
    tableProps: {
      ...contactTableProps,
      rows: contactsArray,
      backgroundIcon: <GroupIcon />,
    },
  };
};

export const ContactsListView = () => (
  <CoreItemsListView<MyContactsQueryData, Contact, ContactTableRowData>
    listQuery={QUERIES.MY_CONTACTS}
    getListsAndTableProps={getListsAndTablePropsFromMyContacts}
    headerLabel="Contacts"
    headerComponents={<SearchUsers />}
    itemViewBasePath={APP_PATHS.CONTACTS_LIST_VIEW}
    listViewSettingsStoreKey="contacts"
    renderItem={renderContactsListItem}
    virtualizedListProps={{
      /**
       * Setting `increaseViewportBy` here is necessary because ContactsListView styles the
       * MuiList to `display:grid` with multiple columns, and the react-virtuoso VirtualizedList
       * component does not support grid layouts, so it isn't aware that multiple items are being
       * rendered in each row. This causes it to render only about 10 items or so on a desktop
       * layout, and below that, the user just sees empty space. Upon scrolling, the other items
       * do come into view, but this is a poor user experience. Increasing the virt-scroller
       * viewport's height by a large amount (1400px) ensures that enough items are rendered to
       * fill all available visible space. Increasing it by too much, however, causes performance
       * issues; a little over ~1500 seems to be the point at which rendering is noticeably
       * impacted. To ensure users don't see empty space, even on very wide displays, the number
       * of grid-columns is limited to a max of 3 (see the sx prop below).
       *
       * Note: I tried swapping to react-virtuoso's VirtuosoGrid, but there's comparatively little
       * documentation for it, and I couldn't get it to render the existing list-item components.
       */
      increaseViewportBy: { top: 0, bottom: 1400 },
    }}
    sx={({ variables, breakpoints }) => ({
      /* On mobile, to accommodate the SearchUsers input, the CoreContentViewLayout
      header flex-row is configured to wrap items and its height is increased. This
      change makes it necessary to bump DataGrid down a bit as well.  */
      ...(variables.isMobilePageLayout && {
        [`& .${coreContentViewLayoutClassNames.headerContainer}`]: {
          flexWrap: "wrap",
          height: "10rem",
          paddingTop: "0.75rem",
          rowGap: "0.75rem",
        },
      }),
      // Contacts list root:
      [`& .${listClassNames.muiList.root}`]: {
        width: "100%",
        display: "grid",
        gap: "1rem",
        gridTemplateRows: "repeat( auto-fit, 1fr )",
        gridTemplateColumns: "minmax( 14rem, 1fr )",
        [breakpoints.up(600)]: {
          gridTemplateColumns: "repeat( 2, minmax( 14rem, 1fr ))",
        },
        [breakpoints.up(900)]: {
          gridTemplateColumns: "repeat( 3, minmax( 14rem, 1fr ))",
        },
      },
    })}
  />
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = ContactsListView;

const renderContactsListItem: ListViewRenderItemFn<Contact> = ({ item, onClick }) => (
  <StyledContactListItemButton contact={item} onClick={onClick} data-item-id={item.id} />
);

const StyledContactListItemButton = styled(ContactListItemButton)(({ theme: { palette } }) => ({
  // Root class here is MuiListItemButton-root
  position: "relative",
  borderRadius: "0.5rem",
  overflow: "hidden",
  // LP base is 1rem, 5px added for left-stripe (ensures even spacing around the Avatar)
  paddingLeft: "calc(1rem + 5px)",
  // Stylish left-stripe (the color may eventually reflect the Contact's status or role)
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "5px",
    height: "100%",
    backgroundColor: palette.secondary.main,
  },
  borderWidth: "2px",
  borderStyle: "solid",
  ...(palette.mode === "dark"
    ? {
        borderColor: "transparent",
        backgroundColor: palette.background.paper,
        "&:hover": {
          backgroundColor: palette.action.hover,
        },
      }
    : {
        borderColor: "rgba(150,150,150,0.4)",
        "&:hover": {
          borderColor: palette.secondary.main,
        },
      }),
}));
