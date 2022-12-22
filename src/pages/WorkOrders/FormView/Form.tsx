import { styled } from "@mui/material/styles";
import { Form, TextInput, DatePicker } from "@components";
import { schema } from "./schema";
import {
  ChecklistInput,
  LocationRegion,
  SelectAssignee,
  SelectCategory,
  SelectPriority
} from "./Inputs";
import type { WorkOrder, FormValues } from "@types";

// TODO Ensure there's a loading-wheel or some other kind of feedback onSubmit for create/update WO

export const WorkOrderForm = ({
  initialFormValues,
  onSubmit,
  currentWorkOrderStatus
}: {
  initialFormValues: WorkOrderFormValues;
  onSubmit: (submittedFormValues: WorkOrderFormValues) => Promise<void>;
  currentWorkOrderStatus: WorkOrder["status"];
}) => {
  return (
    <Form initialValues={initialFormValues} validationSchema={schema} onSubmit={onSubmit}>
      <FormGridContainer>
        <GridBox style={{ gridArea: "top-left", justifyContent: "flex-start", padding: "1rem" }}>
          <SelectAssignee
            id="assignedTo"
            label="Assign to Contact"
            currentWorkOrderStatus={currentWorkOrderStatus}
            styles={{ container: { marginBottom: "1.5rem" } }}
          />
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              paddingLeft: "0.75rem"
            }}
          >
            <SelectPriority
              id="priority"
              label="Priority"
              styles={{ container: { width: "40%" } }}
            />
            <SelectCategory
              id="category"
              label="Category"
              fullWidth
              styles={{ container: { width: "45%" } }}
            />
          </Row>
          <TextInput id="description" label="Description" multiline maxRows={3} />
        </GridBox>
        <GridBoxFieldset style={{ gridArea: "top-right" }}>
          <legend>Location</legend>
          <TextInput id='location["country"]' label="Country" />
          <LocationRegion id='location["region"]' />
          <TextInput id='location["city"]' label="City" />
          <TextInput id='location["streetLine1"]' label="Street Address" />
          <TextInput id='location["streetLine2"]' label="Street Address 2" />
        </GridBoxFieldset>
        <GridBox
          style={{
            gridArea: "bottom-left",
            padding: "1rem",
            paddingTop: "2rem",
            justifyContent: "flex-start"
          }}
        >
          <ChecklistInput />
        </GridBox>
        <GridBox style={{ gridArea: "bottom-right", justifyContent: "flex-end" }}>
          <Row>
            <TextInput
              id="entryContact"
              label="Entry Contact - Name"
              contentType="name"
              style={{ width: "55%" }}
            />
            <DatePicker
              id="dueDate"
              label="Due Date"
              inputFormat="MM/DD/YYYY"
              style={{ width: "40%" }}
            />
          </Row>
          <Row>
            <TextInput
              id="entryContactPhone"
              label="Entry Contact - Phone"
              contentType="phone"
              style={{ width: "55%" }}
            />
            <DatePicker
              id="scheduledDateTime"
              label="Scheduled Date/Time"
              useDateTime
              style={{ width: "40%" }}
            />
          </Row>
        </GridBox>
        <GridBox
          style={{
            gridArea: "submit-btn",
            padding: "0 1rem",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center"
          }}
        >
          <Form.SubmitButton style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }} />
        </GridBox>
      </FormGridContainer>
    </Form>
  );
};

export type WorkOrderFormValues = FormValues<
  WorkOrder,
  "id" | "createdBy" | "status" | "contractorNotes" | "createdAt" | "updatedAt"
>;

// Below type is used by ChecklistInput components
export type WorkOrderFormChecklistItem = NonNullable<WorkOrderFormValues["checklist"]>[number];

const FormGridContainer = styled("div")`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
    "top-left top-right"
    "bottom-left top-right"
    "bottom-left bottom-right"
    "submit-btn submit-btn";
  grid-template-rows: 35% 30% 25% 10%;
  grid-template-colums: 1fr 1fr;
  grid-column-gap: 1rem;
`;

const styles: Record<string, React.CSSProperties> = {
  gridAreaBoxes: {
    height: "100%",
    width: "100%",
    minWidth: "30vw", // prevents the left-col from expanding onOpen Checklist
    padding: "0 1rem",
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "column",
    justifyContent: "space-evenly"
  }
};

const GridBox = styled("div")(() => ({ ...styles.gridAreaBoxes }));

const Row = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
}));

const GridBoxFieldset = styled("fieldset")(({ theme }) => ({
  ...styles.gridAreaBoxes,
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "1rem",
  borderColor: theme.palette.divider
}));
