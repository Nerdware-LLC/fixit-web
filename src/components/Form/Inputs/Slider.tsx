import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MuiSlider, { sliderClasses, type SliderProps as MuiSliderProps } from "@mui/material/Slider";
import { formClassNames } from "../classNames";
import {
  useFormikFieldProps,
  getFormInputErrMsg,
  type FormikIntegratedInputProps,
} from "../helpers";

/**
 * MUI Slider with Formik integration.
 *
 * - `getFieldValue`: Since the "value" property of discrete mark options must
 *    be numbers, the `getFieldValue` fn serves as a hook which can be used to
 *    convert the number value the comp passes into `handleChange` fn into
 *    whatever type/value is desired for the form. The value returned from
 *    `getFieldValue` is provided to the field's Formik-context value.
 *
 * - The Mui `sx` prop is passed to the containiner - a Mui Box.
 */
export const Slider = <ValueType extends number | string | null | undefined>({
  id,
  label,
  getFieldValue = (value) => value,
  sx,
  style,
  ...props
}: SliderProps) => {
  const [_, { setValue, setError }] = useFormikFieldProps<ValueType>({ fieldID: id });

  const handleChange = (_event: Event, value: number | Array<number>, _activeThumb: number) => {
    const fieldValue = getFieldValue(value);
    setValue(fieldValue as any).catch((error: unknown) => setError(getFormInputErrMsg(error)));
  };

  const labelID = `Slider:InputLabel:${id}`;

  return (
    <Box className={formClassNames.sliderInputContainer} style={style} sx={sx}>
      <InputLabel id={labelID} className={formClassNames.sliderInputLabel}>
        {label}
      </InputLabel>
      <StyledMuiSlider
        id={id}
        onChange={handleChange}
        aria-labelledby={labelID}
        className={formClassNames.sliderInput}
        {...props}
      />
    </Box>
  );
};

/**
 * Mui Slider with default styles and grid sx props. Usage example:
 *
 * ```
 * <StyledMuiSlider gridArea="top-left" {...otherProps} />
 * ```
 */
const StyledMuiSlider = styled(MuiSlider, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(({ theme: { palette } }) => ({
  height: "10px",
  marginBottom: "0.5rem",
  color: palette.primary.dark,

  [`& .${sliderClasses.track}`]: {
    border: "none",
  },

  [`& .${sliderClasses.thumb}`]: {
    height: "1.5rem",
    width: "1.5rem",
    backgroundColor: palette.primary.main,
    border: "2px solid currentColor",

    [`&:focus, &:hover, &.${sliderClasses.active}, &.${sliderClasses.focusVisible}`]: {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },

  [`& .${sliderClasses.valueLabel}`]: {
    fontSize: "12px",
    background: "unset",
    padding: 0,
    width: "2rem",
    height: "2rem",
    borderRadius: "50% 50% 50% 0",
    backgroundColor: palette.primary.dark,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": {
      display: "none",
    },
    [`&.${sliderClasses.valueLabelOpen}`]: {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },

  [`& .${sliderClasses.markLabel}`]: {
    marginTop: "3px",
    color: palette.text.primary,
    fontWeight: "light",
  },

  ...muiGridSxProps,
}));

export type SliderProps = FormikIntegratedInputProps<
  MuiSliderProps & {
    label: string;
    getFieldValue?: (value: number | Array<number>) => number | number[] | string | string[];
  } & MuiGridSxProps
>;
