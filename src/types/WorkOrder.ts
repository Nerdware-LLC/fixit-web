import type { WorkOrderStatus, WorkOrderPriority, WorkOrderCategory } from "@graphql/types";

export const WORK_ORDER_STATUSES: ReadonlyArray<WorkOrderStatus> = [
  "UNASSIGNED",
  "ASSIGNED",
  "IN_PROGRESS",
  "DEFERRED",
  "CANCELLED",
  "COMPLETE",
] as const;

export const WORK_ORDER_PRIORITIES: ReadonlyArray<WorkOrderPriority> = [
  "LOW",
  "NORMAL",
  "HIGH",
] as const;

export const WORK_ORDER_CATEGORIES: ReadonlyArray<WorkOrderCategory | null> = [
  null,
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
] as const;
