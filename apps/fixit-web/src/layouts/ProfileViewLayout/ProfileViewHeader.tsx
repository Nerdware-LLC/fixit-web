import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { globalClassNames } from "@/app/GlobalStyles/classNames.js";
import { Avatar, avatarClassNames } from "@/components/Avatar";
import { XscrollContainer, containerClassNames } from "@/components/Containers";
import type { User } from "@/types/graphql.js";

export const ProfileViewHeader = ({ profile, handle }: ProfileViewHeaderProps) => (
  <StyledDiv>
    <Avatar profile={profile} />
    <div>
      <XscrollContainer className={globalClassNames.scrollbar.forceHidden}>
        <Text variant="h6">{profile.displayName}</Text>
      </XscrollContainer>
      <XscrollContainer className={globalClassNames.scrollbar.forceHidden}>
        <Text variant="h6">{handle}</Text>
      </XscrollContainer>
    </div>
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { palette, variables } }) => ({
  width: "auto",
  maxWidth: "100%",
  display: "flex",
  flexDirection: variables.isMobilePageLayout ? "column" : "row",
  alignItems: "center",

  // The Avatar comp container
  [`& > .${avatarClassNames.root}`]: {
    width: "initial",
    margin: variables.isMobilePageLayout ? "0 0 0.5rem 0" : 0,
    // The Avatar img:
    [`& > .${avatarClassNames.muiAvatar.root}`]: {
      ...(variables.isMobilePageLayout
        ? { height: "4rem", width: "4rem" }
        : { height: "5.5rem", width: "5.5rem" }),
    },
  },

  // The div around the X-Scroll containers allows displayName to be on top of handle on desktop
  "& > div:nth-of-type(2)": {
    width: "auto",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ...(variables.isMobilePageLayout
      ? { alignItems: "center" }
      : {
          alignItems: "flex-start",
          transform: "translateY(-3px)", // <-- mv'd up a bit to line up w center of avatar
        }),

    // X-Scroll containers for displayName and handle (in case of long names/handles)
    [`& > .${containerClassNames.xScrollContainerRoot}`]: {
      // displayName and handle
      [`& > .${typographyClasses.root}`]: {
        fontWeight: "normal",
        lineHeight: "1.5rem",
        textAlign: variables.isMobilePageLayout ? "center" : "left",
      },
      // handle
      [`&:last-child > .${typographyClasses.root}`]: {
        color: palette.text.secondary,
        fontSize: "1rem",
      },
    },
  },
}));

export type ProfileViewHeaderProps = Pick<User, "profile" | "handle">;
