import { forwardRef } from "react";
import { Link as ReactRouterDomLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { getDefaultLinkStyles } from "./styles.js";

/**
 * A styled react-router-dom `Link` with ref forwarding.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...linkProps },
  ref
) {
  const anchorRef = useMaybeRef(ref);

  return (
    <StyledReactRouterDomLink ref={anchorRef} to={to} {...linkProps}>
      {children}
    </StyledReactRouterDomLink>
  );
});

export const StyledReactRouterDomLink = styled(ReactRouterDomLink)(getDefaultLinkStyles);

export type LinkProps = React.ComponentProps<typeof StyledReactRouterDomLink>;
