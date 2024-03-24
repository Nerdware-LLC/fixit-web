import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { chipClasses as muiChipClasses } from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Text, { typographyClasses } from "@mui/material/Typography";
import { checkoutValuesStore } from "@/stores";
import { fmt } from "@/utils/formatters";
import { PromoCodeInput } from "./PromoCodeInput";
import { SwitchToAnnual } from "./SwitchToAnnual";
import { checkoutPageClassNames } from "./classNames";
import { checkoutPageElementIDs } from "./elementIDs";
import { SUB_PRICING_DISPLAY_CONFIGS, getPrice_FOR_DISPLAY_ONLY } from "./helpers";

/**
 * **SubCostDetails** displays pricing info the the user.
 *
 * > `The values used here are for DISPLAY PURPOSES ONLY and merely
 *   convey information to the user. All pricing/product info is stored
 *   and calculated by the backend API. Sending invalid pricing/product
 *   info to the server results a 400 response.`
 */
export const SubCostDetails = () => {
  // Route protection guarantees that these values are defined, hence the as cast
  const { selectedSubscription, discountPercentage: discount } =
    checkoutValuesStore.useSubToStore<true>();

  const { label, price, billingPeriod, trialDays, afterTrial } =
    SUB_PRICING_DISPLAY_CONFIGS[selectedSubscription];

  const priceStr = fmt.intToCurrencyStr(price);
  const afterTrialPriceStr = afterTrial ? fmt.intToCurrencyStr(afterTrial.price) : null;

  return (
    <StyledDiv>
      <div id={checkoutPageElementIDs.priceHeaderRoot}>
        <Text>{label}</Text>
        <div>
          <Text>{billingPeriod ? priceStr : `${trialDays} days free`}</Text>
          {!!billingPeriod && <span>{`per\n${billingPeriod}`}</span>}
        </div>
      </div>
      <Box
        style={{ borderWidth: "1px", borderStyle: "solid", borderRadius: "5px" }}
        borderColor="divider"
      >
        <div className={checkoutPageClassNames.priceInfoRow}>
          <Text style={{ whiteSpace: "normal" }}>Fixit Subscription</Text>
          <Text style={{ textAlign: "right" }}>
            {billingPeriod ? `${priceStr} / ${billingPeriod}` : `${trialDays} days free`}
          </Text>
        </div>
        <div
          className={checkoutPageClassNames.priceInfoRow}
          style={{ maxHeight: "1rem", alignItems: "flex-end" }}
        >
          <Text variant="body2">
            {billingPeriod
              ? `Billed ${billingPeriod}ly`
              : afterTrial && afterTrialPriceStr
                ? `Then ${afterTrialPriceStr} per ${afterTrial.billingPeriod} thereafter`
                : ""}
          </Text>
        </div>
        <SwitchToAnnual />
      </Box>
      <div className={checkoutPageClassNames.priceInfoRow}>
        <Text>Subtotal</Text>
        <Text>{priceStr}</Text>
      </div>
      {selectedSubscription !== "TRIAL" && (
        <>
          <Divider />
          <PromoCodeInput />
        </>
      )}
      <Divider />
      {!!afterTrial && (
        <div className={checkoutPageClassNames.priceInfoRow} style={{ paddingBottom: 0 }}>
          <Text>Total after trial</Text>
          <Text>
            {getPrice_FOR_DISPLAY_ONLY(afterTrial.price, discount, { formatAsCurrency: true })}
          </Text>
        </div>
      )}
      <div className={checkoutPageClassNames.priceInfoRow} style={{ paddingBottom: 0 }}>
        <Text>Total due today</Text>
        <Text>{getPrice_FOR_DISPLAY_ONLY(price, discount, { formatAsCurrency: true })}</Text>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  whiteSpace: "nowrap",

  // DEFAULT body1 TEXT SLIGHTLY LARGER THAN NORMAL:
  [`& .${typographyClasses.body1}`]: {
    fontSize: "clamp(1rem, 4vw, 1.15rem)",
    lineHeight: "1.5rem",
  },

  [`& > #${checkoutPageElementIDs.priceHeaderRoot}`]: {
    marginBottom: "1rem",

    "& > div:first-of-type": {
      display: "flex",
      alignItems: "center",
      whiteSpace: "pre",

      [`& > .${typographyClasses.root}:first-of-type`]: {
        fontSize: "clamp(2.5rem, 10vw, 3rem)",
        lineHeight: "3.25rem",
        margin: "0 0.5rem 0 0",
      },

      "& > span:first-of-type": {
        width: "100%",
        display: "inline-block",
        whiteSpace: "pre",
        fontWeight: "normal",
        lineHeight: "1.35rem",
      },

      [`& > .${typographyClasses.root}.${typographyClasses.caption}`]: {
        margin: "0.1rem 0 0 0",
      },
    },
  },

  [`& .${checkoutPageClassNames.priceInfoRow}`]: {
    position: "relative",
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },

  [`& .${muiChipClasses.root}`]: {
    marginLeft: "auto",
    fontWeight: "bold",
    borderRadius: "3px",
  },
});
