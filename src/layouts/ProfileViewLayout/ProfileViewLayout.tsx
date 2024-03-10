import { styled } from "@mui/material/styles";
import { XscrollContainer } from "@/components/Containers/XscrollContainer";
import {
  CoreContentViewLayout,
  coreContentViewLayoutClassNames,
  type CoreContentViewLayoutProps,
} from "@/layouts/CoreContentViewLayout";
import { ProfileViewHeader } from "./ProfileViewHeader";
import { UserProfileDetails } from "./UserProfileDetails";
import type { FixitUser } from "@/graphql/types";

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

const StyledCoreContentViewLayout = styled(CoreContentViewLayout)(({ theme: { variables } }) => ({
  "& *": {
    whiteSpace: "nowrap",
  },

  // CoreContent: HEADER and CONTENT containers shared styles
  // prettier-ignore
  [`& > .${coreContentViewLayoutClassNames.headerContainer},.${coreContentViewLayoutClassNames.childrenContainer}`]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    // HEADER:
    [`&.${coreContentViewLayoutClassNames.headerContainer}`]: {
      height: "11rem",
      minHeight: "11rem",
    },

    // CONTENT:
    [`&.${coreContentViewLayoutClassNames.childrenContainer}`]: {
      padding: variables.isMobilePageLayout ? "1rem" : "1rem 2rem",
    },
  },

  // Divider:
  [`& > .${coreContentViewLayoutClassNames.sectionDivider}`]: {
    marginBottom: variables.isMobilePageLayout ? "1rem" : "2rem",
  },
}));

export type ProfileViewLayoutProps = Pick<FixitUser, "handle" | "email" | "phone" | "profile"> & {
  headerComponents?: CoreContentViewLayoutProps["headerComponents"];
  children?: React.ReactNode;
};
