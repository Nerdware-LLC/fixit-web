import { forwardRef, type ForwardedRef } from "react";
import { Link as RRDomLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useMaybeAnchorRef } from "./useMaybeAnchorRef";
import { defaultLinkStyles } from "./styles";
import type { MaybeAnchorRef } from "./types";

/**
 * A styled react-router-dom Link with ref forwarding.
 */
export const Link = forwardRef<MaybeAnchorRef, LinkProps>(function Link(
  { to, children, ...props }: LinkProps,
  ref: ForwardedRef<MaybeAnchorRef>
) {
  const anchorRef = useMaybeAnchorRef(ref);

  return (
    <StyledLink ref={anchorRef} to={to} {...props}>
      {children}
    </StyledLink>
  );
});

export const StyledLink = styled(RRDomLink)(defaultLinkStyles);

export type LinkProps = React.ComponentProps<typeof StyledLink>;
