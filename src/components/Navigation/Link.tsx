import { forwardRef } from "react";
import { Link as RRDomLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useMaybeRef, type MaybeRef } from "@hooks/useMaybeRef";
import { defaultLinkStyles } from "./styles";

/**
 * A styled react-router-dom Link with ref forwarding.
 */
export const Link = forwardRef<MaybeRef<HTMLAnchorElement>, LinkProps>(function Link(
  { to, children, ...props },
  ref
) {
  const anchorRef = useMaybeRef(ref);

  return (
    <StyledLink ref={anchorRef} to={to} {...props}>
      {children}
    </StyledLink>
  );
});

export const StyledLink = styled(RRDomLink)(defaultLinkStyles);

export type LinkProps = React.ComponentProps<typeof StyledLink>;
