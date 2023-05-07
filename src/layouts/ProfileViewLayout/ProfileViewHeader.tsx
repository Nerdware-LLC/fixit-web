import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { Avatar, avatarClassNames } from "@components/Avatar";
import { XscrollContainer } from "@components/Containers/XscrollContainer";
import type { FixitUser } from "@graphql/types";

export const ProfileViewHeader = ({ profile, handle }: ProfileViewHeaderProps) => (
  <StyledDiv className={profileViewHeaderClassNames.root}>
    <Avatar profile={profile} />
    <XscrollContainer>
      <div className={profileViewHeaderClassNames.nameContainer}>
        <Text variant="h6">{profile.displayName}</Text>
        <Text variant="h6">{handle}</Text>
      </div>
    </XscrollContainer>
  </StyledDiv>
);

export const profileViewHeaderClassNames = {
  root: "profile-view-header-root",
  nameContainer: "profile-view-header-name-container",
};

const StyledDiv = styled("div")(({ theme }) => ({
  width: "auto",
  maxWidth: "100%",
  display: "flex",
  flexDirection: theme.variables.isMobilePageLayout ? "column" : "row",
  alignItems: "center",

  // The Avatar comp container
  [`& > .${avatarClassNames.root}`]: {
    width: "initial",
    margin: theme.variables.isMobilePageLayout ? "0 0 0.5rem 0" : "0",

    // The Avatar comp img
    [`& > .${avatarClassNames.muiAvatar.root}`]: {
      ...(theme.variables.isMobilePageLayout
        ? { height: "4rem", width: "4rem", fontSize: "2.75rem" }
        : { height: "5rem", width: "5rem", fontSize: "3rem" }),
    },
  },

  // Container for displayName and handle (in case of long names/handles)
  [`& .${profileViewHeaderClassNames.nameContainer}`]: {
    [`& > .${typographyClasses.root}`]: {
      // displayName and handle
      fontWeight: "normal",
      lineHeight: "1.3rem",
      textAlign: theme.variables.isMobilePageLayout ? "center" : "left",

      // handle
      "&:last-of-type": {
        color: theme.palette.text.secondary,
        fontSize: "1rem",
      },
    },
  },
}));

export type ProfileViewHeaderProps = Pick<FixitUser, "profile" | "handle">;
