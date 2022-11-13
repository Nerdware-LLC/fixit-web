export type WorkOrderChecklistItem = {
  id: string;
  description: string;
  isCompleted: boolean;
};

export type WorkOrderChecklist = Array<WorkOrderChecklistItem>;
