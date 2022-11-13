import renderer from "react-test-renderer";
import { StripeBadge } from "./StripeBadge";

it("renders correctly", () => {
  const tree = renderer.create(<StripeBadge />).toJSON();
  expect(tree).toMatchSnapshot();
});
