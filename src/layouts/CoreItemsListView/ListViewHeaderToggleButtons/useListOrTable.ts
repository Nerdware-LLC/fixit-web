import { useState } from "react";
import type { ListOrTable, HandleChangeListOrTable } from "./types";

export const useListOrTable = () => {
  const [listOrTable, setListOrTable] = useState<ListOrTable>("TABLE");

  const handleChangeListOrTable: HandleChangeListOrTable = (event, newValue) => {
    if (newValue !== null) setListOrTable(newValue);
  };

  return {
    listOrTable,
    handleChangeListOrTable
  };
};
