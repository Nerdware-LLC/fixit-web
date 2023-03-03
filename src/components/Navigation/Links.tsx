import { forwardRef, useRef, type ForwardedRef } from "react";
import { Link as RRDomLink } from "react-router-dom";
import { styled, type Theme } from "@mui/material/styles";

const linkColor = ({ theme, themecolor = "secondary" }: { theme: Theme } & LinkColor) => ({
  color: theme.palette[themecolor].main
});

export const Link = styled(RRDomLink)(linkColor);
export const StyledAnchor = styled("a")(linkColor);

export const AnchorLink = forwardRef<MaybeAnchorRef, LinkProps>(function AnchorLink(
  { href, linkText, children, ...props }: LinkProps,
  ref: ForwardedRef<MaybeAnchorRef>
) {
  // If parent does not forward a ref, use local fallback
  const localRef = useRef<HTMLAnchorElement>(null);
  const anchorRef = ref || localRef;

  return (
    <StyledAnchor ref={anchorRef} href={href} {...props}>
      {linkText ?? children ?? href}
    </StyledAnchor>
  );
});

/**
 * `<AnchorLink>`, with attributes `target="_blank"` and `rel="noreferrer"`.
 */
export const TextExternalLink = forwardRef<MaybeAnchorRef, LinkProps>(function TextExternalLink(
  { href, linkText, children, ...props }: LinkProps,
  ref: ForwardedRef<MaybeAnchorRef>
) {
  // If parent does not forward a ref, use local fallback
  const localRef = useRef<HTMLAnchorElement>(null);
  const anchorRef = ref || localRef;

  return (
    <StyledAnchor ref={anchorRef} href={href} target="_blank" rel="noreferrer" {...props}>
      {linkText ?? children ?? href}
    </StyledAnchor>
  );
});

type LinkProps = {
  href: string;
  linkText?: string;
  children?: React.ReactNode;
} & React.ComponentProps<typeof StyledAnchor>;

type MaybeAnchorRef = HTMLAnchorElement | null;

export interface LinkColor {
  themecolor?: "primary" | "secondary" | "info";
}
