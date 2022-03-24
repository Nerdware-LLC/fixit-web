import renderer from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { StripeCustomerPortalBridge } from "./StripeCustomerPortalBridge";
import { ThemeProvider } from "../../app/ThemeProvider";

it("renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/customer-portal"]}>
            <Routes>
              <Route
                path="/customer-portal"
                element={<StripeCustomerPortalBridge />}
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
