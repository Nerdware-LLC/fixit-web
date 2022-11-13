import renderer from "react-test-renderer";
import { Text } from "./Text";
import { ThemeProvider } from "../../app/ThemeProvider";

it("renders correctly", () => {
  // ThemeProvider is necessary to be able to access prop.theme in styled css.
  const tree = renderer
    .create(
      <ThemeProvider>
        <Text>This is TEST text.</Text>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
