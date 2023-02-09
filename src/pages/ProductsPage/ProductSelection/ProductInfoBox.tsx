import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MostPopularShimmerBadge } from "./MostPopularShimmerBadge";
import { ProductFeaturesList } from "./ProductFeaturesList";

export const ProductInfoBox = ({
  priceName,
  priceAmount,
  priceDescription,
  showMostPopularBadge = false,
  isSelected = false,
  handleClickProduct,
  buttonLabel
}: {
  priceName: string;
  priceAmount: string;
  priceDescription: string;
  showMostPopularBadge?: boolean;
  isSelected?: boolean;
  handleClickProduct?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  buttonLabel?: string;
}) => {
  const nav = useNavigate();

  const handleClickCheckout = () => nav("/checkout");

  return (
    <Paper
      onClick={handleClickProduct}
      className="product-info-box-container"
      sx={({ palette, breakpoints }) => ({
        position: "relative",
        height: "clamp(24rem, 43vh, 25rem)",
        width: "clamp(15rem, 100%, 25rem)",
        maxWidth: "25rem",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "1rem",
        borderColor: isSelected ? palette.secondary.main : palette.divider,
        "&:hover": {
          cursor: handleClickProduct ? "pointer" : "auto"
        },
        [`@media (min-width: ${breakpoints.values.md}) or (min-aspect-ratio: 1/1)`]: {
          width: "clamp(15rem, 30%, 20rem)",
          maxWidth: "20rem",
          borderWidth: "4px"
        }
      })}
    >
      <Paper
        elevation={2}
        style={{
          alignSelf: "center",
          height: "4rem",
          width: "100%",
          borderRadius: "0.75rem 0.75rem 0 0",
          padding: "1.25rem 1rem 1rem 1rem",
          marginBottom: "0.25rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            textAlign: "center"
          }}
        >
          {priceName}
        </Text>

        {showMostPopularBadge && (
          <>
            <span style={{ width: "1rem" }} />
            <MostPopularShimmerBadge />
          </>
        )}
      </Paper>
      <div
        style={{
          flexGrow: 1,
          padding: "clamp(1rem, 2.5%, 1.5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          textAlign: "left"
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "pre-line"
          }}
        >
          <Text
            variant="h3"
            sx={{
              fontSize: "2.25rem",
              margin: "0.15rem 0 0 0",
              color: ({ palette }) => (palette.mode === "dark" ? "#85BB65" : palette.text.primary)
            }}
          >
            {priceAmount}
          </Text>
          <span
            style={{
              width: "100%",
              display: "inline-block",
              whiteSpace: "pre",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            <Text
              style={{
                fontSize: "1rem",
                fontWeight: "normal",
                lineHeight: "1.1rem",
                // if priceDescription is "per month/year", align left + margin, else just align center
                ...(/^per/i.test(priceDescription)
                  ? { textAlign: "left", marginLeft: "0.35rem" }
                  : { textAlign: "center" })
              }}
            >
              {priceDescription}
            </Text>
          </span>
        </div>
        <ProductFeaturesList />
        <Button
          onClick={!!handleClickProduct && !isSelected ? handleClickProduct : handleClickCheckout}
          style={{
            height: "3rem",
            width: "100%",
            marginTop: "1rem"
          }}
        >
          {buttonLabel ?? (!!handleClickProduct && !isSelected ? "Select" : "Subscribe")}
        </Button>
      </div>
    </Paper>
  );
};
