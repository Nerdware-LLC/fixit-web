import { styled, alpha } from "@mui/material/styles";
import { NoWrapSpace } from "@/components/Text/NoWrapSpace.jsx";

/**
 * A span-container which displays leading dots before a sibling text node.
 */
export const LeadingDotsSpan = ({ ...spanProps }: LeadingDotsSpanProps) => (
  <StyledSpan {...spanProps}>
    <NoWrapSpace />
  </StyledSpan>
);

const StyledSpan = styled("span")(({ theme: { palette } }) => ({
  display: "inline-flex",
  flexGrow: 1,
  lineHeight: "inherit",
  // `border-style:dotted` makes dots that are too small and close together, hence the below styles
  backgroundImage: `linear-gradient(to right, ${alpha(palette.text.primary, 0.5)} 33%, rgba(255,255,255,0) 0%)`,
  backgroundPositionX: "1px",
  backgroundPositionY: "calc(100% - 2px)", // up 2px from the bottom (2px = height of the line/dots)
  backgroundSize: "6px 2px",
  backgroundRepeat: "repeat-x",
}));

export type LeadingDotsSpanProps = React.ComponentProps<typeof StyledSpan>;
