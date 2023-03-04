import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { Avatar, XscrollContainer } from "@components";
import type { FixitUser } from "@types";

export const ProfileViewHeader = ({ profile, handle }: Pick<FixitUser, "profile" | "handle">) => (
  <ProfileViewHeaderContainer className="profile-view-header-container">
    <Avatar profile={profile} />
    <XscrollContainer>
      <div className="profile-view-header-name-container">
        <Text variant="h6">{profile.displayName}</Text>
        <Text variant="h6">{handle}</Text>
      </div>
    </XscrollContainer>
  </ProfileViewHeaderContainer>
);

const ProfileViewHeaderContainer = styled("div")(({ theme }) => ({
  width: "auto",
  maxWidth: "100%",
  display: "flex",
  flexDirection: theme.variables.isMobilePageLayout ? "column" : "row",
  alignItems: "center",

  // The Avatar comp container
  "& > .avatar-container": {
    width: "initial",
    margin: theme.variables.isMobilePageLayout ? "0 0 0.5rem 0" : "0",

    // The Avatar comp img
    "& > .MuiAvatar-root": {
      ...(theme.variables.isMobilePageLayout
        ? { height: "4rem", width: "4rem" }
        : { height: "5rem", width: "5rem" })
    }
  },

  // Container for displayName and handle (in case of long names/handles)
  "& .profile-view-header-name-container": {
    "& > .MuiTypography-root": {
      // displayName and handle
      fontWeight: "normal",
      lineHeight: "1.3rem",
      textAlign: theme.variables.isMobilePageLayout ? "center" : "left",

      // handle
      "&:last-of-type": {
        color: theme.palette.text.secondary,
        fontSize: "1rem"
      }
    }
  }
}));
