import renderer from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MobileWebviewStripeBridge } from "./MobileWebviewStripeBridge";
import { ThemeProvider } from "@app/ThemeProvider";

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
