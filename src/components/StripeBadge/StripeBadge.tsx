import StripeBadgeSVG from "@images/powered_by_Stripe_purple.svg";

export const StripeBadge = ({
  href = "https://stripe.com/",
  style,
  ...props
}: StripeBadgeProps) => (
  <a
    href={href}
    className={`${stripeBadgeClassNames.root} ${stripeBadgeClassNames.anchor}`}
    target="_blank"
    rel="noreferrer"
    style={style}
  >
    <img
      src={StripeBadgeSVG}
      className={stripeBadgeClassNames.img}
      alt="Stripe Badge"
      style={style}
      {...props}
    />
  </a>
);

export const stripeBadgeClassNames = {
  root: "stripe-badge-root",
  anchor: "stripe-logo-anchor",
  img: "stripe-logo-img",
};

export type StripeBadgeProps = {
  href?: string;
} & React.ComponentPropsWithoutRef<"img">;
