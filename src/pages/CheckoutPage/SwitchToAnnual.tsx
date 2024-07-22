import { useRef } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Text from "@mui/material/Typography";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { checkoutPageClassNames } from "./classNames.js";
import type { SubscriptionPriceName } from "@/types/graphql.js";

export const SwitchToAnnual = () => {
  // Route protection guarantees that these values are defined, hence the as cast
  const { selectedSubscription } = checkoutValuesStore.useSubToStore();
  const originalSelectedSubRef = useRef<SubscriptionPriceName>(selectedSubscription);

  const checkoutFormFetchState = useFetchStateContext();

  const handleChange = () => {
    checkoutValuesStore.mergeUpdate({
      selectedSubscription: ["TRIAL", "MONTHLY"].includes(selectedSubscription!)
        ? "ANNUAL"
        : originalSelectedSubRef.current,
    });
  };

  const isAnnualSelected = selectedSubscription === "ANNUAL";
  const isAnnualTheOriginalSelection = originalSelectedSubRef.current === "ANNUAL";

  return (
    <Box
      className={checkoutPageClassNames.priceInfoRowGroup}
      sx={({ palette }) => ({
        backgroundColor: palette.divider,
        borderBottomLeftRadius: "4px", // parent has border-radius of 5px
        borderBottomRightRadius: "4px",
        ...(!isAnnualTheOriginalSelection && {
          paddingBottom: "0.5rem !important",
        }),
      })}
    >
      {isAnnualTheOriginalSelection ? (
        <div className={checkoutPageClassNames.priceInfoRow}>
          <Text variant="body2">You're saving 16% with annual billing!</Text>
          <Chip label="16% Off" />
        </div>
      ) : (
        <>
          {/*  TOP  */}
          <div className={checkoutPageClassNames.priceInfoRow}>
            <Text>Save 16% with annual billing</Text>
            <Chip label="Save 16%" />
          </div>
          {/*  BOTTOM  */}
          <div className={checkoutPageClassNames.priceInfoRow}>
            <Tooltip title="Save 16% with annual billing">
              <Switch
                checked={isAnnualSelected}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                color={isAnnualSelected ? "success" : undefined}
                disabled={checkoutFormFetchState.isLoading || !!checkoutFormFetchState.error}
              />
            </Tooltip>
            <Box
              className={isAnnualSelected ? "slide-x" : undefined}
              style={{
                height: "2rem",
                width: "100%",
                overflow: "clip",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CheckmarkIcon
                color="success"
                style={{
                  fontSize: "2rem",
                  position: "absolute",
                  transition: "all 0.5s",
                  ...(isAnnualSelected
                    ? { opacity: 1, right: 0, transform: "rotateZ(360deg)" }
                    : { opacity: 0, right: "85%", transform: "rotateZ(-90deg)" }),
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  transition: "all 0.5s",
                  // prettier-ignore
                  ...(isAnnualSelected
                    ? { opacity: 0, right: "-85%" }
                    : { opacity: 1, right: 0 }),
                }}
              >
                $50.00 / year
              </Text>
            </Box>
          </div>
        </>
      )}
    </Box>
  );
};
