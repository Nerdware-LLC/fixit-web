import type { FixitUser } from "./FixitUser.types";
import type { WorkOrderChecklist } from "./WorkOrderChecklist.types";

// prettier-ignore
export const WORK_ORDER_CONSTANTS = {
  STATUSES: ["UNASSIGNED", "ASSIGNED", "IN_PROGRESS", "DEFERRED", "COMPLETE"],
  CATEGORIES: [null, "DRYWALL", "ELECTRICAL", "FLOORING", "GENERAL", "HVAC", "LANDSCAPING", "MASONRY", "PAINTING", "PAVING", "PEST", "PLUMBING", "ROOFING", "TRASH", "TURNOVER", "WINDOWS"],
  PRIORITIES: ["LOW", "NORMAL", "HIGH"]
} as const;

////////////////////////////////////////////////////////////////////////////////
// TYPESCRIPT TYPES:

export type WorkOrder = {
  id: string;
  createdBy: FixitUser;
  assignedTo?: FixitUser;
  location: Location;
  status: typeof WORK_ORDER_CONSTANTS.STATUSES[number];
  priority: typeof WORK_ORDER_CONSTANTS.PRIORITIES[number];
  category?: typeof WORK_ORDER_CONSTANTS.CATEGORIES[number];
  description?: string;
  checklist?: WorkOrderChecklist;
  entryContact?: string;
  entryContactPhone?: string;
  dueDate?: Date | number;
  scheduledDateTime?: Date | number;
  contractorNotes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Location = {
  country?: string; // optional, defaults to "USA"
  region: string;
  city: string;
  streetLine1: string;
  streetLine2?: string; // optional, undefined by default
};
