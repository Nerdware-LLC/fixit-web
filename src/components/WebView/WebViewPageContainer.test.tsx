import renderer from "react-test-renderer";
import { useLocation, MemoryRouter, Routes, Route } from "react-router-dom";
import { WebViewPageContainer } from "./WebViewPageContainer";
import { ThemeProvider } from "../../app/ThemeProvider";

const LocationInfo = () => {
  let { pathname, search } = useLocation();
  return <pre>{JSON.stringify({ pathname, search })}</pre>;
};

it("renders correctly", () => {
  // ThemeProvider is necessary to be able to access prop.theme in styled css.
  expect(
    renderer
      .create(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/test-route"]}>
            <Routes>
              <Route element={<WebViewPageContainer />}>
                <Route path="/test-route" element={<LocationInfo />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
