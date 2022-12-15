import renderer from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "./PageNotFound";
import { ThemeProvider } from "@app/ThemeProvider";

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
