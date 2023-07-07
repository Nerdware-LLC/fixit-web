// This file is used in Vitest config `setupFiles` (https://vitest.dev/config/#setupfiles)
// react-testing-library renders components to `document.body`
// jest-dom adds custom jest matchers for test assertions on DOM nodes
import "@testing-library/jest-dom";
// // https://github.com/wobsoriano/vitest-canvas-mock#readme
import "vitest-canvas-mock";

// This is necessary because jsdom does not implement fetch.
globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init);
