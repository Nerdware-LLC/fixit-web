import renderer from "react-test-renderer";
import { ThemeProvider } from "@app/ThemeProvider";
import { ErrorMessage } from "./ErrorMessage";

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
