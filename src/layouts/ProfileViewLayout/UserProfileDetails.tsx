import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { ItemDetails } from "@components/DataDisplay/ItemDetails";
import { itemDetailsClassNames } from "@components/DataDisplay/classNames";
import { prettifyStr } from "@utils/prettifyStr";
import type { FixitUser } from "@graphql/types";

/**
 * // TODO Introduce controls to allow users to show/hide their profile info
 */
export const UserProfileDetails = ({
  email,
  phone,
  profile: { givenName = "", familyName = "", businessName = "" },
}: UserProfileDetailsProps) => (
  <UserProfileDetailsContainer>
    <ItemDetails label="Name" labelIcon={<PersonIcon />}>
      {givenName && `${givenName}${givenName && familyName && ` ${familyName}`}`}
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
  [`& > .${itemDetailsClassNames.container}`]: {
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
      [`& .${typographyClasses.root}`]: {
        overflow: "visible !important",
        ...(theme.variables.isMobilePageLayout && {
          fontSize: "0.9rem !important",
          lineHeight: "1rem !important",
        }),
      },

      // ItemDetails: header
      [`&.${itemDetailsClassNames.header}`]: {
        ...(theme.variables.isMobilePageLayout
          ? {
              width: "8rem",
              minWidth: "8rem",
              maxWidth: "8rem",
            }
          : {
              width: "10rem",
              minWidth: "10rem",
              maxWidth: "10rem",
            }),
        border: "none",
        // ItemDetails: header icons
        [`& .${svgIconClasses.root}`]: {
          height: "1.5rem",
          width: "1.5rem",
        },
      },

      // ItemDetails: content
      [`&.${itemDetailsClassNames.content}`]: {
        ...(theme.variables.isMobilePageLayout && {
          margin: "0.35rem 0 0 2.25rem",
        }),
      },
    },
  },
}));

export type UserProfileDetailsProps = Pick<FixitUser, "email" | "phone" | "profile">;
