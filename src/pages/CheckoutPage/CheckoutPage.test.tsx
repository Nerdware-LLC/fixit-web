import { renderWithProviders } from "@tests/utils/renderWithProviders";
import { CheckoutPage } from "./CheckoutPage";

it("renders correctly", () => {
  expect(
    renderWithProviders(<CheckoutPage />, {
      providersProps: {
        routerProps: {
          initialEntries: ["/checkout"],
          route: "/checkout",
        },
      },
    })
  ).toMatchSnapshot();
});
