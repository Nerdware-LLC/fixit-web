import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../Button";
import { useFetchStateContext } from "../Indicators";
import { string, bool } from "@types";

export const StripeFormSubmitButton = ({
  label,
  isSubmitDisabled,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "label"> & {
  label?: string;
  isSubmitDisabled: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isLoading } = useFetchStateContext();

  return (
    <Button
      label={label ?? "Subscribe"}
      type="submit"
      disabled={!stripe || !elements || isLoading || isSubmitDisabled}
      variant="contained"
      color="primary"
      size="large"
      style={defaultStyle}
      {...props}
    />
  );
};

const defaultStyle = {
  display: "flex",
  justifySelf: "flex-end",
  lineHeight: "1.75rem"
};

StripeFormSubmitButton.propTypes = {
  label: string,
  isSubmitDisabled: bool.isRequired
};
