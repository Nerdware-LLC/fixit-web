import React from "react";
import StripeBadgePurpleSVGsrc from "../../images/powered_by_Stripe_blurple.svg";
import StripeBadgeBlackSVGsrc from "../../images/powered_by_Stripe_black.svg";
import StripeBadgeWhiteSVGsrc from "../../images/powered_by_Stripe_white.svg";

export const StripeBadge = ({
  color = "purple",
  style,
  ...props
}: React.ComponentPropsWithoutRef<"img"> & {
  color?: "purple" | "black" | "white";
}) => (
  <a href="https://stripe.com/" target="_blank" rel="noreferrer">
    <img src={STRIPE_SVGs_BY_COLOR[color]} alt={"Stripe Badge"} style={style} {...props} />
  </a>
);

const STRIPE_SVGs_BY_COLOR = {
  purple: StripeBadgePurpleSVGsrc,
  black: StripeBadgeBlackSVGsrc,
  white: StripeBadgeWhiteSVGsrc
};
