import Tooltip from "@mui/material/Tooltip";
import MapMarkerIcon from "@mui/icons-material/LocationOn";
import type { Location } from "@types";

/**
 * Button which will open a given `location` in Google Maps.
 */
export const OpenGoogleMapsButton = ({
  location,
  tooltipProps = {},
  iconProps = {},
  anchorProps = {}
}: {
  location: Location;
  tooltipProps?: Omit<React.ComponentProps<typeof Tooltip>, "title" | "children">;
  iconProps?: React.ComponentProps<typeof MapMarkerIcon>;
  anchorProps?: React.ComponentPropsWithoutRef<"a">;
}) => {
  const formattedAddressStr = Object.values(location)
    .filter((locationValue) => typeof locationValue === "string")
    .join(", ");

  const urlEncodedLocation = encodeURIComponent(formattedAddressStr);

  return (
    <Tooltip title={`Open in Google Maps: ${formattedAddressStr}`} {...tooltipProps}>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${urlEncodedLocation}`}
        target="_blank"
        rel="noreferrer"
        className="google-maps-button-anchor"
        {...anchorProps}
      >
        <MapMarkerIcon color="primary" className="google-maps-button-icon" {...iconProps} />
      </a>
    </Tooltip>
  );
};
