import renderer from "react-test-renderer";
import { StripeForm, type StripeFormProps } from "./StripeForm";

vi.mock("./StripeFormElements", () => ({
  __esModule: true,
  StripeFormElements: () => <span>Mock_StripeFormElements</span>,
}));

it("renders correctly", () => {
  expect(
    renderer
      .create(<StripeForm handleSubmit={vi.fn() as StripeFormProps["handleSubmit"]} />)
      .toJSON()
  ).toMatchSnapshot();
});
