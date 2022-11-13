/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Custom DateTime scalar; pass a string or js date instance obj */
  DateTime: any;
  /** Custom Email scalar; validates using regex */
  Email: any;
};

export type CancelWorkOrderResponse = DeleteMutationResponse | WorkOrder;

export type ChecklistItem = {
  __typename?: 'ChecklistItem';
  description: Scalars['String'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
};

export type Contact = FixitUser & {
  __typename?: 'Contact';
  createdAt: Scalars['DateTime'];
  email: Scalars['Email'];
  id: Scalars['ID'];
  phone: Scalars['String'];
  profile: Profile;
};

export type CreateChecklistItemInput = {
  description: Scalars['String'];
};

export type CreateWorkOrderInput = {
  assignedToUserID?: InputMaybe<Scalars['ID']>;
  category?: InputMaybe<WorkOrderCategory>;
  checklist?: InputMaybe<Array<InputMaybe<CreateChecklistItemInput>>>;
  description: Scalars['String'];
  dueDate?: InputMaybe<Scalars['DateTime']>;
  entryContact?: InputMaybe<Scalars['String']>;
  entryContactPhone?: InputMaybe<Scalars['String']>;
  location: CreateWorkOrderLocationInput;
  priority?: InputMaybe<WorkOrderPriority>;
  scheduledDateTime?: InputMaybe<Scalars['DateTime']>;
};

export type CreateWorkOrderLocationInput = {
  city: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  region: Scalars['String'];
  streetLine1: Scalars['String'];
  streetLine2?: InputMaybe<Scalars['String']>;
};

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse';
  id: Scalars['ID'];
  wasDeleted: Scalars['Boolean'];
};

export type FixitUser = {
  createdAt: Scalars['DateTime'];
  email: Scalars['Email'];
  id: Scalars['ID'];
  phone: Scalars['String'];
  profile: Profile;
};

export type Invoice = {
  __typename?: 'Invoice';
  amount: Scalars['Int'];
  assignedTo: FixitUser;
  createdAt: Scalars['DateTime'];
  createdBy: FixitUser;
  id: Scalars['ID'];
  status: InvoiceStatus;
  stripePaymentIntentID?: Maybe<Scalars['String']>;
  workOrder?: Maybe<WorkOrder>;
};

export type InvoiceInput = {
  amount: Scalars['Int'];
  assignedToUserID: Scalars['ID'];
  workOrderID?: InputMaybe<Scalars['ID']>;
};

export enum InvoiceStatus {
  Closed = 'CLOSED',
  Disputed = 'DISPUTED',
  Open = 'OPEN'
}

export type Mutation = {
  __typename?: 'Mutation';
  _root?: Maybe<Scalars['Boolean']>;
  cancelWorkOrder: CancelWorkOrderResponse;
  createContact: Contact;
  createInvoice: Invoice;
  createWorkOrder: WorkOrder;
  deleteContact: DeleteMutationResponse;
  deleteInvoice: DeleteMutationResponse;
  payInvoice: Invoice;
  setWorkOrderStatusComplete: WorkOrder;
  updateInvoiceAmount: Invoice;
  updateProfile: Profile;
  updateWorkOrder: WorkOrder;
};


export type MutationCancelWorkOrderArgs = {
  workOrderID: Scalars['ID'];
};


export type MutationCreateContactArgs = {
  contactEmail: Scalars['Email'];
};


export type MutationCreateInvoiceArgs = {
  invoice: InvoiceInput;
};


export type MutationCreateWorkOrderArgs = {
  workOrder: CreateWorkOrderInput;
};


export type MutationDeleteContactArgs = {
  contactEmail: Scalars['Email'];
};


export type MutationDeleteInvoiceArgs = {
  invoiceID: Scalars['ID'];
};


export type MutationPayInvoiceArgs = {
  invoiceID: Scalars['ID'];
};


export type MutationSetWorkOrderStatusCompleteArgs = {
  workOrderID: Scalars['ID'];
};


export type MutationUpdateInvoiceAmountArgs = {
  amount: Scalars['Int'];
  invoiceID: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  profile: ProfileInput;
};


