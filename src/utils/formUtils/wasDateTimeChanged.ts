import { areSameDateTimes } from "../dateTime";
import type { MomentInput, unitOfTime } from "moment";
import type {
  OnSubmitFieldMutationProcessorFn,
  OnSubmitFieldMutationProcessorFnReturn
} from "./types";

/**
 * MutationDetectorFn for dateTime field values.
 */
export const wasDateTimeChanged: OnSubmitFieldMutationProcessorFn<MomentInput> = (
  newDateTime: MomentInput | null,
  existingDateTime: MomentInput | null,
  granularity: unitOfTime.StartOf = "day"
): OnSubmitFieldMutationProcessorFnReturn => {
  const wasChanged =
    !(newDateTime === null && existingDateTime === null) &&
    !areSameDateTimes(newDateTime, existingDateTime, granularity);

  return {
    wasChanged,
    ...(wasChanged && {
      mutationType: newDateTime ? "UPDATE" : "DELETE",
      value: newDateTime
    })
  };
};
