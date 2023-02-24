import Text from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MapIcon from "@mui/icons-material/MapOutlined";
import MapMarkerIcon from "@mui/icons-material/Place";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TextExternalLink } from "@components";
import { ItemDetails } from "@layouts/CoreItemView";
import type { Location } from "@types";

export const LocationDetails = ({
  location: { streetLine1, streetLine2, city, region, country }
}: {
  location: Location;
}) => {
  const addressStr = [streetLine1, streetLine2, city, region, country]
    .filter((locationValue) => typeof locationValue === "string")
    .join(", ");

  const tooltipText = `Google Maps: ${addressStr}`;
  // prettier-ignore
  const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressStr)}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Tooltip title={tooltipText}>
        <TextExternalLink href={googleMapsURL}>
          <MapMarkerIcon color="primary" style={{ fontSize: 45, marginRight: "0.5rem" }} />
        </TextExternalLink>
      </Tooltip>
      <ItemDetails
        label="Address"
        sx={{
          "& > .item-details-content p": {
            fontSize: "1.25rem",
            lineHeight: "1.35rem"
          }
        }}
      >
        <div>
          <Text style={{ whiteSpace: "nowrap" }}>
            {streetLine1}
            {streetLine2 && `, ${streetLine2}`}
          </Text>
          <Text>
            {city}, {region}
          </Text>
          <Tooltip title={tooltipText}>
            <TextExternalLink
              href={googleMapsURL}
              style={{
                marginTop: "1px",
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <MapIcon
                color="action"
                style={{ fontSize: "1.4rem", opacity: "0.35", marginRight: "0.25rem" }}
              />
              Map it <ChevronRightIcon style={{ fontSize: "1rem" }} />
            </TextExternalLink>
          </Tooltip>
        </div>
      </ItemDetails>
    </div>
  );
};
