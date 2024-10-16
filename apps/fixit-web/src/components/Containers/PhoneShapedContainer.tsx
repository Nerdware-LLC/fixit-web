import React from "react";
import { styled } from "@mui/material/styles";
import Paper, { type PaperProps } from "@mui/material/Paper";
import { containerClassNames } from "./classNames.js";
import type { SetRequired } from "type-fest";

/**
 * A phone-shaped container for displaying images of mobile app UI.
 *
 * The `<img />` element can be configured via the `imgProps` prop, or an
 * `<img />` element can be passed as a child.
 */
export const PhoneShapedContainer = ({
  elevation = 24,
  className = "",
  imgProps,
  children,
  ...paperProps
}: PhoneShapedContainerProps) => (
  <StyledPaper
    elevation={elevation}
    className={containerClassNames.phoneShapedContainerRoot + " " + className}
    {...paperProps}
  >
    <div>{imgProps ? <img {...imgProps} alt={imgProps.alt} /> : children}</div>
  </StyledPaper>
);

const StyledPaper = styled(Paper)(({ theme: { palette } }) => ({
  borderRadius: "2rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: palette.divider,
  "& > div": {
    height: "100%",
    borderRadius: "2rem",
    borderWidth: "0.5rem",
    borderStyle: "solid",
    borderColor: palette.background.paper,
    "& > img": {
      height: "100%",
      objectFit: "contain",
      borderRadius: "1.35rem",
    },
  },
}));

export type PhoneShapedContainerProps = Omit<PaperProps, "children"> &
  (
    | {
        imgProps: SetRequired<React.ComponentPropsWithoutRef<"img">, "alt">;
        children?: never;
      }
    | {
        imgProps?: never;
        children: React.ReactNode;
      }
  );
