// App path components:
const ROOT = "/";
const HOME = "home";
const FORM_VIEW = "form";
const ITEM_VIEW = ":id";
const PROFILE = "profile";
const WORK_ORDERS = "workorders";
const INVOICES = "invoices";
const CONTACTS = "contacts";

export const APP_PATH_COMPONENTS = {
  ROOT,
  HOME,
  /** `/home/<items>/form` */
  FORM_VIEW,
  /** `/home/<items>/:id` */
  ITEM_VIEW,
  /** `/home/profile` */
  PROFILE,
  /** `/home/workorders` */
  WORK_ORDERS,
  /** `/home/invoices` */
  INVOICES,
  /** `/home/contacts` */
  CONTACTS,
} as const;

const LIST_VIEW_PATHS = {
  WORK_ORDERS: `/${HOME}/${WORK_ORDERS}`,
  INVOICES: `/${HOME}/${INVOICES}`,
  CONTACTS: `/${HOME}/${CONTACTS}`,
} as const;

const FORM_VIEW_PATHS = {
  WORK_ORDERS: `/${HOME}/${WORK_ORDERS}/${FORM_VIEW}`,
  INVOICES: `/${HOME}/${INVOICES}/${FORM_VIEW}`,
  // Contacts has no form view
} as const;

const ITEM_VIEW_PATHS = {
  WORK_ORDERS: `/${HOME}/${WORK_ORDERS}/${ITEM_VIEW}`,
  INVOICES: `/${HOME}/${INVOICES}/${ITEM_VIEW}`,
  CONTACTS: `/${HOME}/${CONTACTS}/${ITEM_VIEW}`,
} as const;

export const APP_PATHS = {
  /** The root app path (used as the BrowserRouter's `basename`). */
  ROOT,
  LANDING_PAGE: ROOT,
  ToS: "/ToS",
  PRIVACY: `/privacy`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  PRODUCTS: `/products`,
  CHECKOUT: `/checkout`,
  /** The app "home" where users can view their dashboard. */
  HOME: `/${HOME}`,
  PROFILE: `/${HOME}/${PROFILE}`,
  // WorkOrders
  WORK_ORDERS_LIST_VIEW: LIST_VIEW_PATHS.WORK_ORDERS,
  WORK_ORDERS_FORM_VIEW: FORM_VIEW_PATHS.WORK_ORDERS,
  WORK_ORDERS_ITEM_VIEW: ITEM_VIEW_PATHS.WORK_ORDERS,
  // Invoices
  INVOICES_LIST_VIEW: LIST_VIEW_PATHS.INVOICES,
  INVOICES_FORM_VIEW: FORM_VIEW_PATHS.INVOICES,
  INVOICES_ITEM_VIEW: ITEM_VIEW_PATHS.INVOICES,
  // Contacts (no form view)
  CONTACTS_LIST_VIEW: LIST_VIEW_PATHS.CONTACTS,
  CONTACTS_ITEM_VIEW: ITEM_VIEW_PATHS.CONTACTS,
} as const;

export type AppPath = (typeof APP_PATHS)[keyof typeof APP_PATHS];

export type ListViewAppPath = (typeof LIST_VIEW_PATHS)[keyof typeof LIST_VIEW_PATHS];

export type FormViewAppPath = (typeof FORM_VIEW_PATHS)[keyof typeof FORM_VIEW_PATHS];

export type ItemViewAppPath = (typeof ITEM_VIEW_PATHS)[keyof typeof ITEM_VIEW_PATHS];
