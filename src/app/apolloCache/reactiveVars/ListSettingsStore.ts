import { ReactiveStore } from "./ReactiveStore";

export class ListSettingsStore<T> {
  private enumFilterFn: EnumFilterFn = () => true;
  private getSearchFilterFn: GetSearchFilterFn = () => () => true;
  private sortFactorsDict?: SortFactorsDict;

  enumFilters?: EnumFiltersStore<T>;
  searchInput?: ReactiveStore<T>;
  sortFactor?: SortFactorStore<T>;

  constructor({
    enumFieldFilters,
    getSearchFilterFn,
    sortFactors
  }: {
    enumFieldFilters?: Record<string, Array<string>>;
    getSearchFilterFn?: (input: RegExp) => (...args: any[]) => boolean;
    sortFactors?: SortFactorsDict;
  }) {
    if (enumFieldFilters) {
      const enumFieldNames = Object.keys(enumFieldFilters);

      // Map array of strings to keys with boolean values
      const enumFilters = enumFieldNames.reduce((enumFieldsObj, fieldName) => {
        const enumValues = enumFieldFilters[fieldName];

        // prettier-ignore
        enumFieldsObj[fieldName] = enumValues.reduce((enumFieldValuesTracker, enumValue) => {
          enumFieldValuesTracker[enumValue] = true; // initial value is "on"
          return enumFieldValuesTracker;
        }, {} as Record<typeof enumValues[number], true>);

        return enumFieldsObj;
      }, {} as Record<keyof typeof enumFieldFilters, any>);

      this.enumFilters = new ReactiveStore(enumFilters) as EnumFiltersStore<T>;
      this.enumFilters.INPUTS_CONFIG = enumFieldFilters;

      this.enumFilterFn = (obj, enumFilters) => {
        return enumFieldNames.every((enumFieldToFilterBy) => {
          const enumFieldValue = obj[enumFieldToFilterBy];
          return !!enumFilters[enumFieldToFilterBy][enumFieldValue];
        });
      };
    }

    if (getSearchFilterFn) {
      this.searchInput = new ReactiveStore("");
      this.getSearchFilterFn = (searchInputStr) => {
        const inputRegex = new RegExp(searchInputStr, "gi");
        return getSearchFilterFn(inputRegex);
      };
    }

    // prettier-ignore
    if (sortFactors) {
      const sortFactorLabels = Object.keys(sortFactors);
      this.sortFactor = new ReactiveStore(sortFactorLabels[0]) as SortFactorStore<T>;
      this.sortFactorsDict = sortFactors;
      this.sortFactor.INPUT_OPTIONS = sortFactorLabels.map(sortFactor => ({
        id: sortFactor,
        label: sortFactor
      }));
    }
  }

  useSubToStore = () => {
    return {
      enumFilters: !!this?.enumFilters ? this.enumFilters.useSubToStore() : {},
      searchInput: !!this?.searchInput ? this.searchInput.useSubToStore() : "",
      sortFactor: !!this?.sortFactor ? this.sortFactor.useSubToStore() : ""
    } as {
      enumFilters: Record<string, any>;
      searchInput: string;
      sortFactor: string;
    };
  };

  // prettier-ignore
  private filter = (list: Array<any>, { enumFilters = {}, searchInput = "" }) => {
    if (!(Array.isArray(list) && list.length >= 1)) return list;
    const searchFilterFn = this.getSearchFilterFn(searchInput);
    return list.filter(
      (obj) => this.enumFilterFn(obj, enumFilters) && searchFilterFn(obj)
    );
  };

  private sort = (list: Array<any>, { sortFactor }: { sortFactor: string }) => {
    if (!(Array.isArray(list) && list.length >= 1)) return list;
    return this.sortFactorsDict?.[sortFactor](list) ?? list;
  };

  useFilterAndSort = (list: Array<any>) => {
    const listSettings = this.useSubToStore();
    const filtered = this.filter(list, listSettings);
    return this.sort(filtered, listSettings);
  };
}

type EnumFiltersStore<T> = ReactiveStore<T> & {
  // See ListFilterCheckboxFields for usage of INPUTS_CONFIG
  INPUTS_CONFIG: Record<string, Array<string>>;
};

type EnumFilterFn = (...args: any[]) => boolean;

type GetSearchFilterFn = (str: string) => (...args: any[]) => boolean;

// FIXME types for ListSettingsStore sortFactors is not right.
type SortFactorsDict = Record<string, <T extends Array<any>>(array: T) => T>;
// FIXME types for ListSettingsStore sortFactors is not right.
type SortFactorStore<T> = ReactiveStore<T> & {
  INPUT_OPTIONS: Array<{ id: string; label: string }>;
};
