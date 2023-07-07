import { styled } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import Text from "@mui/material/Typography";
import {
  CoreListItemLayout,
  type CoreListItemLayoutProps,
} from "@layouts/CoreItemsListView/CoreListItemLayout";
import type { Contact } from "@graphql/types";

export const ContactsListItem = ({
  item: contact,
  onClick,
  ...props
}: {
  item?: Contact;
  onClick?: CoreListItemLayoutProps["onClick"];
}) => {
  if (!contact || !onClick) return null;

  return (
    <StyledCoreListItemLayout
      user={contact}
      onClick={onClick}
      itemID={contact.id}
      divider={false}
      {...props}
    >
      <ListItemText
        primary={<Text>{contact.handle}</Text>}
        secondary={<Text>{contact.profile?.displayName ?? `User ${contact.handle}`}</Text>}
      />
    </StyledCoreListItemLayout>
  );
};

const StyledCoreListItemLayout = styled(CoreListItemLayout)(({ theme: { palette } }) => ({
  borderRadius: "0.5rem",

  ...(palette.mode === "dark"
    ? { backgroundColor: palette.background.paper }
    : { border: `2px solid ${palette.divider}` }),

  "& .MuiButtonBase-root": {
    padding: "0.5rem 1rem !important",
    borderRadius: "0.5rem",
  },
}));
