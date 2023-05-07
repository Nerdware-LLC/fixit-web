import { MemoryRouter, Routes, Route } from "react-router-dom";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@app/ThemeProvider";
import { PageNotFound } from "./PageNotFound";

it("renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/test-page-not-found"]}>
            <Routes>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
