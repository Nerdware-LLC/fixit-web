import { styled } from "@mui/material/styles";
import { XscrollContainer } from "@components";
import { CoreContentViewLayout, type CoreContentViewLayoutProps } from "@layouts";
import { ProfileViewHeader } from "./ProfileViewHeader";
import { UserProfileDetails } from "./UserProfileDetails";
import type { FixitUser } from "@types";

export const ProfileViewLayout = ({
  handle,
  email,
  phone,
  profile,
  headerComponents,
  children
}: ProfileViewLayoutProps) => (
  <StyledCoreContentView
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
  </StyledCoreContentView>
);

const StyledCoreContentView = styled(CoreContentViewLayout)(({ theme }) => ({
  // styles applied to "core-content-view-container"
  "& *": {
    whiteSpace: "nowrap"
  },

  // CoreContent: HEADER and CONTENT containers shared styles
  "& > .core-content-view-header-container,.core-content-view-children-container": {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    ...(theme.variables.isMobilePageLayout && {
      justifyContent: "center",
      paddingLeft: 0,
      paddingRight: 0
    })
  },

  // HEADER:

  "& > .core-content-view-header-container": {
    ...(theme.variables.isMobilePageLayout
      ? {
          height: "11rem",
          minHeight: "11rem"
        }
      : {
          height: "9rem",
          minHeight: "9rem"
        })
  },

  // Divider:
  "& > .core-content-view-section-divider": {
    marginBottom: "2rem"
  }
}));

export type ProfileViewLayoutProps = Pick<FixitUser, "handle" | "email" | "phone" | "profile"> & {
  headerComponents?: CoreContentViewLayoutProps["headerComponents"];
  children?: React.ReactNode;
};
