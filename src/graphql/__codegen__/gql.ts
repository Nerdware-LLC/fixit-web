/* eslint-disable */
import * as types from './graphql.js';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment ContactFields on Contact {\n    id\n    handle\n    email\n    phone\n    profile {\n      ...ProfileFields\n    }\n    createdAt\n    updatedAt\n  }\n": types.ContactFieldsFragmentDoc,
    "\n  fragment ContactPublicFields on Contact {\n    id\n    handle\n    profile {\n      ...ProfileFields\n    }\n  }\n": types.ContactPublicFieldsFragmentDoc,
    "\n  mutation CreateContact($contactUserID: ID!) {\n    createContact(contactUserID: $contactUserID) {\n      ...ContactFields\n    }\n  }\n": types.CreateContactDocument,
    "\n  mutation DeleteContact($contactID: ID!) {\n    deleteContact(contactID: $contactID) {\n      id\n      wasDeleted\n    }\n  }\n": types.DeleteContactDocument,
    "\n  query Contact($contactID: ID!) {\n    contact(contactID: $contactID) {\n      ...ContactFields\n    }\n  }\n": types.ContactDocument,
    "\n  query MyContacts {\n    myContacts {\n      ...ContactFields\n    }\n  }\n": types.MyContactsDocument,
    "\n  fragment FixitUserFields on FixitUser {\n    ... on User {\n      ...UserPublicFields\n      createdAt\n      updatedAt\n    }\n    ... on Contact {\n      ...ContactFields\n    }\n  }\n": types.FixitUserFieldsFragmentDoc,
    "\n  mutation CreateInvite($phoneOrEmail: String!) {\n    createInvite(phoneOrEmail: $phoneOrEmail) {\n      wasSuccessful\n    }\n  }\n": types.CreateInviteDocument,
    "\n  fragment InvoiceFields on Invoice {\n    id\n    createdBy {\n      ...FixitUserFields\n    }\n    assignedTo {\n      ...FixitUserFields\n    }\n    amount\n    status\n    stripePaymentIntentID\n    createdAt\n    updatedAt\n  }\n": types.InvoiceFieldsFragmentDoc,
    "\n  fragment InvoiceWithWorkOrderFields on Invoice {\n    ...InvoiceFields\n    workOrder {\n      ...WorkOrderFields\n    }\n  }\n": types.InvoiceWithWorkOrderFieldsFragmentDoc,
    "\n  mutation CreateInvoice($invoice: InvoiceInput!) {\n    createInvoice(invoice: $invoice) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n": types.CreateInvoiceDocument,
    "\n  mutation UpdateInvoiceAmount($invoiceID: ID!, $amount: Int!) {\n    updateInvoiceAmount(invoiceID: $invoiceID, amount: $amount) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n": types.UpdateInvoiceAmountDocument,
    "\n  mutation PayInvoice($invoiceID: ID!) {\n    payInvoice(invoiceID: $invoiceID) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n": types.PayInvoiceDocument,
    "\n  mutation DeleteInvoice($invoiceID: ID!) {\n    deleteInvoice(invoiceID: $invoiceID) {\n      id\n      wasDeleted\n    }\n  }\n": types.DeleteInvoiceDocument,
    "\n  query Invoice($invoiceID: ID!) {\n    invoice(invoiceID: $invoiceID) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n": types.InvoiceDocument,
    "\n  query MyInvoices {\n    myInvoices {\n      createdByUser {\n        ...InvoiceFields\n      }\n      assignedToUser {\n        ...InvoiceFields\n      }\n    }\n  }\n": types.MyInvoicesDocument,
    "\n  query MyInvoicesWithWorkOrderData {\n    myInvoices {\n      createdByUser {\n        ...InvoiceWithWorkOrderFields\n      }\n      assignedToUser {\n        ...InvoiceWithWorkOrderFields\n      }\n    }\n  }\n": types.MyInvoicesWithWorkOrderDataDocument,
    "\n  fragment ProfileFields on Profile {\n    displayName\n    givenName\n    familyName\n    businessName\n    photoUrl\n  }\n": types.ProfileFieldsFragmentDoc,
    "\n  mutation UpdateProfile($profile: ProfileInput!) {\n    updateProfile(profile: $profile) {\n      ...ProfileFields\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query MyProfile {\n    myProfile {\n      ...ProfileFields\n    }\n  }\n": types.MyProfileDocument,
    "\n  fragment StripeConnectAccountFields on UserStripeConnectAccount {\n    id\n    detailsSubmitted\n    chargesEnabled\n    payoutsEnabled\n  }\n": types.StripeConnectAccountFieldsFragmentDoc,
    "\n  fragment UserPublicFields on User {\n    id\n    handle\n    email\n    phone\n    profile {\n      ...ProfileFields\n    }\n  }\n": types.UserPublicFieldsFragmentDoc,
    "\n  query GetUserByHandle($handle: String!) {\n    getUserByHandle(handle: $handle) {\n      ...ContactFields\n    }\n  }\n": types.GetUserByHandleDocument,
    "\n  query SearchForUsersByHandle($handle: String!) {\n    searchForUsersByHandle(handle: $handle) {\n      ...ContactFields\n    }\n  }\n": types.SearchForUsersByHandleDocument,
    "\n  fragment UserSubscriptionFields on UserSubscription {\n    id\n    status\n    currentPeriodEnd\n    productID\n    priceID\n    createdAt\n  }\n": types.UserSubscriptionFieldsFragmentDoc,
    "\n  fragment WorkOrderFields on WorkOrder {\n    id\n    createdBy {\n      ...FixitUserFields\n    }\n    assignedTo {\n      ...FixitUserFields\n    }\n    status\n    priority\n    location {\n      country\n      region\n      city\n      streetLine1\n      streetLine2\n    }\n    category\n    description\n    checklist {\n      id\n      description\n      isCompleted\n    }\n    dueDate\n    entryContact\n    entryContactPhone\n    scheduledDateTime\n    contractorNotes\n    createdAt\n    updatedAt\n  }\n": types.WorkOrderFieldsFragmentDoc,
    "\n  mutation CreateWorkOrder($workOrder: CreateWorkOrderInput!) {\n    createWorkOrder(workOrder: $workOrder) {\n      ...WorkOrderFields\n    }\n  }\n": types.CreateWorkOrderDocument,
    "\n  mutation UpdateWorkOrder($workOrderID: ID!, $workOrder: UpdateWorkOrderInput!) {\n    updateWorkOrder(workOrderID: $workOrderID, workOrder: $workOrder) {\n      ...WorkOrderFields\n    }\n  }\n": types.UpdateWorkOrderDocument,
    "\n  mutation CancelWorkOrder($workOrderID: ID!) {\n    cancelWorkOrder(workOrderID: $workOrderID) {\n      ... on DeleteMutationResponse {\n        id\n        wasDeleted\n      }\n      ... on WorkOrder {\n        ...WorkOrderFields\n      }\n    }\n  }\n": types.CancelWorkOrderDocument,
    "\n  mutation SetWorkOrderStatusComplete($workOrderID: ID!) {\n    setWorkOrderStatusComplete(workOrderID: $workOrderID) {\n      ...WorkOrderFields\n    }\n  }\n": types.SetWorkOrderStatusCompleteDocument,
    "\n  query WorkOrder($workOrderID: ID!) {\n    workOrder(workOrderID: $workOrderID) {\n      ...WorkOrderFields\n    }\n  }\n": types.WorkOrderDocument,
    "\n  query MyWorkOrders {\n    myWorkOrders {\n      createdByUser {\n        ...WorkOrderFields\n      }\n      assignedToUser {\n        ...WorkOrderFields\n      }\n    }\n  }\n": types.MyWorkOrdersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ContactFields on Contact {\n    id\n    handle\n    email\n    phone\n    profile {\n      ...ProfileFields\n    }\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment ContactFields on Contact {\n    id\n    handle\n    email\n    phone\n    profile {\n      ...ProfileFields\n    }\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ContactPublicFields on Contact {\n    id\n    handle\n    profile {\n      ...ProfileFields\n    }\n  }\n"): (typeof documents)["\n  fragment ContactPublicFields on Contact {\n    id\n    handle\n    profile {\n      ...ProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateContact($contactUserID: ID!) {\n    createContact(contactUserID: $contactUserID) {\n      ...ContactFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateContact($contactUserID: ID!) {\n    createContact(contactUserID: $contactUserID) {\n      ...ContactFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteContact($contactID: ID!) {\n    deleteContact(contactID: $contactID) {\n      id\n      wasDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteContact($contactID: ID!) {\n    deleteContact(contactID: $contactID) {\n      id\n      wasDeleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Contact($contactID: ID!) {\n    contact(contactID: $contactID) {\n      ...ContactFields\n    }\n  }\n"): (typeof documents)["\n  query Contact($contactID: ID!) {\n    contact(contactID: $contactID) {\n      ...ContactFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyContacts {\n    myContacts {\n      ...ContactFields\n    }\n  }\n"): (typeof documents)["\n  query MyContacts {\n    myContacts {\n      ...ContactFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FixitUserFields on FixitUser {\n    ... on User {\n      ...UserPublicFields\n      createdAt\n      updatedAt\n    }\n    ... on Contact {\n      ...ContactFields\n    }\n  }\n"): (typeof documents)["\n  fragment FixitUserFields on FixitUser {\n    ... on User {\n      ...UserPublicFields\n      createdAt\n      updatedAt\n    }\n    ... on Contact {\n      ...ContactFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateInvite($phoneOrEmail: String!) {\n    createInvite(phoneOrEmail: $phoneOrEmail) {\n      wasSuccessful\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInvite($phoneOrEmail: String!) {\n    createInvite(phoneOrEmail: $phoneOrEmail) {\n      wasSuccessful\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment InvoiceFields on Invoice {\n    id\n    createdBy {\n      ...FixitUserFields\n    }\n    assignedTo {\n      ...FixitUserFields\n    }\n    amount\n    status\n    stripePaymentIntentID\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment InvoiceFields on Invoice {\n    id\n    createdBy {\n      ...FixitUserFields\n    }\n    assignedTo {\n      ...FixitUserFields\n    }\n    amount\n    status\n    stripePaymentIntentID\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment InvoiceWithWorkOrderFields on Invoice {\n    ...InvoiceFields\n    workOrder {\n      ...WorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  fragment InvoiceWithWorkOrderFields on Invoice {\n    ...InvoiceFields\n    workOrder {\n      ...WorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateInvoice($invoice: InvoiceInput!) {\n    createInvoice(invoice: $invoice) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInvoice($invoice: InvoiceInput!) {\n    createInvoice(invoice: $invoice) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateInvoiceAmount($invoiceID: ID!, $amount: Int!) {\n    updateInvoiceAmount(invoiceID: $invoiceID, amount: $amount) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateInvoiceAmount($invoiceID: ID!, $amount: Int!) {\n    updateInvoiceAmount(invoiceID: $invoiceID, amount: $amount) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation PayInvoice($invoiceID: ID!) {\n    payInvoice(invoiceID: $invoiceID) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  mutation PayInvoice($invoiceID: ID!) {\n    payInvoice(invoiceID: $invoiceID) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteInvoice($invoiceID: ID!) {\n    deleteInvoice(invoiceID: $invoiceID) {\n      id\n      wasDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteInvoice($invoiceID: ID!) {\n    deleteInvoice(invoiceID: $invoiceID) {\n      id\n      wasDeleted\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Invoice($invoiceID: ID!) {\n    invoice(invoiceID: $invoiceID) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  query Invoice($invoiceID: ID!) {\n    invoice(invoiceID: $invoiceID) {\n      ...InvoiceWithWorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyInvoices {\n    myInvoices {\n      createdByUser {\n        ...InvoiceFields\n      }\n      assignedToUser {\n        ...InvoiceFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyInvoices {\n    myInvoices {\n      createdByUser {\n        ...InvoiceFields\n      }\n      assignedToUser {\n        ...InvoiceFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyInvoicesWithWorkOrderData {\n    myInvoices {\n      createdByUser {\n        ...InvoiceWithWorkOrderFields\n      }\n      assignedToUser {\n        ...InvoiceWithWorkOrderFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyInvoicesWithWorkOrderData {\n    myInvoices {\n      createdByUser {\n        ...InvoiceWithWorkOrderFields\n      }\n      assignedToUser {\n        ...InvoiceWithWorkOrderFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProfileFields on Profile {\n    displayName\n    givenName\n    familyName\n    businessName\n    photoUrl\n  }\n"): (typeof documents)["\n  fragment ProfileFields on Profile {\n    displayName\n    givenName\n    familyName\n    businessName\n    photoUrl\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProfile($profile: ProfileInput!) {\n    updateProfile(profile: $profile) {\n      ...ProfileFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($profile: ProfileInput!) {\n    updateProfile(profile: $profile) {\n      ...ProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyProfile {\n    myProfile {\n      ...ProfileFields\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      ...ProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment StripeConnectAccountFields on UserStripeConnectAccount {\n    id\n    detailsSubmitted\n    chargesEnabled\n    payoutsEnabled\n  }\n"): (typeof documents)["\n  fragment StripeConnectAccountFields on UserStripeConnectAccount {\n    id\n    detailsSubmitted\n    chargesEnabled\n    payoutsEnabled\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserPublicFields on User {\n    id\n    handle\n    email\n    phone\n    profile {\n      ...ProfileFields\n    }\n  }\n"): (typeof documents)["\n  fragment UserPublicFields on User {\n    id\n    handle\n    email\n    phone\n    profile {\n      ...ProfileFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByHandle($handle: String!) {\n    getUserByHandle(handle: $handle) {\n      ...ContactFields\n    }\n  }\n"): (typeof documents)["\n  query GetUserByHandle($handle: String!) {\n    getUserByHandle(handle: $handle) {\n      ...ContactFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchForUsersByHandle($handle: String!) {\n    searchForUsersByHandle(handle: $handle) {\n      ...ContactFields\n    }\n  }\n"): (typeof documents)["\n  query SearchForUsersByHandle($handle: String!) {\n    searchForUsersByHandle(handle: $handle) {\n      ...ContactFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserSubscriptionFields on UserSubscription {\n    id\n    status\n    currentPeriodEnd\n    productID\n    priceID\n    createdAt\n  }\n"): (typeof documents)["\n  fragment UserSubscriptionFields on UserSubscription {\n    id\n    status\n    currentPeriodEnd\n    productID\n    priceID\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment WorkOrderFields on WorkOrder {\n    id\n    createdBy {\n      ...FixitUserFields\n    }\n    assignedTo {\n      ...FixitUserFields\n    }\n    status\n    priority\n    location {\n      country\n      region\n      city\n      streetLine1\n      streetLine2\n    }\n    category\n    description\n    checklist {\n      id\n      description\n      isCompleted\n    }\n    dueDate\n    entryContact\n    entryContactPhone\n    scheduledDateTime\n    contractorNotes\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment WorkOrderFields on WorkOrder {\n    id\n    createdBy {\n      ...FixitUserFields\n    }\n    assignedTo {\n      ...FixitUserFields\n    }\n    status\n    priority\n    location {\n      country\n      region\n      city\n      streetLine1\n      streetLine2\n    }\n    category\n    description\n    checklist {\n      id\n      description\n      isCompleted\n    }\n    dueDate\n    entryContact\n    entryContactPhone\n    scheduledDateTime\n    contractorNotes\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateWorkOrder($workOrder: CreateWorkOrderInput!) {\n    createWorkOrder(workOrder: $workOrder) {\n      ...WorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWorkOrder($workOrder: CreateWorkOrderInput!) {\n    createWorkOrder(workOrder: $workOrder) {\n      ...WorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateWorkOrder($workOrderID: ID!, $workOrder: UpdateWorkOrderInput!) {\n    updateWorkOrder(workOrderID: $workOrderID, workOrder: $workOrder) {\n      ...WorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWorkOrder($workOrderID: ID!, $workOrder: UpdateWorkOrderInput!) {\n    updateWorkOrder(workOrderID: $workOrderID, workOrder: $workOrder) {\n      ...WorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CancelWorkOrder($workOrderID: ID!) {\n    cancelWorkOrder(workOrderID: $workOrderID) {\n      ... on DeleteMutationResponse {\n        id\n        wasDeleted\n      }\n      ... on WorkOrder {\n        ...WorkOrderFields\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CancelWorkOrder($workOrderID: ID!) {\n    cancelWorkOrder(workOrderID: $workOrderID) {\n      ... on DeleteMutationResponse {\n        id\n        wasDeleted\n      }\n      ... on WorkOrder {\n        ...WorkOrderFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetWorkOrderStatusComplete($workOrderID: ID!) {\n    setWorkOrderStatusComplete(workOrderID: $workOrderID) {\n      ...WorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  mutation SetWorkOrderStatusComplete($workOrderID: ID!) {\n    setWorkOrderStatusComplete(workOrderID: $workOrderID) {\n      ...WorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query WorkOrder($workOrderID: ID!) {\n    workOrder(workOrderID: $workOrderID) {\n      ...WorkOrderFields\n    }\n  }\n"): (typeof documents)["\n  query WorkOrder($workOrderID: ID!) {\n    workOrder(workOrderID: $workOrderID) {\n      ...WorkOrderFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyWorkOrders {\n    myWorkOrders {\n      createdByUser {\n        ...WorkOrderFields\n      }\n      assignedToUser {\n        ...WorkOrderFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyWorkOrders {\n    myWorkOrders {\n      createdByUser {\n        ...WorkOrderFields\n      }\n      assignedToUser {\n        ...WorkOrderFields\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;