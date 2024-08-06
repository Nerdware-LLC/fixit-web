import { ImageCarousel } from "./ImageCarousel.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/ImageCarousel",
  component: ImageCarousel,
  decorators: [
    (Story) => (
      <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageCarousel>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    images: [
      "https://picsum.photos/seed/yvyiJ/640/480",
      "https://picsum.photos/seed/13nxj7X7/640/480",
      "https://picsum.photos/seed/BLA60wJBa/640/480",
      "https://picsum.photos/seed/NmFcRNn/640/480",
      "https://picsum.photos/seed/YpRUOrcLl/640/480",
    ].map((imgURL, index) => ({
      label: `Foo Random Image ${index + 1}`,
      src: imgURL,
    })),
    showImageLabels: true,
    style: {
      height: "30rem",
      width: "40rem",
    },
  },
} satisfies Story;
