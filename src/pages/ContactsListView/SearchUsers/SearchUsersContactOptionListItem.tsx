import { styled } from "@mui/material/styles";
import Avatar, { avatarClasses } from "@mui/material/Avatar";
import Text, { typographyClasses } from "@mui/material/Typography";
import type { Contact } from "@/graphql/types";

export const SearchUsersContactOptionListItem = ({
  contact: { handle, profile },
  ...props
}: {
  contact: Contact;
} & React.HTMLAttributes<HTMLLIElement>) => (
  <StyledLI {...props}>
    <Avatar src={profile?.photoUrl || undefined} alt={`${handle} fixit avatar`}>
      {// The below char will be unused if an image src is available
      [profile?.displayName, profile?.givenName, profile?.familyName]
        .find((name) => !!name)
        ?.charAt(0)}
    </Avatar>
    <div>
      <Text variant="body2">{handle}</Text>
      {profile?.displayName && <Text variant="caption">{profile.displayName}</Text>}
    </div>
  </StyledLI>
);

const StyledLI = styled("li")({
  padding: "0.25rem 0",
  display: "flex",
  alignItems: "center",

  [`& .${avatarClasses.root}`]: {
    marginLeft: "-0.25rem",
    marginRight: "0.5rem",
  },

  "& > div:last-of-type": {
    height: "100%",
    paddingTop: "2px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",

    [`& .${typographyClasses.root}`]: {
      display: "block",
      textOverflow: "ellipsis",
      WebkitLineClamp: 2,
      pointerEvents: "none",

      "&:first-of-type": {
        lineHeight: "1.1rem",
      },
      "&:is(span)": {
        marginLeft: "0.25rem",
        opacity: 0.5,
      },
    },
  },
});
