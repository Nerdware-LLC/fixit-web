import { Fragment } from "react";
import { styled, alpha } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { getInlineSvgDataUrl } from "@/app/GlobalStyles/helpers.js";
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
  height: "4rem",
  width: "100%",
  padding: "0.5rem 1rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: `2px solid ${palette.divider}`,
  borderBottomWidth: 0,
  borderRadius: "0.25rem 0.25rem 0 0",
  position: "relative",
  color: alpha(palette.text.primary, 0.75),

  "&::after": {
    content: "' '",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundImage: getInlineSvgDataUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <polyline points="0 45 25 30 50 45" fill="none" stroke="gray" stroke-width="3px" stroke-opacity="0.75" />
      </svg>`
    ),
    backgroundPosition: "bottom",
    backgroundRepeat: "repeat-x",
    backgroundSize: "0.91rem",
  },

  [`& > .${typographyClasses.root}`]: {
    margin: "0 0.25rem",
  },
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
