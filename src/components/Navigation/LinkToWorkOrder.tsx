import { forwardRef } from "react";
import Text from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMaybeRef } from "@/hooks/useMaybeRef.js";
import { getItemViewPath } from "@/routes/helpers.js";
import { Link, type LinkProps } from "./Link.jsx";

/**
 * A react-router-dom Link to a WorkOrder with ref forwarding.
 *
 * If no `children` are provided, a default text node is rendered
 * with `"View Work Order"` and a right-facing chevron icon.
 */
export const LinkToWorkOrder = forwardRef<HTMLAnchorElement, LinkToWorkOrderProps>(
  function LinkToWorkOrder(
    { workOrderID, style = {}, children, text = "View Work Order", ...props },
    ref
  ) {
    const anchorRef = useMaybeRef(ref);

    return (
      <Link
        ref={anchorRef}
        to={getItemViewPath("workorders", workOrderID)}
        style={{ display: "inline-flex", ...style }}
        {...props}
      >
        {children ?? (
          <>
            <Text style={{ textTransform: "capitalize" }}>{text}</Text>
            <ChevronRightIcon style={{ transform: "translate(-2px, 1px)" }} />
          </>
        )}
      </Link>
    );
  }
);

export type LinkToWorkOrderProps = Omit<LinkProps, "to" | "children"> & {
  workOrderID: string;
  text?: string | undefined;
  children?: React.ReactNode | undefined; // optional, since there's a default fallback
};
