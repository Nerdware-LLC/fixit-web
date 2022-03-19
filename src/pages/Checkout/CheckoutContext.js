import { createContext, useContext } from "react";

export const CheckoutContext = createContext({
  selectedSubscription: "",
  coupon: "",
  handlePostSubmit: () => {}
});

export const useCheckoutContext = () => useContext(CheckoutContext);
