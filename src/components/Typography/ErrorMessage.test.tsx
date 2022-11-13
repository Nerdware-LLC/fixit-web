import renderer from "react-test-renderer";
import { ErrorMessage } from "./ErrorMessage";
import { ThemeProvider } from "../../app/ThemeProvider";

it("renders correctly", () => {
  // ThemeProvider is necessary to be able to access prop.theme in styled css.
  const tree = renderer
    .create(
      <ThemeProvider>
        <ErrorMessage error="This is a TEST error message." />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
