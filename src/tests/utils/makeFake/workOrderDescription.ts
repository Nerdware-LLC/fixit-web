import { faker } from "@faker-js/faker/locale/en_US";

const HOME_APPLIANCES = [
  "dishwasher",
  "dryer",
  "garbage disposal",
  "microwave",
  "oven",
  "refrigerator",
  "stove",
  "washer",
] as const;

const CABINET_COMPONENTS = ["backsplash", "cabinets", "countertops", "sink"] as const;

const HOME_OBJECTS = [
  ...CABINET_COMPONENTS.map((component) => `bathroom ${component}`),
  "bathtub",
  "carpeting",
  "ceiling fan",
  "door",
  "drywall",
  "electrical outlet",
  "floor tile",
  "HVAC system",
  ...CABINET_COMPONENTS.map((component) => `kitchen ${component}`),
  "light fixture",
  "roof",
  "roof tile",
  "shower head",
  "toilet",
  "water heater",
  "window",
  ...HOME_APPLIANCES,
] as const;

/**
 * **Make Fake Work Order Description**
 *
 * - Generates a random work order description.
 */
export const makeFakeWorkOrderDescription = (): string => {
  return faker.helpers.mustache("{{action}} the {{object}}.", {
    action: () =>
      faker.helpers.arrayElement([
        "Clean",
        "Deliver",
        "Fix",
        "Inspect",
        "Install",
        "Paint",
        "Remove",
        "Replace",
      ]),
    object: () => faker.helpers.arrayElement(HOME_OBJECTS),
  });
};
