import { withHomePageLayoutDecorator } from "@/../.storybook/decorators";
import { CoreItemView } from "@/layouts/CoreItemView";
import { MOCK_INVOICES } from "@/tests/mockItems/mockInvoices.js";
import { invoiceItemViewSX } from "./InvoiceItemView.jsx";
import { InvoiceItemViewContent } from "./InvoiceItemViewContent.jsx";
import { InvoiceItemViewHeader } from "./InvoiceItemViewHeader.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/InvoiceItemView",
  component: CoreItemView,
  decorators: [withHomePageLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CoreItemView>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

// Pick an arbitrary invoice from the mock data
const mockINV = MOCK_INVOICES.myInvoices.createdByUser[0];

export const WithMockInvoice = {
  args: {
    headerLabel: "Invoice",
    headerComponents: <InvoiceItemViewHeader invoice={mockINV} />,
    sx: invoiceItemViewSX,
    children: <InvoiceItemViewContent invoice={mockINV} />,
  },
} satisfies Story;
