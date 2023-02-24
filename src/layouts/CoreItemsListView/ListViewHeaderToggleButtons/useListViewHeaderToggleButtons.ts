import { useListOrTable } from "./useListOrTable";
import { useListVisibility } from "./useListVisibility";

export const useListViewHeaderToggleButtons = (numLists: number = 1) => {
  const { listOrTable, handleChangeListOrTable } = useListOrTable();
  const { listVisibility, handleChangeListVisibility } = useListVisibility();

  return {
    listOrTable,
    handleChangeListOrTable,
    ...(numLists > 1 && {
      listVisibility,
      handleChangeListVisibility
    })
  };
};
