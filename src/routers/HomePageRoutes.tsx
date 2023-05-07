import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePageLayout } from "@layouts/HomePageLayout";
import { ContactsListView } from "@pages/Contacts/ListView";
import { DashboardPage } from "@pages/Dashboard";
import { InvoicesListView } from "@pages/Invoices/ListView";
import { WorkOrdersListView } from "@pages/WorkOrders/ListView";
import { StripeConnectOnboardingStateLayer } from "./StripeConnectOnboardingStateLayer";

const WorkOrderItemView = lazy(() => import(/* webpackChunkName: "WorkOrdersItemView" */ "@pages/WorkOrders/ItemView")); // prettier-ignore
const WorkOrderForm = lazy(() => import(/* webpackChunkName: "WorkOrdersFormView" */ "@ROOT/src/pages/WorkOrders/FormView")); // prettier-ignore
const InvoiceItemView = lazy(() => import(/* webpackChunkName: "InvoicesItemView" */ "@pages/Invoices/ItemView")); // prettier-ignore
const InvoiceForm = lazy(() => import(/* webpackChunkName: "InvoicesFormView" */ "@pages/Invoices/FormView")); // prettier-ignore
const ContactItemView = lazy(() => import(/* webpackChunkName: "ContactsItemView" */ "@pages/Contacts/ItemView")); // prettier-ignore
const ProfilePage = lazy(() => import(/* webpackChunkName: "ProfilePage" */ "@pages/ProfilePage"));

const HomePageRoutes = () => (
  <Routes>
    <Route
      element={
        <StripeConnectOnboardingStateLayer>
          <HomePageLayout />
        </StripeConnectOnboardingStateLayer>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="workorders">
        <Route index element={<WorkOrdersListView />} />
        <Route path="form" element={<WorkOrderForm />} />
        <Route path=":id" element={<WorkOrderItemView />} />
      </Route>
      <Route path="invoices">
        <Route index element={<InvoicesListView />} />
        <Route path="form" element={<InvoiceForm />} />
        <Route path=":id" element={<InvoiceItemView />} />
      </Route>
      <Route path="contacts">
        <Route index element={<ContactsListView />} />
        <Route path=":id" element={<ContactItemView />} />
      </Route>
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  </Routes>
);

export default HomePageRoutes;
