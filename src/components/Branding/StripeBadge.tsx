import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import { Anchor, type AnchorProps } from "@/components/Navigation/Anchor";
import StripeBadgeSVG from "@/images/powered_by_Stripe_purple.svg";
import { brandingClassNames } from "./classNames";
import type { Simplify, Except } from "type-fest";

export const StripeBadge = ({
  href = STRIPE_LINKS.LANDING_PAGE,
  tabIndex = -1,
  tooltipProps: { title, ...tooltipProps } = {},
  anchorProps = {},
  style: imgStyle = {},
  ...imgProps
}: StripeBadgeProps) => (
  <Tooltip title={title || href} {...tooltipProps}>
    <Anchor
      href={href}
      className={`${brandingClassNames.stripeBadgeRoot} ${brandingClassNames.stripeBadgeAnchor}`}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
      {...anchorProps}
    >
      <img
        src={StripeBadgeSVG}
        alt="Stripe Badge"
        className={brandingClassNames.stripeBadgeImg}
        style={{ height: "100%", ...imgStyle }}
        {...imgProps}
      />
    </Anchor>
  </Tooltip>
);

/**
 * A collection of links to Stripe's website.
 */
export const STRIPE_LINKS = {
  LANDING_PAGE: "https://stripe.com/",
  CONNECT_ACCOUNT_AGREEMENT: "https://stripe.com/connect-account/legal/full",
} as const satisfies Record<string, string>;

export type StripeBadgeProps = {
  href?: (typeof STRIPE_LINKS)[keyof typeof STRIPE_LINKS];
  tooltipProps?: Simplify<Partial<Except<TooltipProps, "children" | "className">>>;
  anchorProps?: Simplify<Except<AnchorProps, "ref" | "href" | "target" | "rel" | "className">>;
} & Except<React.ComponentPropsWithoutRef<"img">, "src" | "className" | "children">;
