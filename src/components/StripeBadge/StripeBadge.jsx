import React from "react";
import StripeBadgeSrc from "../../images/powered_by_stripe.png";
import { oneOf } from "../../types";

export const StripeBadge = ({ size = "normal", ...props }) => (
  <span {...props}>
    <a href="https://stripe.com/">
      <img src={StripeBadgeSrc} alt={"Stripe Badge"} />
    </a>
  </span>
);

StripeBadge.propTypes = {
  size: oneOf(["small", "normal", "large"])
};
