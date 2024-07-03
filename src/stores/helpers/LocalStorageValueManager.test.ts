import { LocalStorageValueManager } from "./LocalStorageValueManager.js";

describe("LocalStorageValueManager", () => {
  // Arrange a mock valid localStorage key
  const MOCK_KEY = "mockLocalStorageKey";

  describe("new LocalStorageValueManager()", () => {
    test(`returns instanceof LocalStorageValueManager when invoked with valid arguments`, () => {
      expect(new LocalStorageValueManager(MOCK_KEY, { initialValue: "" })).toBeInstanceOf(
        LocalStorageValueManager
      );
    });
    test("sets the initialValue argument value in localStorage upon instantiation", () => {
      // Arrange initial value input
      const initialValue = "initialValue";
      // Act
      new LocalStorageValueManager(MOCK_KEY, { initialValue });
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBe(`{"data":"${initialValue}"}`);
    });
    test("does not set a value in localStorage when creating an instance without an initialValue argument", () => {
      // Act
      new LocalStorageValueManager(MOCK_KEY);
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBeNull();
    });
  });

  describe("get()", () => {
    test("returns the parsed value from localStorage when retrieving a pre-existing stored value", () => {
      // Arrange pre-existing value in localStorage
      localStorage.setItem(MOCK_KEY, `{"data":"preExistingValue"}`);
      // Arrange instance
      const manager = new LocalStorageValueManager(MOCK_KEY); // <-- no initial value
      // Act
      const retrievedValue = manager.get();
      // Assert
      expect(retrievedValue).toBe("preExistingValue");
    });
    test("returns the parsed value from localStorage when retrieving an initially stored value", () => {
      // Arrange instance with initial value
      const initialValue = "initialValue";
      const manager = new LocalStorageValueManager(MOCK_KEY, { initialValue }); // <-- initial value
      // Act
      const retrievedValue = manager.get();
      // Assert
      expect(retrievedValue).toBe(initialValue);
    });
    test("returns null when retrieving an expired value", () => {
      // Assert using an LSVM with an instance `ttl` property
      const manager_withTTL = new LocalStorageValueManager(MOCK_KEY, { initialValue: "", ttl: -1 });
      expect(manager_withTTL.get()).toBe(null);

      // Assert using an LSVM with no `ttl`, but ttl is set via the `set()` method
      const manager_noTTL = new LocalStorageValueManager(MOCK_KEY);
      manager_noTTL.set("", -1);
      expect(manager_noTTL.get()).toBe(null);
    });
    test("returns the parsed value from localStorage when retrieving a value stored by the set() method", () => {
      // Arrange instance that stores a value via .set()
      const manager = new LocalStorageValueManager(MOCK_KEY);
      const newValue = "newValue";
      manager.set(newValue);
      // Act
      const retrievedValue = manager.get();
      // Assert
      expect(retrievedValue).toBe(newValue);
    });
  });

  describe("set()", () => {
    test("creates a stored value in localStorage at the provided key", () => {
      // Arrange instance with NO initial value
      const manager = new LocalStorageValueManager<string>(MOCK_KEY);
      // Act
      manager.set("newValue");
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBe(`{"data":"newValue"}`);
    });
    test("updates the stored value in localStorage at the provided key", () => {
      // Arrange instance WITH initial value
      const manager = new LocalStorageValueManager<string>(MOCK_KEY, {
        initialValue: "initialValue",
      });
      // Act
      manager.set("newValue");
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBe(`{"data":"newValue"}`);
    });
  });

  describe("setDefaultIfEmpty()", () => {
    test("creates a stored value in localStorage at the provided key if no value yet exists", () => {
      // Arrange instance
      const manager = new LocalStorageValueManager(MOCK_KEY);
      // Act
      manager.setDefaultIfEmpty("newValue");
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBe(`{"data":"newValue"}`);
    });
    test("does not update localStorage at the provided key if a value already exists", () => {
      // Arrange instance with an initial value
      const manager = new LocalStorageValueManager<string>(MOCK_KEY, {
        initialValue: "initialValue",
      });
      // Act
      manager.setDefaultIfEmpty("newValue");
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBe(`{"data":"initialValue"}`);
    });
  });

  describe("remove()", () => {
    test("removes the stored value from localStorage at the provided key", () => {
      // Arrange instance with an initial value
      const manager = new LocalStorageValueManager<string>(MOCK_KEY, {
        initialValue: "initialValue",
      });
      // Act
      manager.remove();
      // Assert
      expect(localStorage.getItem(MOCK_KEY)).toBeNull();
    });
  });
});
