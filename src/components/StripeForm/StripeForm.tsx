import { StripeContextProvider } from "./StripeContextProvider";
import { StripeFormChild } from "./StripeFormChild";

export const StripeForm = (props: React.ComponentProps<typeof StripeFormChild>) => (
  <StripeContextProvider>
    <StripeFormChild {...props} />
  </StripeContextProvider>
);
