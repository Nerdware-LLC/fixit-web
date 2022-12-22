import { useQuery } from "@apollo/client/react/hooks";
import { ContactsListItem } from "./ListItem";
import { Loading, Error } from "@components";
import { QUERIES } from "@graphql";
import { CoreItemsListView } from "@layouts";
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
      lists={[{ items: MOCK_CONTACTS.myContacts as any }]}
      listItemComponent={<ContactsListItem />}
      listComponentProps={{
        style: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }
      }}
    />
  );
};
