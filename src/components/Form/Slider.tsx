import { useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MuiSlider, { sliderClasses, type SliderProps as MuiSliderProps } from "@mui/material/Slider";
import { formClassNames } from "./classNames";

/**
 * MUI Slider with Formik hooks
 *
 * - `getFieldValue`: Since the "value" property of discrete mark options must
 *    be numbers, the `getFieldValue` fn serves as a hook which can be used to
 *    convert the number value the comp passes into `handleChange` fn into
 *    whatever type/value is desired for the form. The value returned from
 *    `getFieldValue` is provided to the field's Formik-context value.
 *
 * - The Mui `sx` prop is passed to the containing div (a Mui Box).
 */
export const Slider = ({
  id,
  label,
  getFieldValue = (value) => value,
  sx,
  style,
  ...props
}: SliderProps) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: Event, value: number | Array<number>, activeThumb: number) => {
    const fieldValue = getFieldValue(value);
    setFieldValue(id, fieldValue);
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
})<MuiGridSxProps>(({ theme }) => ({
  height: "10px",
  marginBottom: "0.5rem",
  color: theme.palette.primary.dark,

  [`& .${sliderClasses.track}`]: {
    border: "none",
  },

  [`& .${sliderClasses.thumb}`]: {
    height: "1.5rem",
    width: "1.5rem",
    backgroundColor: theme.palette.primary.main,
    border: "2px solid currentColor",

    [`&:focus, &:hover, &.${sliderClasses.active}, &.${sliderClasses.focusVisible}`]: {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },

  [`& .${sliderClasses.valueLabel}`]: {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: "2rem",
    height: "2rem",
    borderRadius: "50% 50% 50% 0",
    backgroundColor: theme.palette.primary.dark,
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
    color: theme.palette.text.primary,
    fontWeight: "light",
  },

  ...muiGridSxProps,
}));

export type SliderProps = MuiSliderProps & {
  id: string;
  label: string;
  getFieldValue?: (value: number | Array<number>) => any;
} & MuiGridSxProps;
