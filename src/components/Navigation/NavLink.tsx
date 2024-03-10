import { forwardRef } from "react";
import { NavLink as ReactRouterDomNavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";
import { useMaybeRef } from "@/hooks/useMaybeRef";
import { getDefaultLinkStyles } from "./styles";
import type { OverrideProperties } from "type-fest";

/**
 * A styled react-router-dom `NavLink` with ref forwarding which renders a
 * Mui `CircularProgress` when the `NavLink` is pending, as determined by the
 * `isPending` render-prop state param.
 *
 * @see https://reactrouter.com/en/main/components/nav-link
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function Link(
  { to, end = true, circularProgressProps = {}, children, ...navLinkProps },
  ref
) {
  const anchorRef = useMaybeRef(ref);

  return (
    <StyledReactRouterDomNavLink
      ref={anchorRef}
      to={to}
      end={end}
      style={({ isPending }) => ({
        position: "relative",
        ...(isPending && { pointerEvents: "none" }),
      })}
      {...navLinkProps}
    >
      {({ isPending }) => (
        <>
          <span
            style={{
              ...(isPending && {
                // children are hidden using vis to ensure the NavLink maintains the same size
                visibility: "hidden",
              }),
            }}
          >
            {children}
          </span>
          {isPending && (
            <CircularProgress
              size="1.75rem"
              color="inherit"
              style={{ position: "absolute" }}
              {...circularProgressProps}
            />
          )}
        </>
      )}
    </StyledReactRouterDomNavLink>
  );
});

export const StyledReactRouterDomNavLink = styled(ReactRouterDomNavLink)(getDefaultLinkStyles);

export type NavLinkProps = OverrideProperties<
  React.ComponentProps<typeof StyledReactRouterDomNavLink>,
  {
    children: React.ReactNode;
  }
> & {
  circularProgressProps?: CircularProgressProps;
};
