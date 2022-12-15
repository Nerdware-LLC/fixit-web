import Tooltip from "@mui/material/Tooltip";
import MapMarkerIcon from "@mui/icons-material/Room";
import type { Location } from "@types";

/**
 * Button which will open a given `location` in Google Maps.
 */
export const OpenGoogleMapsButton = ({
  location,
  style = {},
  ...props
}: {
  location: Location;
  style?: React.CSSProperties;
}) => {
  const formattedAddressStr = Object.values(location)
    .filter((locationValue) => typeof locationValue === "string")
    .join(", ");

  const urlEncodedLocation = encodeURIComponent(formattedAddressStr);

  return (
    <Tooltip title={`Google Maps: ${formattedAddressStr}`}>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${urlEncodedLocation}`}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        <MapMarkerIcon color="primary" />
      </a>
    </Tooltip>
  );
};
