import { useEffect, useRef } from "react";
import Text from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { usePageLayoutContext, checkoutValuesStore, type CheckoutValues } from "@app";

export const SwitchToAnnual = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore() as CheckoutValues;
  const originalSelectedSubRef = useRef<typeof selectedSubscription | null>(null);
  const { isMobilePageLayout } = usePageLayoutContext();

  useEffect(() => {
    if (originalSelectedSubRef.current === null) {
      originalSelectedSubRef.current = selectedSubscription;
    }
  }, [selectedSubscription]);

  const handleChange = () => {
    if (originalSelectedSubRef.current === null) {
      originalSelectedSubRef.current = selectedSubscription;
    }

    checkoutValuesStore.set({
      promoCode,
      selectedSubscription: ["TRIAL", "MONTHLY"].includes(selectedSubscription)
        ? "ANNUAL"
        : originalSelectedSubRef.current
    });
  };

  return !(originalSelectedSubRef.current === null && selectedSubscription === "ANNUAL") ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          ...(isMobilePageLayout && { marginTop: "2rem" })
        }}
      >
        <Tooltip title={MSG_TO_USER}>
          <Switch
            checked={selectedSubscription === "ANNUAL"}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            {...(selectedSubscription === "ANNUAL" && { color: "success" })}
          />
        </Tooltip>
        <Text
          style={{
            ...(isMobilePageLayout
              ? {
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  whiteSpace: "nowrap"
                }
              : { whiteSpace: "normal" })
          }}
        >
          {MSG_TO_USER}
        </Text>
        <DiscountInfoChip />
      </div>
      {selectedSubscription !== "ANNUAL" && (
        <Text
          style={{
            textAlign: "right",
            marginLeft: "1rem",
            whiteSpace: "nowrap",
            ...(isMobilePageLayout && { marginTop: "2rem" })
          }}
        >
          $50.00 / year
        </Text>
      )}
    </>
  ) : (
    <>
      <Text>You're saving 16% with an annual subscription</Text>
      <DiscountInfoChip />
    </>
  );
};

const MSG_TO_USER = "Save with annual billing";

const DiscountInfoChip = () => (
  <Chip
    label="16% off"
    color="success"
    size="small"
    sx={{ borderRadius: "3px", marginLeft: "1rem", fontWeight: "bold" }}
  />
);
