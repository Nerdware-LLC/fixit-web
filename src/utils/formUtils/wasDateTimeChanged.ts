import { areSameDateTimes } from "@utils/dateTime";
import type { ConfigType as DayJsInputType, UnitType } from "dayjs";
import type {
  OnSubmitFieldMutationProcessorFn,
  OnSubmitFieldMutationProcessorFnReturn,
} from "./types";

/**
 * MutationDetectorFn for dateTime field values.
 */
export const wasDateTimeChanged: OnSubmitFieldMutationProcessorFn<DayJsInputType> = (
  newDateTime: DayJsInputType | null,
  existingDateTime: DayJsInputType | null,
  granularity: UnitType = "day"
): OnSubmitFieldMutationProcessorFnReturn => {
  const wasChanged =
    !(newDateTime === null && existingDateTime === null) &&
    !areSameDateTimes(newDateTime, existingDateTime, granularity);

  return {
    wasChanged,
    ...(wasChanged && {
      mutationType: newDateTime ? "UPDATE" : "DELETE",
      value: newDateTime,
    }),
  };
};
