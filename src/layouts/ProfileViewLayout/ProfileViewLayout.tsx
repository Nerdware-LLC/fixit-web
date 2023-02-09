import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Avatar, ItemDetailsBox } from "@components";
import { CoreContentViewLayout } from "@layouts";
import { prettifyStr } from "@utils";
import type { FixitUser } from "@types";

export const ProfileViewLayout = ({
  headerLabel,
  handle,
  email,
  phone,
  profile
}: { headerLabel: string } & FixitUser) => {
  const { displayName, givenName, familyName, businessName } = profile;

  const profileDisplayName =
    displayName ||
    `${givenName || "-"}${(givenName && familyName && " ") ?? ""}${familyName ?? ""}`;

  return (
    <StyledCoreContentView
      headerComponents={
        <>
          <Avatar
            profile={profile}
            containerProps={{
              sx: {
                width: "initial",
                "& > .MuiAvatar-root": {
                  height: "5rem",
                  width: "5rem"
                }
              }
            }}
          />
          <Text variant="h6">{handle}</Text>
          <Text variant="h6">{profile.displayName}</Text>
        </>
      }
    >
      <ItemDetailsBox label="Name" icon={<PersonIcon />}>
        {profileDisplayName}
      </ItemDetailsBox>
      <ItemDetailsBox label="Business Name" icon={<StorefrontIcon />}>
        {businessName || "-"}
      </ItemDetailsBox>
      <ItemDetailsBox label="Phone" icon={<PhoneIcon />}>
        {prettifyStr.phone(phone)}
      </ItemDetailsBox>
      <ItemDetailsBox label="Email" icon={<EmailIcon />}>
        {email}
      </ItemDetailsBox>
    </StyledCoreContentView>
  );
};

const StyledCoreContentView = styled(CoreContentViewLayout)(({ theme }) => ({
  // styles applied to "core-content-view-container"
  "& > div.core-content-view-header-container": {
    height: "12rem",
    padding: "1rem 12.5vw",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
  "& > div.core-content-view-scroll-container": {
    display: "grid",
    gridTemplateRows: "repeat( auto-fit, 8rem )",
    ...(theme.variables.isMobilePageLayout
      ? {
          gridTemplateColumns: "1fr",
          gridGap: "0.5rem",
          marginTop: 0
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridGap: "2rem",
          padding: "1rem 10vw"
        })
  },
  "& .MuiTypography-root": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  "& .item-details-box-container": {
    width: "100%",
    margin: "1rem 0 0 0",
    "& .MuiTypography-root": {
      fontWeight: "normal !important"
    }
  }
}));
