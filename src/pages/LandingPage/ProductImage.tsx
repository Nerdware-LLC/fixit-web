import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Dialog, { dialogClasses } from "@mui/material/Dialog";
import { globalClassNames } from "@/app/GlobalStyles/classNames";
import {
  ImageCarousel,
  type ImageCarouselProps,
  type CarouselImageConfig,
} from "@/components/ImageCarousel";
import { NoMaxWidthTooltip } from "@/components/Tooltips";
import demoDesktopDashboardImageSrc from "@/images/demo_desktop_dashboard.webp";
import demoDesktopDataGridImageSrc from "@/images/demo_desktop_workorders_datagrid.webp";
import demoMobileCreateInvoiceImageSrc from "@/images/demo_mobile_create_invoice.webp";
import demoMobileListViewImageSrc from "@/images/demo_mobile_workorders_list.webp";
import type { OverrideProperties } from "type-fest";

export const ProductImage = ({
  label,
  src,
  ImageCarouselProps = {},
  ...boxProps
}: ProductImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <NoMaxWidthTooltip title={`Click to view image: ${label}`}>
        <Box component="img" src={src} alt={label} onClick={handleOpen} {...boxProps} />
      </NoMaxWidthTooltip>
      {isModalOpen && (
        <StyledDialog
          open={isModalOpen}
          onClose={handleClose}
          fullWidth
          PaperProps={{ className: globalClassNames.scrollbarForceHidden }}
        >
          <ImageCarousel
            images={PRODUCT_IMAGES}
            initialImageIndex={PRODUCT_IMAGES.findIndex((image) => image.label === label)}
            showImageLabels
            {...ImageCarouselProps}
          />
        </StyledDialog>
      )}
    </>
  );
};

export const PRODUCT_IMAGES = [
  { label: "Fixit Dashboard demo", src: demoDesktopDashboardImageSrc },
  { label: "Fixit Create-Invoice mobile demo", src: demoMobileCreateInvoiceImageSrc },
  { label: "Fixit Data-grid demo", src: demoDesktopDataGridImageSrc },
  { label: "Fixit List-view mobile demo", src: demoMobileListViewImageSrc },
] as const satisfies Array<CarouselImageConfig>;

const StyledDialog = styled(Dialog)({
  // Starting from div.MuiDialog-root
  [`& > .${dialogClasses.container}`]: {
    //
    [`& > .${dialogClasses.paper}`]: {
      width: "80vw",
      maxWidth: "80vw",
      height: "80vh",
      maxHeight: "80vh",
      overflow: "hidden",
      borderRadius: "0.5rem",
    },
  },
});

export type ProductImageProps = OverrideProperties<
  CarouselImageConfig,
  {
    label: (typeof PRODUCT_IMAGES)[number]["label"];
  }
> & {
  ImageCarouselProps?: Omit<ImageCarouselProps, "images" | "initialImageIndex">;
} & Omit<BoxProps, "component" | "onClick" | "children">;
