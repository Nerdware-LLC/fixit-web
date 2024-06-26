import { Slider, type SliderProps } from "@/components/Form/Inputs/Slider.jsx";
import { capitalize } from "@/utils/formatters/strings.js";
import type { Mark } from "@mui/base/useSlider";

/**
 * WorkOrder: SelectPriority (MUI Slider)
 */
export const SliderWorkOrderPriority = ({
  id,
  label,
  ...sliderProps
}: SliderWorkOrderPriorityProps) => (
  <Slider
    id={id}
    label={label}
    marks={PRIORITY_OPTIONS}
    getFieldValue={getFieldValue}
    valueLabelFormat={valueLabelFormat}
    valueLabelDisplay="auto"
    min={1}
    max={100}
    defaultValue={50}
    step={null}
    track={false}
    {...sliderProps}
  />
);

const PRIORITY_OPTIONS = [
  { value: 7, label: "LOW" },
  { value: 50, label: "NORMAL" },
  { value: 93, label: "HIGH" },
] as const satisfies Mark[];

const getFieldValue = (value: number | number[]) => {
  return PRIORITY_OPTIONS.find((opt) => opt.value === value)?.label ?? "NORMAL";
};

const valueLabelFormat = (value: number) => {
  const optLabel = PRIORITY_OPTIONS.find((opt) => opt.value === value)?.label;
  return optLabel ? capitalize(optLabel) : "Priority";
};

export type SliderWorkOrderPriorityProps = Omit<
  SliderProps,
  | "marks"
  | "getFieldValue"
  | "valueLabelFormat"
  | "valueLabelDisplay"
  | "min"
  | "max"
  | "defaultValue"
  | "step"
  | "track"
>;
