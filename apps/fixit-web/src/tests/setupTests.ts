import "vitest-canvas-mock";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { mockLocalStorage } from "./utils/mockLocalStorage.js";

/**
 * This Vitest setup file accomplishes the following:
 *
 *   1. Imports vitest-canvas-mock which mocks the HTML5 Canvas API.
 *   2. Adds custom matchers from @testing-library/jest-dom for test assertions on DOM nodes.
 *   3. Stubs globals:
 *        - fetch           jsdom does not implement fetch.
 *        - localStorage    Facilitates headless test suite execution.
 *   4. Implements default mocks for commonly-used modules:
 *        - react-router-dom
 */

// STUB GLOBALS:

createFetchMock(vi).enableMocks();

vi.stubGlobal("localStorage", mockLocalStorage);

// Reset the mock localStorage before each test
beforeEach(() => {
  mockLocalStorage.clear();
});

// MOCK MODULES:

vi.mock("react-router-dom", async () => {
  const actuals = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

  return {
    ...actuals,
    useNavigate: () => vi.fn(),
  };
});
