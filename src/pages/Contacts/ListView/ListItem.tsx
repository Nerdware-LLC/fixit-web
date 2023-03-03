import ListItemText from "@mui/material/ListItemText";
import Text from "@mui/material/Typography";
import { CoreListItemLayout } from "@layouts";
import type { Contact } from "@types";

export const ContactsListItem = ({
  item: contact,
  onClick,
  ...props
}: {
  item?: Contact;
  onClick?: React.ComponentProps<typeof CoreListItemLayout>["onClick"];
}) => {
  if (!contact || !onClick) return null;

  return (
    <CoreListItemLayout
      user={contact}
      onClick={onClick}
      itemID={contact.id}
      divider={false}
      sx={({ palette }) => ({
        ...(palette.mode === "dark"
          ? {
              backgroundColor: palette.background.paper
            }
          : {
              border: `2px solid ${palette.divider}`
            }),
        borderRadius: "0.5rem",
        "& .MuiButtonBase-root": {
          borderRadius: "0.5rem"
        }
      })}
      {...props}
    >
      <ListItemText
        primary={
          <Text fontSize="1.05rem">{contact.profile?.displayName ?? `User ${contact.handle}`}</Text>
        }
        secondary={
          <Text fontSize="0.925rem" color="text.secondary">
            {contact.handle}
          </Text>
        }
      />
    </CoreListItemLayout>
  );
};
