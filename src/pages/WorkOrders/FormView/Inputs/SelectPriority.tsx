import { Slider } from "@components";

/**
 * WorkOrder: SelectPriority (MUI Slider)
 */
export const SelectPriority = ({
  id,
  label,
  styles
}: Omit<React.ComponentProps<typeof Slider>, "marks">) => (
  <Slider
    id={id}
    label={label}
    getFieldValue={getFieldValue}
    valueLabelFormat={valueLabelFormat}
    min={1}
    max={100}
    defaultValue={50}
    step={null}
    valueLabelDisplay="auto"
    marks={PRIORITY_OPTIONS}
    track={false}
    styles={styles}
  />
);

const PRIORITY_OPTIONS = [
  { value: 7, label: "LOW", tooltip: "Low" },
  { value: 50, label: "NORMAL", tooltip: "Normal" },
  { value: 93, label: "HIGH", tooltip: "High" }
];

const getFieldValue = (value: number | number[]) => {
  return PRIORITY_OPTIONS.find((mark) => mark.value === value)?.label ?? "NORMAL";
};

const valueLabelFormat = (value: number) => {
  return PRIORITY_OPTIONS.find((mark) => mark.value === value)?.tooltip ?? "Priority";
};
