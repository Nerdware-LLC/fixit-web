import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { svgIconClasses } from "@mui/material/SvgIcon";
import Text, { type TypographyProps } from "@mui/material/Typography";
import { dataDisplayClassNames } from "./classNames.js";

export const ItemDetailsHeader = ({
  label,
  labelIcon,
  labelVariant = "h6",
  headerComponents,
  className = "",
  ...boxProps
}: ItemDetailsHeaderProps) => (
  <StyledBox className={dataDisplayClassNames.header + " " + className} {...boxProps}>
    {label && (
      <>
        {labelIcon}
        <Text className={dataDisplayClassNames.label} variant={labelVariant}>
          {label}
        </Text>
      </>
    )}
    {headerComponents}
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  width: "100%",
  minHeight: "1rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.75rem",

  // CHILDREN: icon + label + headerComponents
  "& > *": {
    color: palette.text.primary,
    lineHeight: 1,

    // ICON
    [`&.${svgIconClasses.root}`]: {
      opacity: 0.75,
    },

    // LABEL
    [`&.${dataDisplayClassNames.label}`]: {
      opacity: 0.7,
      fontSize: "0.9rem",
      fontWeight: palette.mode === "dark" ? 200 : "normal",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    },
  },
}));

export type ItemDetailsHeaderProps = {
  label?: string;
  labelIcon?: React.ReactNode;
  labelVariant?: TypographyProps["variant"];
  headerComponents?: React.ReactNode;
} & Omit<BoxProps, "children">;
