import { Fragment } from "react";
import { styled, alpha } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { LeadingDotsSpan } from "./LeadingDotsSpan.jsx";

/**
 * This component is a container that has a receipt-like shape.
 */
export const ReceiptShapedContainer = ({
  receiptEntries,
  ...divProps
}: ReceiptShapedContainerProps) => (
  <StyledDiv {...divProps}>
    {receiptEntries.map(({ label, value }) => (
      <Fragment key={label}>
        <Text>{label}</Text>
        <LeadingDotsSpan />
        <Text>{value}</Text>
      </Fragment>
    ))}
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  height: "4.5rem",
  width: "100%",
  padding: "0 1rem 0.75rem 1rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: `2px inset ${palette.divider}`,
  borderBottomWidth: 0,
  borderRadius: "0.25rem 0.25rem 0 0",
  color: alpha(palette.text.primary, 0.85),
  overflow: "clip",
  backgroundColor: palette.divider,

  [`& > .${typographyClasses.root}`]: {
    margin: "0 0.25rem",
  },

  // This ensures correct placement of the leading-dots span:
  "& *": { height: "1rem", lineHeight: "1rem" },

  // This clip-path creates a jagged receipt-like shape along the bottom edge
  clipPath: `polygon(
    0 0, 100% 0, 100% 80%,
    95% 90%, 90% 80%, 85% 90%,
    80% 80%, 75% 90%, 70% 80%,
    65% 90%, 60% 80%, 55% 90%,
    50% 80%, 45% 90%, 40% 80%,
    35% 90%, 30% 80%, 25% 90%,
    20% 80%, 15% 90%, 10% 80%,
    5% 90%, 0 80%
  )`,
}));

export type ReceiptShapedContainerProps = Omit<
  React.ComponentProps<typeof StyledDiv>,
  "children"
> & {
  receiptEntries: Array<{
    label: string;
    value: string;
  }>;
};
