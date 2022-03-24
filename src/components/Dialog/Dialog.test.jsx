import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { Dialog } from "./Dialog";

beforeAll(() => {
  // Mock ReactDOM.createPortal for components built on top of Portal.
  // (react-test-renderer does not support this OOB)
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
});

afterEach(() => {
  ReactDOM.createPortal.mockClear();
});

/* NOTE: for Portal'ed components, we have to use @testing-library/react,
react-test-renderer doesn't support Portals.  */

it("renders correctly", () => {
  expect(
    render(
      <div>
        <Dialog
          isVisible={true}
          title="Test Dialog Title"
          message="This is a test dialog message."
        />
      </div>
    ).baseElement
  ).toMatchSnapshot();
});
