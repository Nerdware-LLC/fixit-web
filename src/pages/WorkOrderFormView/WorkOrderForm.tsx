import { styled } from "@mui/material/styles";
import {
  Form,
  FormControlButtons,
  AutoCompleteMyContacts,
  AutoCompleteWorkOrderCategory,
  SliderWorkOrderPriority,
  DatePicker,
  DateTimePicker,
  PhoneInput,
  RegionInput,
  TextInput,
  ChecklistInput,
  checklistInputClassNames,
} from "@/components/Form";
import { workOrderFormSchema, type WorkOrderFormValues } from "./schema.js";
import type { WorkOrder } from "@/types/graphql.js";

export const WorkOrderForm = ({
  initialFormValues,
  onSubmit,
  existingWorkOrder,
}: WorkOrderFormProps) => (
  <Form<WorkOrderFormValues>
    initialValues={initialFormValues}
    validationSchema={workOrderFormSchema}
    onSubmit={onSubmit}
    style={{ height: "100%", width: "100%" }}
  >
    <StyledDiv>
      <div id={elementIDs.detailsGridArea}>
        <AutoCompleteMyContacts
          id='assignedTo["id"]'
          label="Assign to Contact"
          disabled={
            // assignedTo is disabled if WO status is IN_PROGRESS, DEFERRED, or COMPLETE
            existingWorkOrder &&
            ["IN_PROGRESS", "DEFERRED", "COMPLETE"].includes(existingWorkOrder?.status)
          }
        />
        <div id={elementIDs.priorityAndCategoryContainer}>
          <SliderWorkOrderPriority id="priority" label="Priority" />
          <AutoCompleteWorkOrderCategory id="category" label="Category" fullWidth />
        </div>
        <TextInput id="description" label="Description" multiline maxRows={3} />
        <ChecklistInput checklistFieldID="checklist" />
      </div>

      <fieldset id={elementIDs.locationGridArea}>
        <legend>Location</legend>
        <TextInput id='location["country"]' label="Country" />
        <RegionInput regionFieldID='location["region"]' countryFieldID='location["country"]' />
        <TextInput id='location["city"]' label="City" />
        <TextInput id='location["streetLine1"]' label="Street Address" />
        <TextInput id='location["streetLine2"]' label="Street Address 2" />
      </fieldset>

      <div id={elementIDs.entryAndDatesGridArea}>
        <TextInput id="entryContact" label="Entry Contact - Name" gridArea="entry-name" />
        <DatePicker id="dueDate" label="Due Date" format="MM/DD/YYYY" gridArea="due-date" />
        <PhoneInput id="entryContactPhone" label="Entry Contact - Phone" gridArea="entry-phone" />
        <DateTimePicker
          id="scheduledDateTime"
          label="Scheduled Date/Time"
          gridArea="scheduled-date"
        />
      </div>

      <FormControlButtons gridArea="form-btns" />
    </StyledDiv>
  </Form>
);

const elementIDs = {
  detailsGridArea: "wo-form-details-grid-area",
  locationGridArea: "wo-form-location-grid-area",
  entryAndDatesGridArea: "wo-form-entry-and-dates-grid-area",
  priorityAndCategoryContainer: "wo-form-priority-and-category-container",
} as const;

const StyledDiv = styled("div")(({ theme: { palette, variables } }) => {
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
    ...(variables.isMobilePageLayout
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
    [`& > #${elementIDs.detailsGridArea}`]: {
      gridArea: "details",
      display: "flex",
      flexDirection: "column",
      gap: "inherit",
      // assignedTo
      "& > div:first-of-type": {
        marginTop: "0.5rem",
      },
      // priority + category
      [`& > #${elementIDs.priorityAndCategoryContainer}`]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "inherit",
        // wrap to col on mobile
        ...(variables.isMobilePageLayout && {
          flexWrap: "wrap",
        }),
        // priority
        "& > div:first-of-type": {
          minWidth: "12rem",
          ...(variables.isMobilePageLayout && {
            minWidth: "66%",
            margin: "-1rem auto 1rem auto",
          }),
        },
      },
      // checklist input (last-child targets both the checklist and the create-checklist btn)
      "& > *:last-child": {
        marginTop: "-1rem",
        ...(variables.isMobilePageLayout && {
          marginBottom: "0.5rem",
        }),
        // target the checklist, not the create-checklist btn:
        [`&.${checklistInputClassNames.root}`]: {
          ...(variables.isMobilePageLayout && {
            maxHeight: "40vh",
          }),
        },
      },
    },

    // GRID AREA: location
    [`& > #${elementIDs.locationGridArea}`]: {
      gridArea: "location",
      height: "100%",
      width: "100%",
      ...(variables.isMobilePageLayout
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
      borderColor: palette.divider,
    },

    [`& > #${elementIDs.entryAndDatesGridArea}`]: {
      gridArea: "entry-and-dates",
      display: "grid",
      gap: "inherit",
      gridAutoRows: "min-content",
      gridAutoColumns: "1fr",
      gridTemplateAreas: variables.isMobilePageLayout
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
        ...(variables.isMobilePageLayout && {
          marginBottom: "0.5rem",
        }),
        "& > .MuiFormHelperText-root": {
          position: "absolute",
          bottom: "-24.56px",
        },
      },
    },
  };
});

export type WorkOrderFormProps = {
  initialFormValues: WorkOrderFormValues;
  onSubmit: (submittedFormValues: WorkOrderFormValues) => void | Promise<void>;
  existingWorkOrder?: WorkOrder;
};
