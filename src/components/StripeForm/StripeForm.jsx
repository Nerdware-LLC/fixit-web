import React from "react";
import { StripeContextProvider } from "./StripeContextProvider";
import { StripeFormChild, STRIPE_FORM_PROP_TYPES } from "./StripeFormChild";
import { FetchStateContextWrapper } from "../Indicators";

export const StripeForm = ({ handleSubmit, ...otherProps }) => (
  <StripeContextProvider>
    <FetchStateContextWrapper>
      <StripeFormChild handleSubmit={handleSubmit} {...otherProps} />
    </FetchStateContextWrapper>
  </StripeContextProvider>
);

StripeForm.propTypes = STRIPE_FORM_PROP_TYPES;
