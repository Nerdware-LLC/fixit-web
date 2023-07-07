import renderer from "react-test-renderer";
import { ErrorBoundary } from "./ErrorBoundary";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ErrorBoundary>
        <div>
          <p>This is a TEST of ErrorBoundary.</p>
        </div>
      </ErrorBoundary>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
