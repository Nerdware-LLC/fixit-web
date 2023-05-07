import { MemoryRouter, Routes, Route } from "react-router-dom";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@app/ThemeProvider";
import { MobileWebviewStripeBridge } from "./MobileWebviewStripeBridge";

it("renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/home/connect/return"]}>
            <Routes>
              <Route path="/home/connect/:redirectType" element={<MobileWebviewStripeBridge />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
