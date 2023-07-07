import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";

export const SingleProductBoxSwitch = ({ checked, handleChange }: SingleProductBoxSwitchProps) => (
  <StyledLabelElement>
    <div style={{ left: 4 }}>
      <Text>Monthly</Text>
    </div>
    <div style={{ right: 4 }}>
      <Text>Yearly</Text>
    </div>
    <input type="checkbox" onChange={handleChange} checked={checked} aria-label="controlled" />
    <span className={singleProductBoxSwitchClassNames.sliderThumb} />
  </StyledLabelElement>
);

export const singleProductBoxSwitchClassNames = {
  sliderThumb: "single-product-box-switch-slider-thumb",
};

/**
 * The box around the slider
 */
const StyledLabelElement = styled("label")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "clamp(14rem, 100%, 20rem)",
  height: "100%",
  padding: "0.25rem 0.1rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "1rem",
  cursor: "pointer",
  zIndex: 5,

  // Child Text-containing divs
  "& > div": {
    position: "absolute",
    height: "100%",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,

    // Child Mui Text (labels "Monthly" and "Yearly")
    [`& .${typographyClasses.root}`]: {
      alignSelf: "center",
      margin: "auto",
      fontWeight: "bold",
    },
  },

  // The HTML checkbox input (hidden)
  '& > input[type="checkbox"]': {
    opacity: 0,
    width: 0,
    height: 0,

    // When it's checked, change the span's transition left/right values
    [`&:checked + .${singleProductBoxSwitchClassNames.sliderThumb}`]: {
      transform: "translateX( calc(100% - 8px) )",
    },
  },

  // The visible slider thumb
  [`& .${singleProductBoxSwitchClassNames.sliderThumb}`]: {
    position: "absolute",
    top: "4px",
    bottom: "4px",
    left: "4px",

    transform: "translateX(0)",
    transition: "transform 0.4s",

    height: "calc(100% - 8px)",
    width: "50%",
    borderRadius: "0.85rem",
    backgroundColor: theme.palette.primary.main,
    boxShadow: `inset 0rem 0rem 1rem 0.5rem ${theme.palette.primary.dark}`,
  },
}));

export type SingleProductBoxSwitchProps = {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
