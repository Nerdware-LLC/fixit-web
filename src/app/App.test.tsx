import renderer from "react-test-renderer";
import { App } from "./App";

test("renders without crashing", () => {
  // This test simply checks that the App component can render without crashing
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toBeTruthy();
});
