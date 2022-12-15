import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { StripeConnectOnboardingStateLayer } from "./StripeConnectOnboardingStateLayer";

// HomePage Layout + index element
import { HomePageLayout } from "@layouts";
import { DashboardPage } from "@pages/Dashboard";

// Core Items: lists
import { WorkOrdersListView } from "@pages/WorkOrders/ListView";
import { InvoicesListView } from "@pages/Invoices/ListView";
import { ContactsListView } from "@pages/Contacts/ListView";

// Core Items: non-list components
const WorkOrderItemView = lazy(() => import("@pages/WorkOrders/ItemView"));
const WorkOrderForm = lazy(() => import("@ROOT/src/pages/WorkOrders/FormView"));
const InvoiceItemView = lazy(() => import("@pages/Invoices/ItemView"));
const InvoiceForm = lazy(() => import("@pages/Invoices/FormView"));
const ContactItemView = lazy(() => import("@pages/Contacts/ItemView"));
const ContactForm = lazy(() => import("@pages/Contacts/FormView"));

// Other Pages/Views:
const ProfilePage = lazy(() => import("@pages/ProfilePage"));

const HomePageRoutes = () => {
  return (
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
          <Route path="form" element={<ContactForm />} />
          <Route path=":id" element={<ContactItemView />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default HomePageRoutes;
