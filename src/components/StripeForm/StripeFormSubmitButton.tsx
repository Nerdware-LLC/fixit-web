import { useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { type ButtonProps } from "@mui/material/Button";
import { useFetchStateContext } from "@components/Indicators/useFetchStateContext";
import { stripeFormClassNames as classNames } from "./classNames";

export const StripeFormSubmitButton = ({
  label = "Subscribe",
  isSubmitDisabled,
  ...props
}: StripeFormSubmitButtonProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isLoading } = useFetchStateContext();

  return (
    <Button
      type="submit"
      disabled={!stripe || !elements || isLoading || isSubmitDisabled}
      color="primary"
      size="large"
      className={classNames.submitButton}
      {...props}
    >
      {label}
    </Button>
  );
};

export type StripeFormSubmitButtonProps = {
  label?: string;
  isSubmitDisabled: boolean;
} & ButtonProps;
