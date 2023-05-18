import { useQuery } from "@apollo/client/react/hooks";
import GroupIcon from "@mui/icons-material/Group";
import { EmptyListFallback, helpInfoClassNames } from "@components/HelpInfo";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { coreContentViewLayoutClassNames } from "@layouts/CoreContentViewLayout";
import { CoreItemsListView, coreItemsListViewClassNames } from "@layouts/CoreItemsListView";
import { ContactsListItem } from "./ListItem";
import { SearchUsers } from "./SearchUsers";
import { contactTableProps } from "./tableProps";
import type { ListViewRenderItemFn } from "@layouts/CoreItemsListView";

export const ContactsListView = () => {
  const { data, loading, error } = useQuery(QUERIES.MY_CONTACTS);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <CoreItemsListView
      viewHeader="Contacts"
      viewBasePath="/home/contacts"
      renderItem={renderContactsListItem}
      listViewSettingsStoreKey="contacts"
      headerComponents={<SearchUsers />}
      lists={[
        {
          items: data?.myContacts ?? [],
          emptyListFallback: (
            <EmptyListFallback
              text="No Contacts Available"
              tooltip={`Use the "Search & Invite Users" search bar above to start adding Contacts`}
              backgroundIcon={<GroupIcon />}
              sx={{
                [`& .${helpInfoClassNames.emptyListFallbackBackgroundIconContainer}`]: {
                  maxHeight: "calc(100vw - 8rem)",
                  "& > svg": {
                    maxHeight: "calc(100vw - 8rem)",
                  },
                },
              }}
            />
          ),
        },
      ]}
      tableProps={{
        ...contactTableProps,
        rows: data?.myContacts ?? [],
        noRowsOverlayProps: {
          backgroundIcon: <GroupIcon />,
        },
      }}
      sx={({ variables }) => ({
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
        // Contacts list layout:
        [`& .${coreItemsListViewClassNames.muiList.root}`]: {
          width: "100%",
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "repeat( auto-fit, minmax( 16rem, 1fr ))",
          gridTemplateRows: "repeat( auto-fit, 1fr )",
        },
      })}
    />
  );
};

const renderContactsListItem: ListViewRenderItemFn = (props) => <ContactsListItem {...props} />;
