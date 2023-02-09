import StripeBadgePurpleSVGsrc from "@images/powered_by_Stripe_blurple.svg";
import StripeBadgeBlackSVGsrc from "@images/powered_by_Stripe_black.svg";
import StripeBadgeWhiteSVGsrc from "@images/powered_by_Stripe_white.svg";

export const StripeBadge = ({
  color = "purple",
  href = "https://stripe.com/",
  style,
  ...props
}: React.ComponentPropsWithoutRef<"img"> & {
  color?: "purple" | "black" | "white";
  href?: string;
}) => (
  <a href={href} className="stripe-logo-anchor" target="_blank" rel="noreferrer" style={style}>
    <img
      src={STRIPE_SVGs_BY_COLOR[color]}
      className="stripe-logo-img"
      alt="Stripe Badge"
      style={style}
      {...props}
    />
  </a>
);

const STRIPE_SVGs_BY_COLOR = {
  purple: StripeBadgePurpleSVGsrc,
  black: StripeBadgeBlackSVGsrc,
  white: StripeBadgeWhiteSVGsrc
};
