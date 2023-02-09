import { useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import { useFetchStateContext } from "@components";

export const StripeFormSubmitButton = ({
  label = "Subscribe",
  isSubmitDisabled,
  ...props
}: React.ComponentProps<typeof Button> & {
  label?: string;
  isSubmitDisabled: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isLoading } = useFetchStateContext();

  return (
    <Button
      type="submit"
      disabled={!stripe || !elements || isLoading || isSubmitDisabled}
      color="primary"
      size="large"
      style={{
        display: "flex",
        justifySelf: "flex-end",
        lineHeight: "1.75rem"
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
