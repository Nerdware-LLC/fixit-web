import renderer from "react-test-renderer";
import { StripeForm } from "./StripeForm";

jest.mock("./StripeFormChild", () => ({
  __esModule: true,
  StripeFormChild: () => <span>Mock_StripeFormChild</span>,
}));

it("renders correctly", () => {
  const tree = renderer.create(<StripeForm handleSubmit={jest.fn()} />).toJSON();

  expect(tree).toMatchSnapshot();
});
