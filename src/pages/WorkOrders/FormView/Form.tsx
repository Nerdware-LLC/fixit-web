import { styled } from "@mui/material/styles";
import { Form } from "@components/Form";
import { AutoCompleteContact } from "@components/Form/AutoCompleteContact";
import { DatePicker } from "@components/Form/DatePicker";
import { DateTimePicker } from "@components/Form/DateTimePicker";
import { PhoneInput } from "@components/Form/PhoneInput";
import { TextInput } from "@components/Form/TextInput";
import {
  ChecklistInput,
  LocationRegion,
  AutoCompleteWorkOrderCategory,
  SelectPriority,
} from "./inputs";
import { schema } from "./schema";
import type { WorkOrder } from "@graphql/types";
import type { WorkOrderFormValues } from "./formFieldHandlers";

export const WorkOrderForm = ({
  initialFormValues,
  onSubmit,
  existingWorkOrder,
}: WorkOrderFormProps) => (
  <Form
    initialValues={initialFormValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    style={{ height: "100%", width: "100%" }}
  >
    <StyledDiv>
      <div id={workOrderFormElementIDs.detailsGridArea}>
        <AutoCompleteContact
          id="assignedTo"
          label="Assign to Contact"
          disabled={
            // assignedTo is disabled if WO status is IN_PROGRESS, DEFERRED, or COMPLETE
            existingWorkOrder &&
            ["IN_PROGRESS", "DEFERRED", "COMPLETE"].includes(existingWorkOrder?.status)
          }
        />
        <div className={workOrderFormClassNames.detailsRow}>
          <SelectPriority id="priority" label="Priority" />
          <AutoCompleteWorkOrderCategory id="category" label="Category" fullWidth />
        </div>
        <TextInput id="description" label="Description" multiline maxRows={3} />
        <ChecklistInput />
      </div>

      <fieldset id={workOrderFormElementIDs.locationGridArea}>
        <legend>Location</legend>
        <TextInput id='location["country"]' label="Country" />
        <LocationRegion id='location["region"]' />
        <TextInput id='location["city"]' label="City" />
        <TextInput id='location["streetLine1"]' label="Street Address" />
        <TextInput id='location["streetLine2"]' label="Street Address 2" />
      </fieldset>

      <div id={workOrderFormElementIDs.entryAndDatesGridArea}>
        <TextInput id="entryContact" label="Entry Contact - Name" gridArea="entry-name" />
        <DatePicker id="dueDate" label="Due Date" format="MM/DD/YYYY" gridArea="due-date" />
        <PhoneInput id="entryContactPhone" label="Entry Contact - Phone" gridArea="entry-phone" />
        <DateTimePicker
          id="scheduledDateTime"
          label="Scheduled Date/Time"
          gridArea="scheduled-date"
        />
      </div>

      <Form.ControlButtons gridArea="form-btns" />
    </StyledDiv>
  </Form>
);

export const workOrderFormElementIDs = {
  detailsGridArea: "wo-form-details-grid-area",
  locationGridArea: "wo-form-location-grid-area",
  entryAndDatesGridArea: "wo-form-entry-and-dates-grid-area",
};

export const workOrderFormClassNames = {
  detailsRow: "wo-form-details-row",
};

const StyledDiv = styled("div")(({ theme }) => {
  const containerHeight = "calc(100% - 1rem)";

  return {
    height: containerHeight,
    minHeight: containerHeight,
    maxHeight: containerHeight,
    width: "100%",

    // ensure padding/margin at bottom isn't collapsed:
    "&::after": {
      content: '" "',
      display: "block",
      height: "1rem",
      width: "100%",
    },

    display: "grid",
    gridAutoRows: "min-content",
    gridAutoColumns: "1fr",
    ...(theme.variables.isMobilePageLayout
      ? {
          gap: "1.5rem",
          gridTemplateAreas: `
            "location"
            "details"
            "entry-and-dates"
            "form-btns"`,
        }
      : {
          gap: "2rem",
          gridTemplateRows: "1fr min-content min-content",
          gridTemplateAreas: `
            "details     location"
            "details     entry-and-dates"
            "form-btns   ."`,
        }),

    // GRID AREA: details
    [`& > #${workOrderFormElementIDs.detailsGridArea}`]: {
      gridArea: "details",
      display: "flex",
      flexDirection: "column",
      gap: "inherit",
      // assignedTo
      "& > div:first-of-type": {
        marginTop: "0.5rem",
      },
      // priority + category
      [`& > .${workOrderFormClassNames.detailsRow}`]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "inherit",
        // wrap to col on mobile
        ...(theme.variables.isMobilePageLayout && {
          flexWrap: "wrap",
        }),
        // priority
        "& > div:first-of-type": {
          minWidth: "12rem",
          ...(theme.variables.isMobilePageLayout && {
            minWidth: "66%",
            margin: "-1rem auto 1rem auto",
          }),
        },
      },
      // checklist
      "& > *:last-child": {
        marginTop: "-1rem",
        ...(theme.variables.isMobilePageLayout && {
          marginBottom: "0.5rem",
        }),
      },
    },

    // GRID AREA: location
    [`& > #${workOrderFormElementIDs.locationGridArea}`]: {
      gridArea: "location",
      height: "100%",
      width: "100%",
      ...(theme.variables.isMobilePageLayout
        ? {
            padding: "1rem 1rem 0 1rem",
            gap: "0.5rem",
          }
        : {
            padding: "0.35rem 1rem 0 1rem",
          }),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "0.7rem",
      borderColor: theme.palette.divider,
    },

    [`& > #${workOrderFormElementIDs.entryAndDatesGridArea}`]: {
      gridArea: "entry-and-dates",
      display: "grid",
      gap: "inherit",
      gridAutoRows: "min-content",
      gridAutoColumns: "1fr",
      gridTemplateAreas: theme.variables.isMobilePageLayout
        ? `
          "entry-name"
          "entry-phone"
          "due-date"
          "scheduled-date"`
        : `
          "entry-name   due-date"
          "entry-phone  scheduled-date"`,

      /* All Mui helperText is given position absolute so it doesn't mess
      up the even layout. On mobile, each input is given a little margin
      to space them out a bit.  */
      "& > div": {
        position: "relative",
        ...(theme.variables.isMobilePageLayout && {
          marginBottom: "0.5rem",
        }),
        "& > .MuiFormHelperText-root": {
          position: "absolute",
          bottom: "-24.56px",
          // bottom: 0 - (lineHeight(1.66rem) × 16px/rem) + marginTop(3px) - borderWidth(1px) = -24.56px
        },
      },
    },
  };
});

export type WorkOrderFormProps = {
  initialFormValues: WorkOrderFormValues;
  onSubmit: (submittedFormValues: WorkOrderFormValues) => Promise<void>;
  existingWorkOrder?: WorkOrder;
};
