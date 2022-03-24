/* Currently CheckoutPage is the only consumer of this hook,
so for the sake of simplicity, the mocked version below just
returns an object which reflects the query params expected
by that component.*/

export const useQueryParams = () => ({
  token: "TEST_AUTH_TOKEN",
  sub: "annual",
  promoCode: "TEST_PROMO_CODE"
});
