import renderer from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { StripeConnectBridge } from "./StripeConnectBridge";
import { ThemeProvider } from "../../app/ThemeProvider";

it("renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/connect/return"]}>
            <Routes>
              <Route
                path="/connect/:redirectType"
                element={<StripeConnectBridge />}
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
