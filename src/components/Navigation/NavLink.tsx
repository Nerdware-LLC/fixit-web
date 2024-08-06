import React, { forwardRef } from "react";
import { NavLink as RrdNavLink } from "react-router-dom";
import { isFunction } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";
import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { getDefaultLinkStyles } from "./styles.js";
import type { Simplify } from "type-fest";

export type NavLinkProps = Simplify<
  React.ComponentProps<typeof StyledRrdNavLink> & {
    circularProgressProps?: CircularProgressProps;
  }
>;

/**
 * A styled react-router-dom `NavLink` with ref forwarding which renders a
 * Mui `CircularProgress` when the `NavLink` is pending, as determined by the
 * `isPending` render-prop state param.
 *
 * @see https://reactrouter.com/en/main/components/nav-link
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function Link(
  {
    to,
    /**
     * The end prop changes the matching logic for the "active" and "pending"
     * states to only match to the "end" of the NavLink's "to" path. If the URL
     * is longer than "to", it will no longer be considered active.
     */
    end = true,
    style,
    circularProgressProps = {},
    children,
    ...navLinkProps
  },
  ref
) {
  const anchorRef = useMaybeRef(ref);

  return (
    <StyledRrdNavLink
      ref={anchorRef}
      to={to}
      end={end}
      style={({ isActive, isPending, isTransitioning }) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...(isPending && { pointerEvents: "none" }),
        ...(style && {
          ...(isFunction(style) ? style({ isActive, isPending, isTransitioning }) : style),
        }),
      })}
      {...navLinkProps}
    >
      {({ isActive, isPending, isTransitioning }) => (
        <>
          <span
            style={{ ...(isPending && { visibility: "hidden" }) }}
            // children are hidden using vis to ensure the NavLink maintains the same size
          >
            {isFunction(children) ? children({ isActive, isPending, isTransitioning }) : children}
          </span>
          {isPending && (
            <span
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size="1.75rem" color="inherit" {...circularProgressProps} />
            </span>
          )}
        </>
      )}
    </StyledRrdNavLink>
  );
});

export const StyledRrdNavLink = styled(RrdNavLink)(getDefaultLinkStyles);
