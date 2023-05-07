import { styled } from "@mui/material/styles";
import { XscrollContainer } from "@components/Containers/XscrollContainer";
import {
  CoreContentViewLayout,
  coreContentViewLayoutClassNames as ccvlClassNames,
  type CoreContentViewLayoutProps,
} from "@layouts/CoreContentViewLayout";
import { ProfileViewHeader } from "./ProfileViewHeader";
import { UserProfileDetails } from "./UserProfileDetails";
import type { FixitUser } from "@graphql/types";

export const ProfileViewLayout = ({
  handle,
  email,
  phone,
  profile,
  headerComponents,
  children,
}: ProfileViewLayoutProps) => (
  <StyledCoreContentViewLayout
    headerComponents={
      <>
        <ProfileViewHeader profile={profile} handle={handle} />
        {headerComponents}
      </>
    }
  >
    <XscrollContainer>
      <UserProfileDetails email={email} phone={phone} profile={profile} />
    </XscrollContainer>
    {children}
  </StyledCoreContentViewLayout>
);

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme }) => ({
  "& *": {
    whiteSpace: "nowrap",
  },

  // CoreContent: HEADER and CONTENT containers shared styles
  [`& > .${ccvlClassNames.headerContainer},.${ccvlClassNames.childrenContainer}`]: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    ...(theme.variables.isMobilePageLayout && {
      justifyContent: "center",
      paddingLeft: 0,
      paddingRight: 0,
    }),
  },

  // HEADER:

  [`& > .${ccvlClassNames.headerContainer}`]: {
    ...(theme.variables.isMobilePageLayout
      ? {
          height: "11rem",
          minHeight: "11rem",
        }
      : {
          height: "9rem",
          minHeight: "9rem",
        }),
  },

  // Divider:
  [`& > .${ccvlClassNames.sectionDivider}`]: {
    marginBottom: "2rem",
  },
}));

export type ProfileViewLayoutProps = Pick<FixitUser, "handle" | "email" | "phone" | "profile"> & {
  headerComponents?: CoreContentViewLayoutProps["headerComponents"];
  children?: React.ReactNode;
};
