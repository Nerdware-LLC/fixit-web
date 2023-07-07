import { Slider, type SliderProps } from "@components/Form/Slider";
import { capitalizeFirstLetterOnly } from "@utils/prettifyStr/capFirstLetterOnly";

/**
 * WorkOrder: SelectPriority (MUI Slider)
 */
export const SelectPriority = ({ id, label, ...props }: Omit<SliderProps, "marks">) => (
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
    {...props}
  />
);

const PRIORITY_OPTIONS = [
  { value: 7, label: "LOW" },
  { value: 50, label: "NORMAL" },
  { value: 93, label: "HIGH" },
];

const getFieldValue = (value: number | number[]) => {
  return PRIORITY_OPTIONS.find((opt) => opt.value === value)?.label ?? "NORMAL";
};

const valueLabelFormat = (value: number) => {
  const optLabel = PRIORITY_OPTIONS.find((opt) => opt.value === value)?.label;
  return optLabel ? capitalizeFirstLetterOnly(optLabel) : "Priority";
};
