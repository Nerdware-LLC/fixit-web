import { ProductImage } from "./ProductImage.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/LandingPage/ProductImage",
  component: ProductImage,
  decorators: [
    (Story) => (
      <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ImageCarouselProps: {
      showImageLabels: true,
    },
    style: { maxHeight: "100%", maxWidth: "100%" },
  },
} satisfies Meta<typeof ProductImage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const DashboardDesktopView = {
  args: {
    label: "Fixit Dashboard demo",
  },
} satisfies Story;

export const CreateInvoiceMobileView = {
  args: {
    label: "Fixit Create-Invoice on mobile",
  },
} satisfies Story;

export const DataGridDemo = {
  args: {
    label: "Fixit work orders data-grid",
  },
} satisfies Story;

export const ListViewMobileDemo = {
  args: {
    label: "Fixit work orders list-view on mobile",
  },
} satisfies Story;
