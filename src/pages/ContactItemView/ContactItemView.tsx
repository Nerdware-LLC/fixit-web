import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react/hooks";
import { Loading, ErrorDialog } from "@/components/Indicators";
import { QUERIES } from "@/graphql/queries.js";
import { ProfileViewLayout } from "@/layouts/ProfileViewLayout";

/**
 * // IDEA Add to ContactItemView:
 * - "Pay this Contact" button
 * - "Send Payment Request" button
 * - WO history and/or INV history between User and Contact
 */
export const ContactItemView = () => {
  const { id: contactID } = useParams();

  const { data, loading, error } = useQuery(QUERIES.CONTACT, {
    variables: { contactID: contactID ?? "" },
    skip: !contactID,
    fetchPolicy: "cache-only",
  });

  return loading || !data?.contact ? (
    <Loading />
  ) : error ? (
    <ErrorDialog error={error} />
  ) : (
    <ProfileViewLayout {...data.contact} />
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = ContactItemView;
