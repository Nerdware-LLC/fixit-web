import ReactDOM from "react-dom";
import { renderWithProviders } from "@tests/utils/renderWithProviders";
import { Dialog } from "./Dialog";
import type { Mock } from "vitest";

beforeAll(() => {
  // Mock ReactDOM.createPortal for components built on top of Portal.
  // (react-test-renderer does not support this OOB)
  ReactDOM.createPortal = vi.fn((element: React.ReactNode, _node: Element | DocumentFragment) => {
    return element as React.ReactPortal;
  });
});

afterEach(() => {
  (ReactDOM.createPortal as Mock).mockClear();
});

/* NOTE: for Portal'ed components, we have to use @testing-library/react,
react-test-renderer doesn't support Portals.  */

it("renders correctly", () => {
  expect(
    renderWithProviders(
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
