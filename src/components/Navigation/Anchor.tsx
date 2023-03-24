import { forwardRef, type ForwardedRef } from "react";
import { styled } from "@mui/material/styles";
import { useMaybeAnchorRef } from "./useMaybeAnchorRef";
import { defaultLinkStyles } from "./styles";
import type { MaybeAnchorRef } from "./types";

/**
 * A styled anchor element with ref forwarding.
 *
 * - If an external URL is provided to `href`, the attributes `target="_blank"`
 *   and `rel="noreferrer"` are set automatically, and the `textDecoration` style
 *   defaults to "underline".
 */
export const Anchor = forwardRef<MaybeAnchorRef, AnchorProps>(function Anchor(
  { href, children, ...props }: AnchorProps,
  ref: ForwardedRef<MaybeAnchorRef>
) {
  const anchorRef = useMaybeAnchorRef(ref);

  const isExternalUrl = href && href.startsWith("http") && !href.includes("gofixit.app");

  return (
    <StyledAnchor
      ref={anchorRef}
      href={href}
      {...(isExternalUrl && {
        target: "_blank",
        rel: "noreferrer"
      })}
      {...props} // allow rest props to override above attrs set via `isExternal` condition
    >
      {children ?? href}
    </StyledAnchor>
  );
});

export const StyledAnchor = styled("a")(defaultLinkStyles);

export type AnchorProps = Omit<React.ComponentProps<typeof StyledAnchor>, "children"> & {
  children?: React.ReactNode;
};