export type MutationUpdateWorkOrderArgs = {
  workOrder: UpdateWorkOrderInput;
  workOrderID: Scalars['ID'];
};

export type MyWorkOrdersQueryReturnType = {
  __typename?: 'MyWorkOrdersQueryReturnType';
  assignedToUser: Array<Maybe<WorkOrder>>;
  createdByUser: Array<Maybe<WorkOrder>>;
};

export type PhoneContact = {
  __typename?: 'PhoneContact';
  businessName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['Email']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isUser: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  businessName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  photoUrl?: Maybe<Scalars['String']>;
};

export type ProfileInput = {
  businessName?: InputMaybe<Scalars['String']>;
  familyName?: InputMaybe<Scalars['String']>;
  givenName?: InputMaybe<Scalars['String']>;
  photoUrl?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _root?: Maybe<Scalars['Boolean']>;
  contact: Contact;
  invoice: Invoice;
  myContacts: Array<Maybe<Contact>>;
  myInvoices: Array<Invoice>;
  myProfile: Profile;
  mySubscription: UserSubscription;
  myWorkOrders: MyWorkOrdersQueryReturnType;
  profile: Profile;
  searchUsers?: Maybe<Array<Maybe<PhoneContact>>>;
  user: User;
  workOrder: WorkOrder;
};


export type QueryContactArgs = {
  contactID: Scalars['ID'];
};


export type QueryInvoiceArgs = {
  invoiceID: Scalars['ID'];
};


export type QueryProfileArgs = {
  profileID: Scalars['ID'];
};


export type QuerySearchUsersArgs = {
  rawPhoneContacts: Array<RawPhoneContactInput>;
};


export type QueryWorkOrderArgs = {
  workOrderID: Scalars['ID'];
};

export type RawPhoneContactInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  photoUrl?: InputMaybe<Scalars['String']>;
};

export type StripeConnectAccount = {
  __typename?: 'StripeConnectAccount';
  chargesEnabled: Scalars['Boolean'];
  detailsSubmitted: Scalars['Boolean'];
  id: Scalars['ID'];
  payoutsEnabled: Scalars['Boolean'];
};

export enum SubscriptionStatus {
  Active = 'active',
  Canceled = 'canceled',
  Incomplete = 'incomplete',
  IncompleteExpired = 'incomplete_expired',
  PastDue = 'past_due',
  Trialing = 'trialing',
  Unpaid = 'unpaid'
}

export type UpdateChecklistItemInput = {
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateWorkOrderInput = {
  assignedToUserID?: InputMaybe<Scalars['ID']>;
  category?: InputMaybe<WorkOrderCategory>;
  checklist?: InputMaybe<Array<InputMaybe<UpdateChecklistItemInput>>>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  entryContact?: InputMaybe<Scalars['String']>;
  entryContactPhone?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<UpdateWorkOrderLocationInput>;
  priority?: InputMaybe<WorkOrderPriority>;
  scheduledDateTime?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateWorkOrderLocationInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  streetLine1?: InputMaybe<Scalars['String']>;
  streetLine2?: InputMaybe<Scalars['String']>;
};

export type User = FixitUser & {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['Email'];
  id: Scalars['ID'];
  phone: Scalars['String'];
  profile: Profile;
  stripeConnectAccount?: Maybe<StripeConnectAccount>;
  stripeCustomerID: Scalars['String'];
  subscription?: Maybe<UserSubscription>;
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  createdAt: Scalars['DateTime'];
  currentPeriodEnd: Scalars['DateTime'];
  id: Scalars['ID'];
  priceID: Scalars['String'];
  productID: Scalars['String'];
  status: SubscriptionStatus;
};

export type WorkOrder = {
  __typename?: 'WorkOrder';
  assignedTo?: Maybe<FixitUser>;
  category?: Maybe<WorkOrderCategory>;
  checklist?: Maybe<Array<Maybe<ChecklistItem>>>;
  contractorNotes?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: FixitUser;
  description: Scalars['String'];
  dueDate?: Maybe<Scalars['DateTime']>;
  entryContact?: Maybe<Scalars['String']>;
  entryContactPhone?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoice?: Maybe<Invoice>;
  location: WorkOrderLocation;
  priority: WorkOrderPriority;
  scheduledDateTime?: Maybe<Scalars['DateTime']>;
  status: WorkOrderStatus;
};

export enum WorkOrderCategory {
  Drywall = 'DRYWALL',
  Electrical = 'ELECTRICAL',
  Flooring = 'FLOORING',
  General = 'GENERAL',
  Hvac = 'HVAC',
  Landscaping = 'LANDSCAPING',
  Masonry = 'MASONRY',
  Painting = 'PAINTING',
  Paving = 'PAVING',
  Pest = 'PEST',
  Plumbing = 'PLUMBING',
  Roofing = 'ROOFING',
  Trash = 'TRASH',
  Turnover = 'TURNOVER',
  Windows = 'WINDOWS'
}

export type WorkOrderLocation = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
};

