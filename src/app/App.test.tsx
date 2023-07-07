import renderer from "react-test-renderer";
import { it } from "vitest";
import { App } from "./App";

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
