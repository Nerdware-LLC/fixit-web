import { forwardRef, type ForwardedRef } from "react";
import Text from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, type LinkProps } from "./Link";
import { useMaybeAnchorRef } from "./useMaybeAnchorRef";
import type { MaybeAnchorRef } from "./types";

/**
 * A react-router-dom Link to a WorkOrder with ref forwarding.
 *
 * - If no `children` are provided, a default text node is rendered with
 *   "View Work Order" and a right-facing chevron icon.
 *
 * - If `state` is provided, it's merged with the default state object set
 *   using the `isWorkOrderOwnedByUser` prop.
 */
export const LinkToWorkOrder = forwardRef<MaybeAnchorRef, LinkToWorkOrderProps>(
  function LinkToWorkOrder(
    { workOrderID, isWorkOrderOwnedByUser, state = {}, children, ...props }: LinkToWorkOrderProps,
    ref: ForwardedRef<MaybeAnchorRef>
  ) {
    const anchorRef = useMaybeAnchorRef(ref);

    return (
      <Link
        ref={anchorRef}
        to={`/home/workorders/${encodeURIComponent(workOrderID)}`}
        state={{ isItemOwnedByUser: isWorkOrderOwnedByUser, ...state }}
        sx={(theme) => ({
          color: theme.palette.secondary.main
        })}
        {...props}
      >
        {children ?? (
          <>
            <Text>View Work Order</Text>
            <ChevronRightIcon />
          </>
        )}
      </Link>
    );
  }
);

export type LinkToWorkOrderProps = {
  workOrderID: string;
  isWorkOrderOwnedByUser: boolean;
  children?: React.ReactNode; // optional, since there's a default fallback
} & Omit<LinkProps, "to" | "children">;
