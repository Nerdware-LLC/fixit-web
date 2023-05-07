import {
  _STORAGE_KEYS,
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

export const storage = _STORAGE_KEYS.reduce(
  (acc, storageKey) => ({
    ...acc,
    [storageKey]: {
      get: jest.fn(() => {
        return _mockLocalStorage?.[storageKey] ?? null;
      }),
      set: jest.fn((str) => {
        _mockLocalStorage[storageKey] = str;
      }),
      setDefaultIfEmpty: jest.fn((defaultValue) => {
        const currentlyStoredValue = _mockLocalStorage?.[storageKey] ?? null;
        if (currentlyStoredValue === null) _mockLocalStorage[storageKey] = defaultValue;
      }),
      remove: jest.fn((str) => {
        delete _mockLocalStorage[storageKey];
      }),
    },
  }),
  { KEYS: _STORAGE_KEYS } as LocalStorageUtil
);
