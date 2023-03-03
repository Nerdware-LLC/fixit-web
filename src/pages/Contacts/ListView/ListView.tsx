import { useQuery } from "@apollo/client/react/hooks";
import { Loading, Error } from "@components";
import { QUERIES } from "@graphql";
import { CoreItemsListView, type ListViewRenderItemFn } from "@layouts";
import { ContactsListItem } from "./ListItem";
import { contactTableProps } from "./tableProps";
import { MOCK_CONTACTS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const ContactsListView = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_CONTACTS, {
    notifyOnNetworkStatusChange: true,
    skip: true // TODO <-- skip for now, turn off later
  });

  // FIXME
  // const { contacts } = contactListSettingsStore.useFilterAndSort(
  //   data?.myContacts ?? []
  // );

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <CoreItemsListView
      viewHeader="Contacts"
      viewBasePath="/home/contacts"
      lists={[{ items: Object.values(MOCK_CONTACTS) as any }]}
      renderItem={renderContactsListItem}
      tableProps={{
        ...contactTableProps,
        rows: Object.values(MOCK_CONTACTS)
      }}
      sx={{
        "& .MuiList-root": {
          width: "100%",
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "repeat( auto-fit, minmax( 16rem, 1fr ))",
          gridTemplateRows: "repeat( auto-fit, 1fr )"
        }
      }}
    />
  );
};

const renderContactsListItem: ListViewRenderItemFn = (props) => <ContactsListItem {...props} />;
