import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { isExternalUrl } from "@/routes/helpers.js";
import { getDefaultLinkStyles } from "./styles.js";
import type { Simplify } from "type-fest";

/**
 * A styled anchor element with ref forwarding.
 *
 * > If an external URL is provided to `href`, the attributes `target="_blank"`
 *   and `rel="noreferrer"` are set automatically, and the `textDecoration` style
 *   defaults to "underline".
 */
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(function Anchor(
  { href, children, ...props },
  ref
) {
  const anchorRef = useMaybeRef(ref);

  return (
    <StyledAnchor
      ref={anchorRef}
      href={href}
      {...(isExternalUrl(href) && {
        target: "_blank",
        rel: "noreferrer",
      })}
      {...props} // allow rest props to override above attrs set via `isExternal` condition
    >
      {children ?? href}
    </StyledAnchor>
  );
});

export const StyledAnchor = styled("a")(getDefaultLinkStyles);

export type AnchorProps = Simplify<
  Omit<React.ComponentProps<typeof StyledAnchor>, "children"> & {
    children?: React.ReactNode;
  }
>;
