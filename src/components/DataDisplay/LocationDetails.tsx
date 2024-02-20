import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Text, { type TypographyProps } from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MapMarkerIcon from "@mui/icons-material/Place";
import { Anchor } from "@/components/Navigation/Anchor";
import { ItemDetails, type ItemDetailsProps } from "./ItemDetails";
import { dataDisplayClassNames } from "./classNames";
import type { Location } from "@/graphql/types";
import type { SetOptional } from "type-fest";

export const LocationDetails = ({
  location,
  locationTextProps = {},
  showLabel = true,
  className = "",
  ...itemDetailsProps
}: LocationDetailsProps) => {
  const { streetLine1, streetLine2, city, region, country } = location ?? {};

  // For display purposes, filter out falsey values (null/empty strings)
  const locationStringsArray = [streetLine1, streetLine2, city, region, country].filter(
    (locationValue) => typeof locationValue === "string" && locationValue
  );

  const addressStr = locationStringsArray.join(", ");

  // prettier-ignore
  const mapLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressStr)}`;

  return (
    <StyledItemDetails
      label={showLabel ? "Address" : undefined}
      className={dataDisplayClassNames.locationDetails + " " + className}
      {...itemDetailsProps}
    >
      {location && (
        <>
          <Text className={dataDisplayClassNames.locationDetailsAddressText} {...locationTextProps}>
            <span>{streetLine1}</span>
            {streetLine2 && (
              <>
                {`\n`}
                <span>{streetLine2}</span>
              </>
            )}
            {`\n`}
            <span>{`${city}, `}</span>
            <span>{region}</span>
          </Text>
          <Tooltip title={`Google Maps: ${addressStr}`}>
            <Anchor href={mapLink} className={dataDisplayClassNames.locationDetailsMapAnchor}>
              <MapMarkerIcon />
              Map it <ChevronRightIcon />
            </Anchor>
          </Tooltip>
        </>
      )}
    </StyledItemDetails>
  );
};

const StyledItemDetails = styled(ItemDetails)(({ theme: { palette, variables } }) => ({
  // All descendants inherit max-width, overflow, and text-overflow (with LOW specificity)
  "& *": {
    maxWidth: "inherit",
    overflow: "inherit",
    textOverflow: "inherit",
  },

  [`& > .${dataDisplayClassNames.content}`]: {
    margin: 0,
    display: "flex",
    flexDirection: "column",

    // Address text:
    [`& > .${dataDisplayClassNames.locationDetailsAddressText}`]: {
      whiteSpace: "pre-wrap", // preserve \n\s and wrap
      "& > span": {
        display: "inline-flex", // ensures spans have width so region will wrap below city if necessary
        whiteSpace: "pre", // preserve \n\s and nowrap
      },
    },

    // map anchor:
    [`& > .${dataDisplayClassNames.locationDetailsMapAnchor}`]: {
      width: "fit-content",
      flexShrink: 1,
      margin: variables.isMobilePageLayout ? "1px 0 0.5rem 0" : "1px 0 0 0",
      fontSize: "0.925rem",
      whiteSpace: "pre",
      color: palette.secondary.main,
      textDecoration: "none",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      // MapMarkerIcon
      "& > svg:first-of-type": {
        color: palette.secondary.main,
        fontSize: "1.5rem",
        opacity: 0.35,
        marginRight: "0.25rem",
      },

      // ChevronRightIcon
      "& > svg:last-of-type": {
        fontSize: "1rem",
        marginTop: "1px",
      },
    },
  },
}));

export type LocationDetailsProps = {
  location?: SetOptional<Location, "country">;
  locationTextProps?: TypographyProps;
  showLabel?: boolean;
} & ItemDetailsProps;
