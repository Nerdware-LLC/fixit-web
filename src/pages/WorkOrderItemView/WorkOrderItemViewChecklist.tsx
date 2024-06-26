import { Checklist, ChecklistItem, type RenderChecklistItemFn } from "@/components/Checklist";
import { ItemDetails } from "@/components/DataDisplay/ItemDetails.jsx";
import type { WorkOrder, ChecklistItem as ChecklistItemType } from "@/types/graphql.js";

/**
 * WorkOrder ItemView Checklist component.
 */
export const WorkOrderItemViewChecklist = ({
  label,
  checklist,
}: WorkOrderItemViewChecklistProps) => {
  return Array.isArray(checklist) ? (
    // Note: the <Checklist /> comp has a built-in "Checklist" label
    <Checklist
      checklistItems={checklist as Array<ChecklistItemType>}
      renderChecklistItem={renderChecklistItem}
      style={{
        height: "40vh",
        maxHeight: "40vh",
      }}
    />
  ) : (
    <ItemDetails label={label} />
  );
};

const renderChecklistItem: RenderChecklistItemFn<ChecklistItemType> = ({ item, index }) => (
  <ChecklistItem key={`ChecklistItem:${item?.id || index}`} item={item} />
);

export type WorkOrderItemViewChecklistProps = {
  label: string;
  checklist: WorkOrder["checklist"];
};
