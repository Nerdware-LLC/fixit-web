import {
  storage as _storage,
  type LocalStorageWrapperKey,
  type LocalStorageValueManager,
  type LocalStorageUtil,
} from "../storage";

let _mockLocalStorage: {
  [K in LocalStorageWrapperKey as K]?: LocalStorageValueManager;
} = {};

beforeEach(() => {
  // Ensure _mockLocalStorage is emptied before each test.
  _mockLocalStorage = {};
});

export const storage = _storage.KEYS.reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      get: jest.fn(() => {
        return _mockLocalStorage?.[key] ?? null;
      }),
      set: jest.fn((str) => {
        _mockLocalStorage[key] = str;
      }),
      setDefaultIfEmpty: jest.fn((defaultValue) => {
        const currentlyStoredValue = _mockLocalStorage?.[key] ?? null;
        if (currentlyStoredValue === null) _mockLocalStorage[key] = defaultValue;
      }),
      remove: jest.fn((str) => {
        delete _mockLocalStorage[key];
      }),
    },
  }),
  { KEYS: [..._storage.KEYS] } as LocalStorageUtil
);
