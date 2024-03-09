import dayjs from "dayjs";
import { getTimestampAge, getItemAge } from "./calculate";

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2020, 0, 1, 0, 0, 0, 0));
});
afterAll(() => {
  vi.useRealTimers();
});

const getTimestampInMultipleFormats = (dayjsTimestampObject: dayjs.Dayjs) => {
  const dateObject = dayjsTimestampObject.toDate();
  return [
    dayjsTimestampObject,
    dateObject,
    dayjsTimestampObject.unix() * 1000, // <-- must convert to milliseconds
    dayjsTimestampObject.toISOString(),
    dateObject.toUTCString(), // same as `Dayjs.toString`, but dayjs doesn't make it clear the method uses UTC
    dateObject.toLocaleString(),
  ];
};

describe("numeric/calculate", () => {
  const JAN_1_2020_MILLISECONDS = 1577854800000; // 2020-01-01T00:00:00.000Z
  const NUM_MILLISECONDS_PER_DAY = 86400000;

  // SHARED TIMESTAMP INPUTS FOR `getTimestampAge()` AND `getItemAge()`:

  const threeDaysAgo = dayjs(JAN_1_2020_MILLISECONDS - NUM_MILLISECONDS_PER_DAY * 3);
  const threeDaysAgoTimestamps = getTimestampInMultipleFormats(threeDaysAgo);

  const fiveDaysAgo = dayjs(JAN_1_2020_MILLISECONDS - NUM_MILLISECONDS_PER_DAY * 5);
  const fiveDaysAgoTimestamps = getTimestampInMultipleFormats(fiveDaysAgo);

  const threeDaysFromNow = dayjs(JAN_1_2020_MILLISECONDS + NUM_MILLISECONDS_PER_DAY * 3);
  const threeDaysFromNowTimestamps = getTimestampInMultipleFormats(threeDaysFromNow);

  // prettier-ignore
  const invalidTimestamps =
    ["invalid-timestamp", {}, [], null, undefined, Number.POSITIVE_INFINITY, NaN, true, false, 0, 1];

  describe("getTimestampAge()", () => {
    test("returns the age of a valid timestamp in the specified unit of measurement, rounded down", () => {
      threeDaysAgoTimestamps.forEach((threeDaysAgoTS) => {
        expect(getTimestampAge(threeDaysAgoTS, "hours")).toBe(72);
        expect(getTimestampAge(threeDaysAgoTS, "days")).toBe(3);
        expect(getTimestampAge(threeDaysAgoTS, "months")).toBe(0);
        expect(getTimestampAge(threeDaysAgoTS, "years")).toBe(0);
      });
    });

    test("defaults to returning the difference in days when no unit is provided", () => {
      fiveDaysAgoTimestamps.forEach((fiveDaysAgoTS) => {
        expect(getTimestampAge(fiveDaysAgoTS)).toBe(5);
      });
    });

    test("returns a negative number when the provided timestamp is in the future", () => {
      threeDaysFromNowTimestamps.forEach((threeDaysFromNowTS) => {
        expect(getTimestampAge(threeDaysFromNowTS, "hours")).toBe(-72);
        expect(getTimestampAge(threeDaysFromNowTS, "days")).toBe(-3);
        expect(getTimestampAge(threeDaysFromNowTS)).toBe(-3);
        expect(getTimestampAge(threeDaysFromNowTS, "months")).toBe(0);
        expect(getTimestampAge(threeDaysFromNowTS, "years")).toBe(0);
      });
    });

    test("returns `undefined` if the provided arguments are invalid", () => {
      invalidTimestamps.forEach((invalidTS) => {
        expect(getTimestampAge(invalidTS as any)).toBeUndefined();
        expect(getTimestampAge(invalidTS as any, "INVALID-UNIT" as any)).toBeUndefined();
      });
    });
  });

  describe("getItemAge()", () => {
    test("returns the age of an item with a valid `createdAt` timestamp in the specified unit of measurement, rounded down", () => {
      threeDaysAgoTimestamps.forEach((threeDaysAgoTS) => {
        // Use the TS to define the test item's `createdAt` property:
        const itemWithTS = { createdAt: threeDaysAgoTS };
        expect(getItemAge(itemWithTS, "hours")).toBe(72);
        expect(getItemAge(itemWithTS, "days")).toBe(3);
        expect(getItemAge(itemWithTS, "months")).toBe(0);
        expect(getItemAge(itemWithTS, "years")).toBe(0);
      });
    });

    test("defaults to returning the difference in days when no unit is provided", () => {
      fiveDaysAgoTimestamps.forEach((fiveDaysAgoTS) => {
        expect(getItemAge({ createdAt: fiveDaysAgoTS })).toBe(5);
      });
    });

    test("returns a negative number when the provided item's `createdAt` timestamp is in the future", () => {
      threeDaysFromNowTimestamps.forEach((threeDaysFromNowTS) => {
        // Use the TS to define the test item's `createdAt` property:
        const itemWithTS = { createdAt: threeDaysFromNowTS };
        expect(getItemAge(itemWithTS, "hours")).toBe(-72);
        expect(getItemAge(itemWithTS, "days")).toBe(-3);
        expect(getItemAge(itemWithTS)).toBe(-3);
        expect(getItemAge(itemWithTS, "months")).toBe(0);
        expect(getItemAge(itemWithTS, "years")).toBe(0);
      });
    });

    test("returns `undefined` if the provided item's `createdAt` timestamp is invalid", () => {
      invalidTimestamps.forEach((invalidTS) => {
        // Use the TS to define the test item's `createdAt` property:
        const itemWithTS = { createdAt: invalidTS };
        expect(getItemAge(itemWithTS as any)).toBeUndefined();
        expect(getItemAge(itemWithTS as any, "INVALID-UNIT" as any)).toBeUndefined();
      });
    });

    test("returns `undefined` if the provided item does not have a `createdAt` property", () => {
      const item = {};
      expect(getItemAge(item)).toBeUndefined();
      expect(getItemAge(item, "INVALID-UNIT" as any)).toBeUndefined();
    });

    test("returns `undefined` when called with an invalid item argument", () => {
      expect(getItemAge()).toBeUndefined();
      expect(getItemAge(undefined)).toBeUndefined();
      expect(getItemAge(undefined, "INVALID-UNIT" as any)).toBeUndefined();
      expect(getItemAge(null as any)).toBeUndefined();
      expect(getItemAge(null as any, "INVALID-UNIT" as any)).toBeUndefined();
      expect(getItemAge("NOT-AN-ITEM" as any)).toBeUndefined();
      expect(getItemAge("NOT-AN-ITEM" as any, "INVALID-UNIT" as any)).toBeUndefined();
    });
  });
});
