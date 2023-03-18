import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MapMarkerIcon from "@mui/icons-material/Place";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TextExternalLink } from "@components";
import { ItemDetails, type ItemDetailsProps } from "@layouts/CoreItemView";
import type { Location } from "@types";

export const LocationDetails = ({
  location: { streetLine1, streetLine2, city, region, country },
  style: containerStyle,
  ...containerProps
}: { location: Location } & ItemDetailsProps) => {
  // For display purposes, filter out falsey values (null/empty strings)
  const locationStringsArray = [streetLine1, streetLine2, city, region, country].filter(
    (locationValue) => typeof locationValue === "string" && locationValue
  );

  const addressStr = locationStringsArray.join(", ");

  // prettier-ignore
  const mapLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressStr)}`

  return (
    <StyledItemDetails label="Address" className="location-details" {...containerProps}>
      <div>
        <Text variant="h4">
          <span>{streetLine1}</span>
          {streetLine2 && (
            <>
              <br />
              <span>{streetLine2}</span>
            </>
          )}
          <br />
          <span>{`${city}, `}</span>
          <span>{region}</span>
        </Text>
        <Tooltip title={`Google Maps: ${addressStr}`}>
          <TextExternalLink href={mapLink}>
            <MapMarkerIcon />
            Map it <ChevronRightIcon />
          </TextExternalLink>
        </Tooltip>
      </div>
    </StyledItemDetails>
  );
};

const StyledItemDetails = styled(ItemDetails)(({ theme }) => ({
  "& > .item-details-content > div": {
    // Address text:
    "& > .MuiTypography-root": {
      ...(theme.variables.isMobilePageLayout
        ? {
            fontSize: "1.5rem",
            lineHeight: "1.55rem"
          }
        : {
            fontSize: "1.75rem",
            lineHeight: "1.8rem"
          }),
      whiteSpace: "pre-wrap",

      "& > span": {
        display: "inline-block"
      }
    },

    // map link:
    '& > a[href^="https://www.google.com/maps"]': {
      flexShrink: 1,
      margin: theme.variables.isMobilePageLayout ? "1px 0 0.5rem 0" : "1px 0 0 0",
      textDecoration: "none",
      lineHeight: "1.5rem",
      fontSize: "0.925rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      // MapMarkerIcon
      "& > svg:first-of-type": {
        color: theme.palette.secondary.main,
        fontSize: "1.5rem",
        opacity: "0.35",
        marginRight: "0.25rem"
      },

      // ChevronRightIcon
      "& > svg:last-of-type": {
        fontSize: "1rem",
        marginTop: "1px"
      }
    }
  }
}));
