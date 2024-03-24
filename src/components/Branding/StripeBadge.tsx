import { styled } from "@mui/material/styles";
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
  ...imgProps
}: StripeBadgeProps) => (
  <Tooltip title={title || href} {...tooltipProps}>
    <StyledAnchor
      href={href}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
      className={brandingClassNames.stripeBadgeAnchor}
      {...anchorProps}
    >
      <img
        src={StripeBadgeSVG}
        alt="Stripe Badge"
        className={brandingClassNames.stripeBadgeImg}
        {...imgProps}
      />
    </StyledAnchor>
  </Tooltip>
);

/**
 * A collection of links to Stripe's website.
 */
export const STRIPE_LINKS = {
  LANDING_PAGE: "https://stripe.com/",
  CONNECT_ACCOUNT_AGREEMENT: "https://stripe.com/connect-account/legal/full",
} as const satisfies Record<string, string>;

const StyledAnchor = styled(Anchor)({
  display: "contents",

  [`& > .${brandingClassNames.stripeBadgeImg}`]: {
    height: "100%",
    minHeight: "1.5rem !important", // smaller than this, and the text is too small on most screens
    maxHeight: "3rem !important", // currently no reason the badge should ever be taller than this
    objectFit: "contain",
  },
});

export type StripeBadgeProps = {
  href?: (typeof STRIPE_LINKS)[keyof typeof STRIPE_LINKS];
  tooltipProps?: Simplify<Partial<Except<TooltipProps, "children" | "className">>>;
  anchorProps?: Simplify<Except<AnchorProps, "ref" | "href" | "target" | "rel" | "className">>;
} & Except<React.ComponentPropsWithoutRef<"img">, "src" | "className" | "children">;
