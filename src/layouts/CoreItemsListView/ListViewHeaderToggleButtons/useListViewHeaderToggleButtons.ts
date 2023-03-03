import { useListOrTable } from "./useListOrTable";
import { useListVisibility } from "./useListVisibility";

export const useListViewHeaderToggleButtons = ({
  numLists = 1,
  isMobilePageLayout
}: {
  numLists: number;
  isMobilePageLayout: boolean;
}) => {
  const { listOrTable, handleChangeListOrTable } = useListOrTable({
    isMobilePageLayout
  });
  const { listVisibility, handleChangeListVisibility, toggleListVisibility } = useListVisibility({
    isMobilePageLayout
  });

  return {
    listOrTable,
    handleChangeListOrTable,
    ...(numLists > 1 && {
      listVisibility,
      handleChangeListVisibility,
      toggleListVisibility
    })
  };
};
