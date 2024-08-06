import { isString } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";

export type PolicyInfoTableProps = {
  headers: Array<React.ReactNode>;
  dataRows: Array<Array<React.ReactNode>>;
} & Omit<React.ComponentProps<typeof StyledTable>, "children">;

/**
 * A simple table for displaying policy information.
 */
export const PolicyInfoTable = ({ headers, dataRows, ...tableProps }: PolicyInfoTableProps) => (
  <StyledTable {...tableProps}>
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={isString(header) ? header : index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {dataRows.map((row, index) => (
        <tr key={isString(row[0]) ? row[0] : index}>
          {row.map((cell, index) => (
            <td key={isString(cell) ? cell : index}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

const StyledTable = styled("table")(({ theme: { palette } }) => ({
  borderCollapse: "collapse",

  "& th,td": {
    padding: "0.75rem",
    border: `1px solid ${palette.grey[700]}`,
  },
}));
