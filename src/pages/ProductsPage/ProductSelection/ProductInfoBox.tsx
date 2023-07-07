import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { ShimmerBox, shimmerBoxClassNames } from "@components/Containers/ShimmerBox";
import { ProductFeatures } from "./ProductFeatures";

export const ProductInfoBox = ({
  priceName,
  priceAmount,
  priceDescription,
  showMostPopularBadge = false,
  buttonLabel,
  onClickButton,
  onClickContainer,
  ...paperProps
}: ProductInfoBoxProps) => (
  <StyledPaper
    onClick={onClickContainer}
    className={productInfoBoxClassNames.container}
    {...paperProps}
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
                : { textAlign: "center", lineHeight: "1.2rem" }),
            }}
          >
            {priceDescription}
          </Text>
        </span>
      </div>
      <ProductFeatures />
      <Button onClick={onClickButton}>{buttonLabel}</Button>
    </div>
  </StyledPaper>
);

export const productInfoBoxClassNames = {
  container: "product-info-box-container",
  headerContainer: "product-info-box-header-container",
  amountAndDescriptionContainer: "product-info-box-amount-and-description-container",
};

const StyledPaper = styled(Paper)(({ onClick, theme: { palette, breakpoints } }) => ({
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
  borderColor: palette.divider,

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
  buttonLabel: string;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickContainer?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
} & Omit<PaperProps, "children">;
