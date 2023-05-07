import { useState } from "react";
import type { ListOrTable, HandleChangeListOrTable } from "./types";

export const useListOrTable = ({ isMobilePageLayout }: { isMobilePageLayout: boolean }) => {
  const [listOrTable, setListOrTable] = useState<ListOrTable>(
    isMobilePageLayout ? "LIST" : "TABLE"
  );

  const handleChangeListOrTable: HandleChangeListOrTable = (event, newValue) => {
    if (newValue !== null) setListOrTable(newValue);
  };

  return {
    listOrTable,
    handleChangeListOrTable,
  };
};
