import { styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";
import Paper, { type PaperProps } from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { ShimmerBox, containerClassNames } from "@/components/Containers";
import { ProductFeatures } from "./ProductFeatures.jsx";
import { productSelectionClassNames } from "./classNames.js";

export type ProductInfoBoxProps = {
  priceName: string;
  priceAmount: string;
  priceDescription: string;
  showMostPopularBadge?: boolean;
  buttonLabel: string;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickContainer?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
} & Omit<PaperProps, "children">;

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
  <StyledPaper onClick={onClickContainer} {...paperProps}>
    <Paper elevation={2} className={productSelectionClassNames.productInfoBoxHeaderRoot}>
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
      <div className={productSelectionClassNames.productInfoBoxPriceInfoRoot}>
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

const StyledPaper = styled(Paper)(({ onClick, theme: { palette, variables } }) => ({
  position: "relative",
  height: "clamp(24rem, 43vh, 25rem)",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  borderStyle: "solid",
  borderRadius: "1rem",
  borderColor: palette.divider,

  ...(variables.isMobilePageLayout
    ? {
        width: "clamp(15rem, 100%, 25rem)",
        maxWidth: "25rem",
        borderWidth: "1px",
      }
    : {
        width: "clamp(15rem, 30%, 20rem)",
        maxWidth: "20rem",
        borderWidth: "4px",
      }),

  "&:hover": {
    cursor: onClick ? "pointer" : "auto",
  },

  [`& > .${productSelectionClassNames.productInfoBoxHeaderRoot}`]: {
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

    [`& > .${containerClassNames.shimmerBoxRoot} .${typographyClasses.root}`]: {
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

    [`& > .${productSelectionClassNames.productInfoBoxPriceInfoRoot}`]: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      whiteSpace: "pre-line",

      // PRICE AMOUNT TEXT
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
