import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { ItemDetails, dataDisplayClassNames } from "@/components/DataDisplay";
import { fmt } from "@/utils/formatters";
import type { FixitUser } from "@/graphql/types";

/**
 * This component displays the user's profile details.
 *
 * // IDEA Introduce controls to allow users to show/hide their profile info.
 */
export const UserProfileDetails = ({
  email,
  phone,
  profile: { givenName = "", familyName = "", businessName = "" },
}: UserProfileDetailsProps) => (
  <StyledDiv>
    <ItemDetails label="Name" labelIcon={<PersonIcon />}>
      {givenName && `${givenName}${givenName && familyName && ` ${familyName}`}`}
    </ItemDetails>
    <ItemDetails label="Company" labelIcon={<StorefrontIcon />}>
      {businessName}
    </ItemDetails>
    <ItemDetails label="Phone" labelIcon={<PhoneIcon />}>
      {fmt.prettifyPhoneNum(phone)}
    </ItemDetails>
    <ItemDetails label="Email" labelIcon={<EmailIcon />}>
      {email}
    </ItemDetails>
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  [`& > .${dataDisplayClassNames.root}`]: {
    width: "min-content",
    height: "min-content",
    display: "flex",
    ...(variables.isMobilePageLayout
      ? { flexDirection: "column" }
      : { flexDirection: "row", alignItems: "center" }),

    // ItemDetails: header AND content
    [`& > .${dataDisplayClassNames.header},.${dataDisplayClassNames.content}`]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      // ItemDetails: all text
      [`& .${typographyClasses.root}`]: {
        overflow: "visible !important",
        ...(variables.isMobilePageLayout && {
          fontSize: "0.9rem !important",
          lineHeight: "1rem !important",
        }),
      },

      // ItemDetails: header
      [`&.${dataDisplayClassNames.header}`]: {
        ...(variables.isMobilePageLayout
          ? { width: "8rem", minWidth: "8rem", maxWidth: "8rem" }
          : { width: "10rem", minWidth: "10rem", maxWidth: "10rem" }),
        // ItemDetails: header icons
        [`& > .${svgIconClasses.root}`]: {
          height: "1.5rem",
          width: "1.5rem",
        },
      },

      // ItemDetails: content
      [`&.${dataDisplayClassNames.content}`]: {
        /* When content is below header on mobile, the below `margin` indents
        the content to the right so content-text lines up with header-text.*/
        margin: variables.isMobilePageLayout ? "0.35rem 0 0 2.25rem" : 0,
      },
    },
  },
}));

export type UserProfileDetailsProps = Pick<FixitUser, "email" | "phone" | "profile">;
