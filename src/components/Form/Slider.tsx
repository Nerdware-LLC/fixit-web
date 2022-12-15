import MuiSlider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormikContext } from "formik";

/**
 * MUI Slider with Formik hooks
 *
 * - `getFieldValue`: Since the "value" property of discrete mark options must
 *    be numbers, the `getFieldValue` fn serves as a hook which can be used to
 *    convert the number value the comp passes into `handleChange` fn into
 *    whatever type/value is desired for the form. The value returned from
 *    `getFieldValue` is provided to the field's Formik-context value.
 */
export const Slider = ({
  id,
  label,
  getFieldValue = (value) => value,
  styles = {},
  ...props
}: {
  id: string;
  label: string;
  getFieldValue?: (value: number | Array<number>) => any;
  styles?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    slider?: React.CSSProperties;
  };
} & Omit<React.ComponentProps<typeof MuiSlider>, "style">) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: Event, value: number | Array<number>, activeThumb: number) => {
    const fieldValue = getFieldValue(value);
    setFieldValue(id, fieldValue);
  };

  const labelID = `Slider:InputLabel:${id}`;

  return (
    <div style={styles?.container ?? {}}>
      <InputLabel id={labelID} style={styles?.label ?? {}}>
        {label}
      </InputLabel>
      <StyledMuiSlider
        id={id}
        onChange={handleChange}
        aria-labelledby={labelID}
        style={styles?.slider ?? {}}
        {...props}
      />
    </div>
  );
};

const StyledMuiSlider = styled(MuiSlider)(({ theme }) => ({
  color: theme.palette.primary.dark,
  height: 10,
  "& .MuiSlider-track": {
    border: "none"
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
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
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: theme.palette.primary.dark,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
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
  }
}));
