import { styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { ItemDetails } from "@layouts";
import { prettifyStr } from "@utils";
import type { FixitUser } from "@types";

/**
 * // TODO Introduce controls to allow users to show/hide their profile info
 */
export const UserProfileDetails = ({
  email,
  phone,
  profile: { givenName, familyName, businessName }
}: Pick<FixitUser, "email" | "phone" | "profile">) => (
  <UserProfileDetailsContainer className="profile-view-user-profile-details">
    <ItemDetails label="Name" labelIcon={<PersonIcon />}>
      {`${givenName}${givenName && familyName && ` ${familyName}`}`}
    </ItemDetails>
    <ItemDetails label="Company" labelIcon={<StorefrontIcon />}>
      {businessName}
    </ItemDetails>
    <ItemDetails label="Phone" labelIcon={<PhoneIcon />}>
      {prettifyStr.phone(phone)}
    </ItemDetails>
    <ItemDetails label="Email" labelIcon={<EmailIcon />}>
      {email}
    </ItemDetails>
  </UserProfileDetailsContainer>
);

const UserProfileDetailsContainer = styled("div")(({ theme }) => ({
  "& > .item-details-container": {
    width: "100%",
    display: "flex",
    flexDirection: theme.variables.isMobilePageLayout ? "column" : "row",
    marginBottom: "2rem",
    border: "none",

    // ItemDetails: header AND content
    "& > div": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "0",

      // ItemDetails: all text
      "& .MuiTypography-root": {
        overflow: "visible !important",
        ...(theme.variables.isMobilePageLayout && {
          fontSize: "0.9rem !important",
          lineHeight: "1rem !important"
        })
      },

      // ItemDetails: header
      "&.item-details-header": {
        ...(theme.variables.isMobilePageLayout
          ? {
              width: "8rem",
              minWidth: "8rem",
              maxWidth: "8rem"
            }
          : {
              width: "10rem",
              minWidth: "10rem",
              maxWidth: "10rem"
            }),
        border: "none",
        // ItemDetails: header icons
        "& .MuiSvgIcon-root": {
          height: "1.5rem",
          width: "1.5rem"
        }
      },

      // ItemDetails: content
      "&.item-details-content": {
        ...(theme.variables.isMobilePageLayout && {
          margin: "0.35rem 0 0 2.25rem"
        })
      }
    }
  }
}));
