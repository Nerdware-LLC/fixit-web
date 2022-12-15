import renderer from "react-test-renderer";
import { Title } from "./Title";
import { ThemeProvider } from "@app/ThemeProvider";

it("renders correctly", () => {
  // ThemeProvider is necessary to be able to access prop.theme in styled css.
  const tree = renderer
    .create(
      <ThemeProvider>
        <Title>Test Title</Title>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
