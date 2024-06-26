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
  function LinkToWorkOrder({ workOrderID, children, ...props }, ref) {
    const anchorRef = useMaybeRef(ref);

    return (
      <Link
        ref={anchorRef}
        to={getItemViewPath("workorders", workOrderID)}
        sx={({ palette }) => ({ color: palette.secondary.main })}
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
  children?: React.ReactNode; // optional, since there's a default fallback
} & Omit<LinkProps, "to" | "children">;
