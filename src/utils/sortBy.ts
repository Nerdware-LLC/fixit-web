import moment from "moment";

type SortFn = <T extends string | number | boolean | Date>(a: T, b: T) => 1 | 0 | -1;

// prettier-ignore
const getFnToSortObjectsByNestedKey = (keysStr: string, comparisonFn: SortFn = defaultComparisonFn) => {
  const keysArray = keysStr.split("."); // can pass things like "customer.profile"

  const getTwoNestedValues = (objectA: Record<string, any>, objectB: Record<string, any>) =>
    keysArray.reduce(({ a, b }, key) => ({
      a: a[key],
      b: b[key]
    }), { a: objectA, b: objectB } ); // A little ugly getting two at once, but it cuts down on loops thru keysArray

  return (array: Array<Record<string, any>>) =>
    array.sort((objectA, objectB) => {
      const { a, b } = getTwoNestedValues(objectA, objectB);
      return comparisonFn(a as any, b as any);
    });
};

// This works great for straight-forward alphabetical/numerical sorting (asc).
const defaultComparisonFn: SortFn = (a, b) => {
  return a < b ? -1 : a > b ? 1 : 0;
};

// Put 'true' values before all 'false' values.
const compareBools: SortFn = (a, b) => (a === b ? 0 : a ? -1 : 1);

const compareDateTimes = (
  dateTimeA: moment.MomentInput,
  dateTimeB: moment.MomentInput,
  granularity: moment.unitOfTime.StartOf = "day"
) => {
  return moment(dateTimeA).isBefore(dateTimeB, granularity)
    ? -1
    : moment(dateTimeA).isSame(dateTimeB, granularity)
    ? 0
    : 1;
};

const getFnToCompareRankedItems = (rankingsDict: Record<string, number>): SortFn => {
  return (a, b) =>
    a === b
      ? 0
      : rankingsDict[a as keyof typeof rankingsDict] > rankingsDict[b as keyof typeof rankingsDict]
      ? -1
      : 1;
};

const WO_STATUS_RANKS = {
  UNASSIGNED: 4,
  ASSIGNED: 3,
  IN_PROGRESS: 2,
  DEFERRED: 1,
  COMPLETE: 0
};
const WO_PRIORITY_RANKS = {
  HIGH: 2,
  NORMAL: 1,
  LOW: 0
};
const INV_STATUS_RANKS = {
  OPEN: 2,
  DISPUTED: 1,
  CLOSED: 0
};

// prettier-ignore
export const sortBy = {
  contact: getFnToSortObjectsByNestedKey("contact"),
  address: getFnToSortObjectsByNestedKey("address"),
  woStatus: getFnToSortObjectsByNestedKey("status", getFnToCompareRankedItems(WO_STATUS_RANKS)),
  woPriority: getFnToSortObjectsByNestedKey("priority", getFnToCompareRankedItems(WO_PRIORITY_RANKS)),
  woCategory: getFnToSortObjectsByNestedKey("category"),
  invStatus: getFnToSortObjectsByNestedKey("status", getFnToCompareRankedItems(INV_STATUS_RANKS)),
  createdAt: getFnToSortObjectsByNestedKey("createdAt", (a, b) => compareDateTimes(a as moment.MomentInput, b as moment.MomentInput, "minute")),
  isUser: getFnToSortObjectsByNestedKey("isUser", compareBools),
  getFnToSortObjectsByNestedKey
};

/* SORT FN NOTE:
  -1  =>  a is first
   0  =>  do nothing
   1  =>  b is first
*/
