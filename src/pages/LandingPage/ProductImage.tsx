import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Dialog, { dialogClasses } from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { globalClassNames } from "@/app/GlobalStyles/classNames.js";
import {
  ImageCarousel,
  type ImageCarouselProps,
  type CarouselImageConfig,
} from "@/components/ImageCarousel";
import demoDesktopDashboardImageSrc from "@/images/demo_desktop_dashboard.webp";
import demoDesktopDataGridImageSrc from "@/images/demo_desktop_workorders_datagrid.webp";
import demoMobileCreateInvoiceImageSrc from "@/images/demo_mobile_create_invoice.webp";
import demoMobileListViewImageSrc from "@/images/demo_mobile_workorders_list.webp";
import type { OverrideProperties } from "type-fest";

export const ProductImage = ({
  label,
  ImageCarouselProps = {},
  sx,
  ...boxProps
}: ProductImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const productImgSrcIndex = PRODUCT_IMAGES.findIndex((image) => image.label === label);

  const src = PRODUCT_IMAGES?.[productImgSrcIndex]?.src;

  if (!src) {
    throw new Error(`ProductImage received an invalid "label" prop: "${label}".`);
  }

  return (
    <>
      <Tooltip title={`Click to view image: ${label}`}>
        <Box
          component="img"
          src={src}
          alt={label}
          onClick={handleOpen}
          sx={{ "&:hover": { cursor: "pointer" }, ...sx }}
          {...boxProps}
        />
      </Tooltip>
      {isModalOpen && (
        <StyledDialog
          open={isModalOpen}
          onClose={handleClose}
          fullWidth
          PaperProps={{ className: globalClassNames.scrollbar.forceHidden }}
        >
          <ImageCarousel
            images={PRODUCT_IMAGES}
            initialImageIndex={productImgSrcIndex}
            showImageLabels
            {...ImageCarouselProps}
          />
        </StyledDialog>
      )}
    </>
  );
};

const PRODUCT_IMAGES = [
  { label: "Fixit Dashboard demo", src: demoDesktopDashboardImageSrc },
  { label: "Fixit Create-Invoice on mobile", src: demoMobileCreateInvoiceImageSrc },
  { label: "Fixit work orders data-grid", src: demoDesktopDataGridImageSrc },
  { label: "Fixit work orders list-view on mobile", src: demoMobileListViewImageSrc },
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
  Omit<CarouselImageConfig, "src">,
  {
    label: (typeof PRODUCT_IMAGES)[number]["label"];
  }
> & {
  ImageCarouselProps?: Omit<ImageCarouselProps, "images" | "initialImageIndex">;
} & Omit<BoxProps, "component" | "onClick" | "src" | "children">;