export enum WorkOrderPriority {
  High = 'HIGH',
  Low = 'LOW',
  Normal = 'NORMAL'
}

export enum WorkOrderStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Unassigned = 'UNASSIGNED'
}

export type ContactFieldsFragment = { __typename?: 'Contact', id: string, email: any, phone: string, createdAt: any, profile: (
    { __typename?: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFieldsFragment': ProfileFieldsFragment } }
  ) } & { ' $fragmentName'?: 'ContactFieldsFragment' };

export type CreateContactMutationVariables = Exact<{
  contactEmail: Scalars['Email'];
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'ContactFieldsFragment': ContactFieldsFragment } }
  ) };

export type DeleteContactMutationVariables = Exact<{
  contactEmail: Scalars['Email'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: { __typename?: 'DeleteMutationResponse', id: string, wasDeleted: boolean } };

export type ContactQueryVariables = Exact<{
  contactID: Scalars['ID'];
}>;


export type ContactQuery = { __typename?: 'Query', contact: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'ContactFieldsFragment': ContactFieldsFragment } }
  ) };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', myContacts: Array<(
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'ContactFieldsFragment': ContactFieldsFragment } }
  ) | null> };

type FixitUserFields_Contact_Fragment = (
  { __typename?: 'Contact' }
  & { ' $fragmentRefs'?: { 'ContactFieldsFragment': ContactFieldsFragment } }
) & { ' $fragmentName'?: 'FixitUserFields_Contact_Fragment' };

type FixitUserFields_User_Fragment = (
  { __typename?: 'User' }
  & { ' $fragmentRefs'?: { 'PublicUserFieldsFragment': PublicUserFieldsFragment } }
) & { ' $fragmentName'?: 'FixitUserFields_User_Fragment' };

export type FixitUserFieldsFragment = FixitUserFields_Contact_Fragment | FixitUserFields_User_Fragment;

export type InvoiceFieldsFragment = { __typename?: 'Invoice', id: string, amount: number, status: InvoiceStatus, stripePaymentIntentID?: string | null, createdAt: any, createdBy: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_Contact_Fragment': FixitUserFields_Contact_Fragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_User_Fragment': FixitUserFields_User_Fragment } }
  ), assignedTo: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_Contact_Fragment': FixitUserFields_Contact_Fragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_User_Fragment': FixitUserFields_User_Fragment } }
  ) } & { ' $fragmentName'?: 'InvoiceFieldsFragment' };

export type InvoiceWithWorkOrderFieldsFragment = (
  { __typename?: 'Invoice', workOrder?: (
    { __typename?: 'WorkOrder' }
    & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'InvoiceFieldsFragment': InvoiceFieldsFragment } }
) & { ' $fragmentName'?: 'InvoiceWithWorkOrderFieldsFragment' };

export type CreateInvoiceMutationVariables = Exact<{
  invoice: InvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: (
    { __typename?: 'Invoice' }
    & { ' $fragmentRefs'?: { 'InvoiceWithWorkOrderFieldsFragment': InvoiceWithWorkOrderFieldsFragment } }
  ) };

