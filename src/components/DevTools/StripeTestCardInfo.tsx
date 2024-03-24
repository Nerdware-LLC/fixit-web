import { styled } from "@mui/material/styles";
import List, { listClasses } from "@mui/material/List";
import Stack, { type StackProps } from "@mui/material/Stack";
import { Anchor } from "@/components/Navigation/Anchor";
import { ClickToCopyText, textClassNames } from "@/components/Text";
import type { Except } from "type-fest";

/**
 * This component provides the user with information about using Stripe's test
 * card numbers for testing payment flows.
 */
export const StripeTestCardInfo = ({
  spacing = "0.5rem",
  ...stackProps
}: StripeTestCardInfoProps) => (
  <StyledStack spacing={spacing} {...stackProps}>
    <List>
      <li style={{ margin: 0 }}>
        All Stripe API calls are invoked with{" "}
        <Anchor href="https://docs.stripe.com/test-mode">test mode keys</Anchor>.
      </li>
      <li>
        To test one of the payment flows, use the{" "}
        <Anchor
          href="https://docs.stripe.com/testing#testing-interactively"
          style={{ display: "contents" }}
        >
          Stripe-provided test card number
        </Anchor>{" "}
        in any payment form:{" "}
        <ul style={{ paddingInlineStart: "1.25rem" }}>
          <li>
            For the card number, enter{" "}
            <ClickToCopyText stripeWhitespace>4242 4242 4242 4242</ClickToCopyText>
          </li>
          <li>For the exp date, use any valid future date.</li>
          <li>For the CVC, use any 3 digits.</li>
          <li>For the postal code, use any valid US zip code.</li>
        </ul>
      </li>
    </List>
    Example:
    <img
      src="https://b.stripecdn.com/docs-statics-srv/assets/test-card.c3f9b3d1a3e8caca3c9f4c9c481fd49c.jpg"
      alt="Stripe test card details"
      style={{
        boxShadow: "0 0 0.25rem rgba(0,0,0,0.5)",
        borderRadius: "0.25rem",
        marginBottom: "0.5rem",
      }}
    />
  </StyledStack>
);

const StyledStack = styled(Stack)(({ theme: { variables } }) => ({
  [`& > .${listClasses.root}`]: {
    padding: "0 0 0 1.25rem",

    "& > li": {
      listStyleType: "disc",
      marginTop: "0.25rem",

      "& > ul > li": {
        marginTop: "0.25rem",
        ...(!variables.isMobilePageLayout && {
          maxHeight: "1.5rem",
        }),

        [`& > .${textClassNames.clickToCopyTextRoot}`]: {
          transform: "translateY(-1px)",
        },
      },
    },
  },
  "& img": {
    boxShadow: "0 0 0.25rem rgba(0,0,0,0.5)",
    borderRadius: "0.25rem",
    marginBottom: "0.5rem",
  },
}));

export type StripeTestCardInfoProps = Except<StackProps, "children">;
