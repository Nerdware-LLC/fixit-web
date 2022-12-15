import { useEffect, useRef } from "react";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { checkoutValuesStore } from "@app";
import { Text } from "@components";

export const SwitchToAnnual = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore();
  const originalSelectedSubRef = useRef<typeof selectedSubscription | null>(null);

  useEffect(() => {
    if (originalSelectedSubRef.current === null) {
      originalSelectedSubRef.current = selectedSubscription;
    }
  }, [selectedSubscription]);

  const handleChange = () => {
    if (originalSelectedSubRef.current === null) {
      originalSelectedSubRef.current = selectedSubscription;
    }

    checkoutValuesStore.setCheckoutValues({
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
          alignItems: "center"
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
        <Text>{MSG_TO_USER}</Text>
        <DiscountInfoChip />
      </div>
      {selectedSubscription !== "ANNUAL" && (
        <Text style={{ textAlign: "right" }}>$50.00 / year</Text>
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