export type UpdateInvoiceAmountMutationVariables = Exact<{
  invoiceID: Scalars['ID'];
  amount: Scalars['Int'];
}>;


export type UpdateInvoiceAmountMutation = { __typename?: 'Mutation', updateInvoiceAmount: (
    { __typename?: 'Invoice' }
    & { ' $fragmentRefs'?: { 'InvoiceWithWorkOrderFieldsFragment': InvoiceWithWorkOrderFieldsFragment } }
  ) };

export type PayInvoiceMutationVariables = Exact<{
  invoiceID: Scalars['ID'];
}>;


export type PayInvoiceMutation = { __typename?: 'Mutation', payInvoice: (
    { __typename?: 'Invoice' }
    & { ' $fragmentRefs'?: { 'InvoiceWithWorkOrderFieldsFragment': InvoiceWithWorkOrderFieldsFragment } }
  ) };

export type DeleteInvoiceMutationVariables = Exact<{
  invoiceID: Scalars['ID'];
}>;


export type DeleteInvoiceMutation = { __typename?: 'Mutation', deleteInvoice: { __typename?: 'DeleteMutationResponse', id: string, wasDeleted: boolean } };

export type InvoiceQueryVariables = Exact<{
  invoiceID: Scalars['ID'];
}>;


export type InvoiceQuery = { __typename?: 'Query', invoice: (
    { __typename?: 'Invoice' }
    & { ' $fragmentRefs'?: { 'InvoiceWithWorkOrderFieldsFragment': InvoiceWithWorkOrderFieldsFragment } }
  ) };

export type InvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesQuery = { __typename?: 'Query', myInvoices: Array<(
    { __typename?: 'Invoice' }
    & { ' $fragmentRefs'?: { 'InvoiceWithWorkOrderFieldsFragment': InvoiceWithWorkOrderFieldsFragment } }
  )> };

export type PhoneContactFieldsFragment = { __typename?: 'PhoneContact', isUser: boolean, id: string, name?: string | null, phone?: string | null, email?: any | null, givenName?: string | null, familyName?: string | null, businessName?: string | null, photoUrl?: string | null } & { ' $fragmentName'?: 'PhoneContactFieldsFragment' };

export type SearchUsersQueryVariables = Exact<{
  rawPhoneContacts: Array<RawPhoneContactInput> | RawPhoneContactInput;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: Array<(
    { __typename?: 'PhoneContact' }
    & { ' $fragmentRefs'?: { 'PhoneContactFieldsFragment': PhoneContactFieldsFragment } }
  ) | null> | null };

export type ProfileFieldsFragment = { __typename?: 'Profile', displayName?: string | null, givenName?: string | null, familyName?: string | null, businessName?: string | null, photoUrl?: string | null } & { ' $fragmentName'?: 'ProfileFieldsFragment' };

export type UpdateProfileMutationVariables = Exact<{
  profile: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: (
    { __typename?: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFieldsFragment': ProfileFieldsFragment } }
  ) };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile: (
    { __typename?: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFieldsFragment': ProfileFieldsFragment } }
  ) };

export type StripeConnectAccountFieldsFragment = { __typename?: 'StripeConnectAccount', id: string, detailsSubmitted: boolean, chargesEnabled: boolean, payoutsEnabled: boolean } & { ' $fragmentName'?: 'StripeConnectAccountFieldsFragment' };

export type PublicUserFieldsFragment = { __typename?: 'User', email: any, phone: string, profile: (
    { __typename?: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFieldsFragment': ProfileFieldsFragment } }
  ) } & { ' $fragmentName'?: 'PublicUserFieldsFragment' };

export type PrivateUserFieldsFragment = (
  { __typename?: 'User', id: string, stripeCustomerID: string, createdAt: any, stripeConnectAccount?: (
    { __typename?: 'StripeConnectAccount' }
    & { ' $fragmentRefs'?: { 'StripeConnectAccountFieldsFragment': StripeConnectAccountFieldsFragment } }
  ) | null, subscription?: (
    { __typename?: 'UserSubscription' }
    & { ' $fragmentRefs'?: { 'UserSubscriptionFieldsFragment': UserSubscriptionFieldsFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'PublicUserFieldsFragment': PublicUserFieldsFragment } }
) & { ' $fragmentName'?: 'PrivateUserFieldsFragment' };

export type AuthTokenFieldsFragment = { __typename?: 'User', id: string, email: any, phone: string, stripeCustomerID: string, stripeConnectAccount?: (
    { __typename?: 'StripeConnectAccount' }
    & { ' $fragmentRefs'?: { 'StripeConnectAccountFieldsFragment': StripeConnectAccountFieldsFragment } }
  ) | null, subscription?: (
    { __typename?: 'UserSubscription' }
    & { ' $fragmentRefs'?: { 'UserSubscriptionAuthTokenFieldsFragment': UserSubscriptionAuthTokenFieldsFragment } }
  ) | null } & { ' $fragmentName'?: 'AuthTokenFieldsFragment' };

export type UserPrivateFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPrivateFieldsQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'PrivateUserFieldsFragment': PrivateUserFieldsFragment } }
  ) };

