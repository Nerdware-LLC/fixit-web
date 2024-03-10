import { ProductImage, PRODUCT_IMAGES } from "./ProductImage";
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
  args: { ...PRODUCT_IMAGES[0] },
} satisfies Story;

export const CreateInvoiceMobileView = {
  args: { ...PRODUCT_IMAGES[1] },
} satisfies Story;

export const DataGridDemo = {
  args: { ...PRODUCT_IMAGES[2] },
} satisfies Story;

export const ListViewMobileDemo = {
  args: { ...PRODUCT_IMAGES[3] },
} satisfies Story;
