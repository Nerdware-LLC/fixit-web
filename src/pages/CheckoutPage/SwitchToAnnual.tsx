import { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Text from "@mui/material/Typography";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore";
import type { SubscriptionPriceLabel } from "@/graphql/types";

export const SwitchToAnnual = () => {
  // Route protection guarantees that these values are defined, hence the as cast
  const { selectedSubscription } = checkoutValuesStore.useSubToStore<true>();
  const originalSelectedSubRef = useRef<SubscriptionPriceLabel | null>(null);

  useEffect(() => {
    if (originalSelectedSubRef.current === null) {
      originalSelectedSubRef.current = selectedSubscription;
    }
  }, [selectedSubscription]);

  const handleChange = () => {
    if (originalSelectedSubRef.current === null) {
      originalSelectedSubRef.current = selectedSubscription;
    }
    checkoutValuesStore.mergeUpdate({
      selectedSubscription: ["TRIAL", "MONTHLY"].includes(selectedSubscription)
        ? "ANNUAL"
        : originalSelectedSubRef.current,
    });
  };

  const showSwitchInput = originalSelectedSubRef.current !== "ANNUAL";

  return (
    <StyledDiv showSwitchInput={showSwitchInput}>
      <Text variant="body2" sx={{ gridArea: "mainText", whiteSpace: "normal !important" }}>
        {showSwitchInput ? `Save with annual billing` : `You're saving 16% with annual billing!`}
      </Text>
      {showSwitchInput && (
        <Tooltip title="Save with annual billing">
          <Switch
            style={{ gridArea: "switch" }}
            checked={selectedSubscription === "ANNUAL"}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color={selectedSubscription === "ANNUAL" ? "success" : undefined}
          />
        </Tooltip>
      )}
      <Box
        style={{
          gridArea: "discountInfo",
          display: "inline-flex",
          flexDirection: selectedSubscription === "ANNUAL" ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "inherit",
          // flexShrink: 1,
        }}
      >
        <Chip label={showSwitchInput ? "Save 16%" : "16% Off"} color="success" size="small" />
        <Text
          style={{
            textAlign: "right",
            whiteSpace: "nowrap",
            ...(selectedSubscription === "ANNUAL" && { display: "none" }),
            // If they switch to annual, this now-redundant price info is hidden
          }}
        >
          $50.00 / year
        </Text>
      </Box>
    </StyledDiv>
  );
};

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "showSwitchInput",
})<{ showSwitchInput: boolean }>(({ theme: { palette }, showSwitchInput }) => ({
  position: "relative",
  width: "100%",
  height: "5.5rem",
  padding: "1rem",

  backgroundColor: palette.divider,
  borderBottomLeftRadius: "4px", // parent has border-radius of 5px
  borderBottomRightRadius: "4px",

  display: "grid",
  gap: "0 1rem", // no gap between rows
  alignItems: "center",
  alignContent: "center",
  ...(showSwitchInput
    ? {
        gridTemplateRows: "2rem 1fr",
        gridTemplateColumns: "min-content 1fr",
        gridTemplateAreas: `
          "mainText  mainText"
          "switch    discountInfo"`,
      }
    : {
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr min-content",
        gridTemplateAreas: `"mainText  discountInfo"`,
      }),
}));
