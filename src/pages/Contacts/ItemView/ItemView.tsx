import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql";
import { Loading, Error } from "@components";
import { ProfileViewLayout } from "@layouts";
import { MOCK_CONTACTS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const ContactItemView = () => {
  const { id } = useParams();
  const { loading, error, networkStatus } = useQuery(QUERIES.CONTACT, {
    variables: { contactID: id },
    skip: true
  });

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  const MOCK_contact = MOCK_CONTACTS.myContacts.find((contact) => contact.id === id);

  return <ProfileViewLayout headerLabel="Contact" {...(MOCK_contact as any)} />;
};
