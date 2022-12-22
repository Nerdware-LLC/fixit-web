import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { Avatar } from "@components";
import { CoreItemView } from "@layouts";
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

  return (
    <CoreItemView
      headerLabel={headerLabel}
      itemInfoComponents={
        <>
          <Row style={{ marginTop: "0.5rem" }}>
            <Avatar
              profile={profile}
              style={{ height: "5rem", width: "5rem", marginRight: "1rem" }}
            />
            <div>
              <Text variant="h6">{handle}</Text>
              <Text variant="h6">{displayName}</Text>
            </div>
          </Row>
          <Row>
            <div style={{ width: "10rem", marginRight: "5rem" }}>
              <Text variant="h6">Phone</Text>
              <Text>{prettifyStr.phone(phone)}</Text>
            </div>
            <div>
              <Text variant="h6">Email</Text>
              <Text>{email}</Text>
            </div>
          </Row>
          <Row>
            <div style={{ width: "10rem", marginRight: "5rem" }}>
              <Text variant="h6">Name</Text>
              <Text>
                {
                  // prettier-ignore
                  `${givenName || "-"}${(givenName && familyName && " ") ?? ""}${familyName ?? ""}`
                }
              </Text>
            </div>
            <div>
              <Text variant="h6">Business Name</Text>
              <Text>{businessName || "-"}</Text>
            </div>
          </Row>
        </>
      }
    />
  );
};

const Row = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 3rem 0;
  padding: 0;
`;
