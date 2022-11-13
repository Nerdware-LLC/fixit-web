const _AUTH_TOKEN_KEY = "@authToken";

let _mockLocalStorage = {} as { [_AUTH_TOKEN_KEY]?: string };

beforeEach(() => {
  // Ensure _mockLocalStorage is emptied before each test.
  _mockLocalStorage = {};
});

export const storage = {
  // AUTH TOKEN
  setAuthToken: jest.fn((str) => {
    _mockLocalStorage[_AUTH_TOKEN_KEY] = str;
  }),
  getAuthToken: jest.fn(() => {
    return _mockLocalStorage?.[_AUTH_TOKEN_KEY] ?? null;
  }),
  removeAuthToken: jest.fn((str) => {
    delete _mockLocalStorage[_AUTH_TOKEN_KEY];
  })
};
