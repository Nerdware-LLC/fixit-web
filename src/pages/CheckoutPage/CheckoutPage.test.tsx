import renderer from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CheckoutPage } from "./CheckoutPage";
import { ThemeProvider } from "@app/ThemeProvider";

it("renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter
            initialEntries={[
              "/checkout?token=TEST_TOKEN_VALUE&sub=annual&promoCode=TEST_PROMO_CODE"
            ]}
          >
            <Routes>
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
