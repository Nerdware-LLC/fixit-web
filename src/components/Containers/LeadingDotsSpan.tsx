import { styled, alpha } from "@mui/material/styles";

/**
 * A span-container which displays leading dots before a child text node.
 */
export const LeadingDotsSpan = ({ ...spanProps }: LeadingDotsSpanProps) => (
  <StyledSpan {...spanProps}>{".".repeat(100)}</StyledSpan>
);

const StyledSpan = styled("span")(({ theme: { palette } }) => ({
  color: alpha(palette.text.primary, 0.5),
  overflowX: "clip",
}));

export type LeadingDotsSpanProps = React.ComponentProps<typeof StyledSpan>;
