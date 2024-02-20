import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import { Anchor, type AnchorProps } from "@/components/Navigation/Anchor";
import StripeBadgeSVG from "@/images/powered_by_Stripe_purple.svg";
import { brandingClassNames } from "./classNames";
import type { Simplify, Except } from "type-fest";

export const StripeBadge = ({
  href = "https://stripe.com/",
  tabIndex = -1,
  tooltipProps: { title, ...tooltipProps } = {},
  anchorProps = {},
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
        className={brandingClassNames.stripeBadgeImg}
        alt="Stripe Badge"
        {...imgProps}
      />
    </Anchor>
  </Tooltip>
);

export type StripeBadgeProps = {
  href?: string;
  tooltipProps?: Simplify<Partial<Except<TooltipProps, "children" | "className">>>;
  anchorProps?: Simplify<Except<AnchorProps, "ref" | "href" | "target" | "rel" | "className">>;
} & Except<React.ComponentPropsWithoutRef<"img">, "src" | "className" | "children">;
