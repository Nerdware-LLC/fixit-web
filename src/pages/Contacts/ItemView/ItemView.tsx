import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { ProfileViewLayout } from "@layouts/ProfileViewLayout";

/* TODO Add to ContactItemView:

  - "Pay this Contact" button
  - "Send Payment Request" button
  - WO history and/or INV history between User and Contact
*/

export const ContactItemView = () => {
  const { id } = useParams();

  const { data, loading, error, networkStatus } = useQuery(QUERIES.CONTACT, {
    variables: { contactID: id ?? "" },
    skip: !id,
  });

  return loading || networkStatus === 4 || !data?.contact ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <ProfileViewLayout {...data.contact} />
  );
};