export type UserAuthTokenFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAuthTokenFieldsQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'AuthTokenFieldsFragment': AuthTokenFieldsFragment } }
  ) };

export type UserSubscriptionFieldsFragment = { __typename?: 'UserSubscription', id: string, status: SubscriptionStatus, currentPeriodEnd: any, productID: string, priceID: string, createdAt: any } & { ' $fragmentName'?: 'UserSubscriptionFieldsFragment' };

export type UserSubscriptionAuthTokenFieldsFragment = { __typename?: 'UserSubscription', id: string, status: SubscriptionStatus, currentPeriodEnd: any } & { ' $fragmentName'?: 'UserSubscriptionAuthTokenFieldsFragment' };

export type WorkOrderFieldsFragment = { __typename?: 'WorkOrder', id: string, status: WorkOrderStatus, priority: WorkOrderPriority, category?: WorkOrderCategory | null, description: string, dueDate?: any | null, entryContact?: string | null, entryContactPhone?: string | null, scheduledDateTime?: any | null, contractorNotes?: string | null, createdAt: any, createdBy: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_Contact_Fragment': FixitUserFields_Contact_Fragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_User_Fragment': FixitUserFields_User_Fragment } }
  ), assignedTo?: (
    { __typename?: 'Contact' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_Contact_Fragment': FixitUserFields_Contact_Fragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'FixitUserFields_User_Fragment': FixitUserFields_User_Fragment } }
  ) | null, location: never, checklist?: Array<{ __typename?: 'ChecklistItem', id: string, description: string, isCompleted: boolean } | null> | null } & { ' $fragmentName'?: 'WorkOrderFieldsFragment' };

export type WorkOrderWIthInvoiceFieldsFragment = (
  { __typename?: 'WorkOrder', invoice?: { __typename?: 'Invoice', id: string, amount: number, status: InvoiceStatus, stripePaymentIntentID?: string | null, createdAt: any, createdBy: (
      { __typename?: 'Contact' }
      & { ' $fragmentRefs'?: { 'FixitUserFields_Contact_Fragment': FixitUserFields_Contact_Fragment } }
    ) | (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'FixitUserFields_User_Fragment': FixitUserFields_User_Fragment } }
    ), assignedTo: (
      { __typename?: 'Contact' }
      & { ' $fragmentRefs'?: { 'FixitUserFields_Contact_Fragment': FixitUserFields_Contact_Fragment } }
    ) | (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'FixitUserFields_User_Fragment': FixitUserFields_User_Fragment } }
    ) } | null }
  & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
) & { ' $fragmentName'?: 'WorkOrderWIthInvoiceFieldsFragment' };

export type CreateWorkOrderMutationVariables = Exact<{
  workOrder: CreateWorkOrderInput;
}>;


export type CreateWorkOrderMutation = { __typename?: 'Mutation', createWorkOrder: (
    { __typename?: 'WorkOrder' }
    & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
  ) };

export type UpdateWorkOrderMutationVariables = Exact<{
  workOrderID: Scalars['ID'];
  workOrder: UpdateWorkOrderInput;
}>;


