import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { CoreListItemLayout } from "@layouts";
import { Avatar } from "@components";
import type { Contact } from "@types";

export const ContactsListItem = ({
  item: contact,
  onClick
}: {
  item?: Contact;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  if (!contact || !onClick) return null;

  return (
    <CoreListItemLayout
      onClick={onClick}
      topRowComponents={
        <ContactItemContainer>
          <CircleAvatarContainer>
            <Avatar profile={contact.profile} sx={{ width: "100%", height: "100%" }} />
          </CircleAvatarContainer>
          <Text>
            {
              // prettier-ignore
              [contact.profile.displayName, contact.handle].join('\n')
            }
          </Text>
        </ContactItemContainer>
      }
      styles={{
        container: {
          maxWidth: "20%",
          padding: "0.5rem",
          whiteSpace: "pre"
        },
        topRowContainer: { padding: "0" }
      }}
    />
  );
};

const ContactItemContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "1.25rem",
  overflowX: "hidden",
  whiteSpace: "pre",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));

const CircleAvatarContainer = styled("div")(({ theme }) => ({
  marginRight: "1rem",
  width: "3.75vw",
  height: "3.75vw",
  padding: "2px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, white 40%, ${theme.palette.primary.dark})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
