import React, { forwardRef } from "react";
import { Link as RrdLink, type LinkProps as RrdLinkProps } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { navigationClassNames } from "./classNames.js";
import { getDefaultLinkStyles } from "./styles.js";

/**
 * A styled react-router-dom `Link` with ref forwarding.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, className = "", children, ...linkProps },
  ref
) {
  const anchorRef = useMaybeRef(ref);

  return (
    <StyledRrdLink
      ref={anchorRef}
      to={to}
      className={navigationClassNames.linkRoot + ` ${className}`}
      {...linkProps}
    >
      {children}
    </StyledRrdLink>
  );
});

export const StyledRrdLink = styled(RrdLink)(getDefaultLinkStyles);

export type LinkProps = React.ComponentProps<typeof StyledRrdLink> & RrdLinkProps;