export type UpdateWorkOrderMutation = { __typename?: 'Mutation', updateWorkOrder: (
    { __typename?: 'WorkOrder' }
    & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
  ) };

export type CancelWorkOrderMutationVariables = Exact<{
  workOrderID: Scalars['ID'];
}>;


export type CancelWorkOrderMutation = { __typename?: 'Mutation', cancelWorkOrder: { __typename?: 'DeleteMutationResponse', id: string, wasDeleted: boolean } | (
    { __typename?: 'WorkOrder' }
    & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
  ) };

export type SetWorkOrderStatusCompleteMutationVariables = Exact<{
  workOrderID: Scalars['ID'];
}>;


export type SetWorkOrderStatusCompleteMutation = { __typename?: 'Mutation', setWorkOrderStatusComplete: (
    { __typename?: 'WorkOrder' }
    & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
  ) };

export type WorkOrderQueryVariables = Exact<{
  workOrderID: Scalars['ID'];
}>;


export type WorkOrderQuery = { __typename?: 'Query', workOrder: (
    { __typename?: 'WorkOrder' }
    & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
  ) };

export type MyWorkOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyWorkOrdersQuery = { __typename?: 'Query', myWorkOrders: { __typename?: 'MyWorkOrdersQueryReturnType', createdByUser: Array<(
      { __typename?: 'WorkOrder' }
      & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
    ) | null>, assignedToUser: Array<(
      { __typename?: 'WorkOrder' }
      & { ' $fragmentRefs'?: { 'WorkOrderFieldsFragment': WorkOrderFieldsFragment } }
    ) | null> } };

