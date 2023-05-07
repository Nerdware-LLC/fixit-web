import { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Text, { typographyClasses } from "@mui/material/Typography";
import { checkoutValuesStore, type CheckoutValues } from "@cache/checkoutValuesStore";
import { checkoutPageClassNames } from "./classNames";

export const SwitchToAnnual = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore() as CheckoutValues;
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

    checkoutValuesStore.set({
      promoCode,
      selectedSubscription: ["TRIAL", "MONTHLY"].includes(selectedSubscription)
        ? "ANNUAL"
        : originalSelectedSubRef.current,
    });
  };

  return (
    <StyledDiv className={checkoutPageClassNames.subCostDetails.priceInfoRow}>
      {!(originalSelectedSubRef.current === null && selectedSubscription === "ANNUAL") ? (
        <>
          <div>
            <Tooltip title="Save with annual billing">
              <Switch
                checked={selectedSubscription === "ANNUAL"}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                color={selectedSubscription === "ANNUAL" ? "success" : undefined}
              />
            </Tooltip>
            <Text>Save with annual billing</Text>
            <DiscountInfoChip />
          </div>
          {selectedSubscription !== "ANNUAL" && (
            <Text className={checkoutPageClassNames.switchToAnnual.priceText}>$50.00 / year</Text>
          )}
        </>
      ) : (
        <>
          <Text>You're saving 16% with an annual subscription</Text>
          <DiscountInfoChip />
        </>
      )}
    </StyledDiv>
  );
};

const DiscountInfoChip = () => <Chip label="16% off" color="success" size="small" />;

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.divider,

  // This div is rendered if ANNUAL has not been selected
  "& > div:first-of-type": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...(theme.variables.isMobilePageLayout && { marginTop: "2rem" }),

    [`& > .${typographyClasses.root}`]: {
      ...(theme.variables.isMobilePageLayout
        ? {
            position: "absolute",
            top: "1rem",
            left: "1rem",
            whiteSpace: "nowrap",
          }
        : { whiteSpace: "normal" }),
    },

    // Note: the Mui Chip is styled in SubCostDetails
  },

  [`& > .${checkoutPageClassNames.switchToAnnual.priceText}`]: {
    textAlign: "right",
    marginLeft: "1rem",
    whiteSpace: "nowrap",
    ...(theme.variables.isMobilePageLayout && { marginTop: "2rem" }),
  },
}));
