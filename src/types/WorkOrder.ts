import type { WorkOrderStatus, WorkOrderPriority, WorkOrderCategory } from "@/types/graphql.js";

export const WORK_ORDER_STATUSES = [
  "UNASSIGNED",
  "ASSIGNED",
  "IN_PROGRESS",
  "DEFERRED",
  "CANCELLED",
  "COMPLETE",
] as const satisfies ReadonlyArray<WorkOrderStatus>;

export const WORK_ORDER_PRIORITIES = [
  "LOW",
  "NORMAL",
  "HIGH",
] as const satisfies ReadonlyArray<WorkOrderPriority>;

export const WORK_ORDER_CATEGORIES = [
  "DRYWALL",
  "ELECTRICAL",
  "FLOORING",
  "GENERAL",
  "HVAC",
  "LANDSCAPING",
  "MASONRY",
  "PAINTING",
  "PAVING",
  "PEST",
  "PLUMBING",
  "ROOFING",
  "TRASH",
  "TURNOVER",
  "WINDOWS",
] as const satisfies ReadonlyArray<WorkOrderCategory>;
