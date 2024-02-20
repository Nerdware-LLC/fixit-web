import Text from "@mui/material/Typography";
import {
  EmptyListFallback,
  type EmptyListFallbackProps,
} from "@/components/List/subComponents/EmptyListFallback";
import { _makeDataGridCustomSlotModuleExports } from "./helpers";
import type { Simplify } from "type-fest";

/**
 * A custom `noRowsOverlay` for `DataGrid` components to provide an
 * aesthetically refined and consistent fallback UI for empty DataGrids.
 */
export const DataGridCustomNoRowsOverlay = ({
  nameOfMissingItems,
  backgroundIcon,
  ...containerProps
}: DataGridCustomNoRowsOverlayProps) => (
  <EmptyListFallback
    backgroundIcon={backgroundIcon}
    text={`No ${nameOfMissingItems} Available`}
    tooltip={
      <Text
        sx={({ palette: { mode, primary } }) => ({
          lineHeight: "1.25rem",
          "& > b": {
            color: mode === "dark" ? primary.main : primary.light,
            fontStyle: "italic",
          },
        })}
      >
        This <b>super-charged</b> data table makes it easy to manage your {nameOfMissingItems}!
      </Text>
    }
    {...containerProps}
  />
);

export type DataGridCustomNoRowsOverlayProps = Simplify<
  {
    /** The name of the missing items, e.g. `"Invoices"`. */
    nameOfMissingItems: string;
  } & Omit<EmptyListFallbackProps, "text" | "tooltip">
>;

export const noRowsOverlaySlot = _makeDataGridCustomSlotModuleExports({
  slotName: "noRowsOverlay",
  component: DataGridCustomNoRowsOverlay,
});
