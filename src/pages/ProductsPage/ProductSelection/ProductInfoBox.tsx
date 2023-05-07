import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { ShimmerBox, shimmerBoxClassNames } from "@components/Containers/ShimmerBox";
import { ProductFeatures } from "./ProductFeatures";

export const ProductInfoBox = ({
  priceName,
  priceAmount,
  priceDescription,
  showMostPopularBadge = false,
  isSelected = false,
  handleClickProduct,
  buttonLabel,
}: ProductInfoBoxProps) => {
  const nav = useNavigate();

  const handleClickCheckout = () => nav("/checkout");

  // If ProductInfoBox can be selected from a group (desktop) and isn't already selected, it's "selectable"
  const isSelectable = !!handleClickProduct && !isSelected;

  return (
    <StyledPaper
      onClick={handleClickProduct}
      isSelected={isSelected}
      className={productInfoBoxClassNames.container}
    >
      <Paper elevation={2} className={productInfoBoxClassNames.headerContainer}>
        <Text>{priceName}</Text>

        {showMostPopularBadge && (
          <>
            <span />
            <ShimmerBox>
              <Text>Most Popular</Text>
            </ShimmerBox>
          </>
        )}
      </Paper>
      <div>
        <div className={productInfoBoxClassNames.amountAndDescriptionContainer}>
          <Text variant="h3">{priceAmount}</Text>
          <span>
            <Text
              style={{
                // if priceDescription is "per month/year", align left + margin, else just align center
                ...(/^per/i.test(priceDescription)
                  ? { textAlign: "left", marginLeft: "0.35rem" }
                  : { textAlign: "center" }),
              }}
            >
              {priceDescription}
            </Text>
          </span>
        </div>
        <ProductFeatures />
        <Button onClick={isSelectable ? handleClickProduct : handleClickCheckout}>
          {buttonLabel ?? (isSelectable ? "Select" : "Subscribe")}
        </Button>
      </div>
    </StyledPaper>
  );
};

export const productInfoBoxClassNames = {
  container: "product-info-box-container",
  headerContainer: "product-info-box-header-container",
  amountAndDescriptionContainer: "product-info-box-amount-and-description-container",
};

const StyledPaper = styled(Paper, {
  shouldForwardProp: (propName) => propName !== "isSelected",
})<{ isSelected: boolean }>(({ onClick, theme: { palette, breakpoints }, isSelected }) => ({
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
    cursor: onClick ? "pointer" : "auto",
  },
  [`@media (min-width: ${breakpoints.values.md}) or (min-aspect-ratio: 1/1)`]: {
    width: "clamp(15rem, 30%, 20rem)",
    maxWidth: "20rem",
    borderWidth: "4px",
  },

  [`& > .${productInfoBoxClassNames.headerContainer}`]: {
    alignSelf: "center",
    height: "4rem",
    width: "100%",
    borderRadius: "0.75rem 0.75rem 0 0",
    padding: "1.25rem 1rem 1rem 1rem",
    marginBottom: "0.25rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    [`& > .${typographyClasses.root}`]: {
      fontSize: "2rem",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      textAlign: "center",
    },

    "& > span": {
      width: "1rem",
    },

    [`& > .${shimmerBoxClassNames.root} .${typographyClasses.root}`]: {
      fontSize: "0.9rem",
      paddingTop: "1px",
      color: palette.getContrastText(palette.grey[900]),
    },
  },

  "& > div:nth-of-type(2)": {
    flexGrow: 1,
    padding: "clamp(1rem, 2.5%, 1.5rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    textAlign: "left",

    [`& > .${productInfoBoxClassNames.amountAndDescriptionContainer}`]: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      whiteSpace: "pre-line",

      // price amount text
      [`& > .${typographyClasses.root}.${typographyClasses.h3}`]: {
        fontSize: "2.25rem",
        margin: "0.15rem 0 0 0",
        color: palette.mode === "dark" ? "#85BB65" : palette.text.primary,
      },

      "& > span": {
        display: "inline-block",
        width: "100%",
        whiteSpace: "pre",
        textOverflow: "ellipsis",
        overflow: "hidden",

        [`& > .${typographyClasses.root}`]: {
          fontSize: "1rem",
          fontWeight: "normal",
          lineHeight: "1.1rem",
        },
      },
    },

    [`& > .${buttonClasses.root}`]: {
      height: "3rem",
      width: "100%",
      marginTop: "1rem",
    },
  },
}));

export type ProductInfoBoxProps = {
  priceName: string;
  priceAmount: string;
  priceDescription: string;
  showMostPopularBadge?: boolean;
  isSelected?: boolean;
  handleClickProduct?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  buttonLabel?: string;
};
