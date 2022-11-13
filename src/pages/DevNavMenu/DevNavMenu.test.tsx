import renderer from "react-test-renderer";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { DevNavMenu } from "./DevNavMenu";
import { ThemeProvider } from "../../app/ThemeProvider";

it("renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route index element={<DevNavMenu />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
