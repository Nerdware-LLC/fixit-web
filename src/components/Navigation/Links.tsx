import { Link as RRDomLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

export const Link = styled(RRDomLink)<LinkColor>(({ theme, themecolor = "secondary" }) => ({
  color: theme.palette[themecolor].main
}));

export const StyledAnchor = styled("a")<LinkColor>(({ theme, themecolor = "secondary" }) => ({
  color: theme.palette[themecolor].main
}));

export const AnchorLink = ({
  href,
  linkText,
  children,
  ...props
}: {
  href: string;
  linkText?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof StyledAnchor>) => (
  <StyledAnchor href={href} {...props}>
    {linkText ?? children ?? href}
  </StyledAnchor>
);

/**
 * `<AnchorLink>`, with attributes `target="_blank"` and `rel="noreferrer"`.
 */
export const TextExternalLink = ({
  href,
  linkText,
  children,
  ...props
}: {
  href: string;
  linkText?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof StyledAnchor>) => (
  <StyledAnchor href={href} target="_blank" rel="noreferrer" {...props}>
    {linkText ?? children ?? href}
  </StyledAnchor>
);

export interface LinkColor {
  themecolor?: "primary" | "secondary" | "info";
}
