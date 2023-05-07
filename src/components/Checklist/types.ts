export type ChecklistItems = Array<ChecklistItem>;

export interface ChecklistItem {
  id: string;
  description: string;
  isCompleted: boolean;
}