export const ProfileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]} as unknown as DocumentNode<ProfileFieldsFragment, unknown>;
export const PublicUserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PublicUserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileFields"}}]}}]}},...ProfileFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PublicUserFieldsFragment, unknown>;
export const ContactFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},...ProfileFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ContactFieldsFragment, unknown>;
export const FixitUserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FixitUserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FixitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PublicUserFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactFields"}}]}}]}},...PublicUserFieldsFragmentDoc.definitions,...ContactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FixitUserFieldsFragment, unknown>;
export const InvoiceFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvoiceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Invoice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FixitUserFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FixitUserFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentIntentID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},...FixitUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<InvoiceFieldsFragment, unknown>;
export const WorkOrderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkOrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FixitUserFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FixitUserFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"streetLine1"}},{"kind":"Field","name":{"kind":"Name","value":"streetLine2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"checklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"entryContact"}},{"kind":"Field","name":{"kind":"Name","value":"entryContactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"contractorNotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},...FixitUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<WorkOrderFieldsFragment, unknown>;
export const InvoiceWithWorkOrderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InvoiceWithWorkOrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Invoice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvoiceFields"}},{"kind":"Field","name":{"kind":"Name","value":"workOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}},...InvoiceFieldsFragmentDoc.definitions,...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<InvoiceWithWorkOrderFieldsFragment, unknown>;
export const PhoneContactFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhoneContactFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PhoneContact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUser"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"businessName"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}}]}}]} as unknown as DocumentNode<PhoneContactFieldsFragment, unknown>;
export const StripeConnectAccountFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StripeConnectAccountFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripeConnectAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"detailsSubmitted"}},{"kind":"Field","name":{"kind":"Name","value":"chargesEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"payoutsEnabled"}}]}}]} as unknown as DocumentNode<StripeConnectAccountFieldsFragment, unknown>;
export const UserSubscriptionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSubscriptionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentPeriodEnd"}},{"kind":"Field","name":{"kind":"Name","value":"productID"}},{"kind":"Field","name":{"kind":"Name","value":"priceID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UserSubscriptionFieldsFragment, unknown>;
export const PrivateUserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PrivateUserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerID"}},{"kind":"Field","name":{"kind":"Name","value":"stripeConnectAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeConnectAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSubscriptionFields"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PublicUserFields"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},...StripeConnectAccountFieldsFragmentDoc.definitions,...UserSubscriptionFieldsFragmentDoc.definitions,...PublicUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PrivateUserFieldsFragment, unknown>;
export const UserSubscriptionAuthTokenFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSubscriptionAuthTokenFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentPeriodEnd"}}]}}]} as unknown as DocumentNode<UserSubscriptionAuthTokenFieldsFragment, unknown>;
export const AuthTokenFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthTokenFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerID"}},{"kind":"Field","name":{"kind":"Name","value":"stripeConnectAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StripeConnectAccountFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSubscriptionAuthTokenFields"}}]}}]}},...StripeConnectAccountFieldsFragmentDoc.definitions,...UserSubscriptionAuthTokenFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AuthTokenFieldsFragment, unknown>;
export const WorkOrderWIthInvoiceFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkOrderWIthInvoiceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}},{"kind":"Field","name":{"kind":"Name","value":"invoice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FixitUserFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FixitUserFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"stripePaymentIntentID"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions,...FixitUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<WorkOrderWIthInvoiceFieldsFragment, unknown>;
export const CreateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contactEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactFields"}}]}}]}},...ContactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CreateContactMutation, CreateContactMutationVariables>;
export const DeleteContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contactEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasDeleted"}}]}}]}}]} as unknown as DocumentNode<DeleteContactMutation, DeleteContactMutationVariables>;
export const ContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contactID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactFields"}}]}}]}},...ContactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ContactQuery, ContactQueryVariables>;
export const ContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactFields"}}]}}]}},...ContactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ContactsQuery, ContactsQueryVariables>;
export const CreateInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invoice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoice"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvoiceWithWorkOrderFields"}}]}}]}},...InvoiceWithWorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateInvoiceAmountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInvoiceAmount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInvoiceAmount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invoiceID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvoiceWithWorkOrderFields"}}]}}]}},...InvoiceWithWorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateInvoiceAmountMutation, UpdateInvoiceAmountMutationVariables>;
export const PayInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invoiceID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvoiceWithWorkOrderFields"}}]}}]}},...InvoiceWithWorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PayInvoiceMutation, PayInvoiceMutationVariables>;
export const DeleteInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invoiceID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasDeleted"}}]}}]}}]} as unknown as DocumentNode<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;
export const InvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Invoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invoiceID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvoiceWithWorkOrderFields"}}]}}]}},...InvoiceWithWorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<InvoiceQuery, InvoiceQueryVariables>;
export const InvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Invoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InvoiceWithWorkOrderFields"}}]}}]}},...InvoiceWithWorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<InvoicesQuery, InvoicesQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rawPhoneContacts"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RawPhoneContactInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rawPhoneContacts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rawPhoneContacts"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhoneContactFields"}}]}}]}},...PhoneContactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profile"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileFields"}}]}}]}},...ProfileFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileFields"}}]}}]}},...ProfileFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const UserPrivateFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPrivateFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PrivateUserFields"}}]}}]}},...PrivateUserFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UserPrivateFieldsQuery, UserPrivateFieldsQueryVariables>;
export const UserAuthTokenFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAuthTokenFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthTokenFields"}}]}}]}},...AuthTokenFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UserAuthTokenFieldsQuery, UserAuthTokenFieldsQueryVariables>;
export const CreateWorkOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workOrder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CreateWorkOrderMutation, CreateWorkOrderMutationVariables>;
export const UpdateWorkOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workOrder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workOrderID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}}},{"kind":"Argument","name":{"kind":"Name","value":"workOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>;
export const CancelWorkOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelWorkOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelWorkOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workOrderID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMutationResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasDeleted"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<CancelWorkOrderMutation, CancelWorkOrderMutationVariables>;
export const SetWorkOrderStatusCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetWorkOrderStatusComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setWorkOrderStatusComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workOrderID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<SetWorkOrderStatusCompleteMutation, SetWorkOrderStatusCompleteMutationVariables>;
export const WorkOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workOrderID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workOrderID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<WorkOrderQuery, WorkOrderQueryVariables>;
export const MyWorkOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyWorkOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myWorkOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedToUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkOrderFields"}}]}}]}}]}},...WorkOrderFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MyWorkOrdersQuery, MyWorkOrdersQueryVariables>;
