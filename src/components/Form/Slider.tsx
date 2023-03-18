import { useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiSlider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

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
    <Box className="slider-container" style={style} sx={sx}>
      <InputLabel id={labelID} className="slider-input-label">
        {label}
      </InputLabel>
      <StyledMuiSlider
        id={id}
        onChange={handleChange}
        aria-labelledby={labelID}
        className="slider-input"
        {...props}
      />
    </Box>
  );
};

const StyledMuiSlider = styled(MuiSlider, {
  shouldForwardProp: (propName) => !(propName as string).startsWith("grid")
})<GridProps>(({ theme }) => ({
  color: theme.palette.primary.dark,
  height: "10px",
  marginBottom: "0.5rem",

  "& .MuiSlider-track": {
    border: "none"
  },

  "& .MuiSlider-thumb": {
    height: "1.5rem",
    width: "1.5rem",
    backgroundColor: theme.palette.primary.main,
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit"
    },
    "&:before": {
      display: "none"
    }
  },

  "& .MuiSlider-valueLabel": {
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
      display: "none"
    },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
    },
    "& > *": {
      transform: "rotate(45deg)"
    }
  },

  "& .MuiSlider-markLabel": {
    marginTop: "3px",
    color: theme.palette.text.primary,
    fontWeight: "light"
  },

  ...muiGridSxProps
}));

export type SliderProps = {
  id: string;
  label: string;
  getFieldValue?: (value: number | Array<number>) => any;
} & React.ComponentProps<typeof StyledMuiSlider>;
