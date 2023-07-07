import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { EmptyListFallback, type EmptyListFallbackProps } from "@components/HelpInfo";

/**
 * An `EmptyListFallback` component for DataGrid `noRowsOverlay` slots
 * which provides an aesthetically refined and consistent fallback UI
 * for empty DataGrids.
 */
export const EmptyDataGridFallback = ({
  nameOfMissingItems,
  children,
  ...props
}: EmptyDataGridFallbackProps) => (
  <EmptyListFallback
    text={`No ${nameOfMissingItems} Available`}
    tooltip={
      // prettier-ignore
      <StyledText>
        This <b>super-charged</b> data table makes it easy to manage your {nameOfMissingItems}!
      </StyledText>
    }
    {...props}
  >
    {children}
  </EmptyListFallback>
);

const StyledText = styled(Text)(({ theme: { palette } }) => ({
  lineHeight: "1.25rem",

  "& > b": {
    color: palette.mode === "dark" ? palette.primary.main : palette.primary.light,
    fontStyle: "italic",
  },
}));

/**
 * @type EmptyDataGridFallbackProps
 * @property nameOfMissingItems - The name of the missing items, e.g. `"Invoices"`
 */
export type EmptyDataGridFallbackProps = {
  nameOfMissingItems: string;
} & Omit<EmptyListFallbackProps, "text" | "tooltip">;
