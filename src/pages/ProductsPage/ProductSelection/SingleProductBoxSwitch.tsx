import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { productSelectionClassNames } from "./classNames.js";

export const SingleProductBoxSwitch = ({ checked, handleChange }: SingleProductBoxSwitchProps) => (
  <StyledLabel>
    <div style={{ left: 4 }}>
      <Text>Monthly</Text>
    </div>
    <div style={{ right: 4 }}>
      <Text>Yearly</Text>
    </div>
    <input type="checkbox" onChange={handleChange} checked={checked} aria-label="controlled" />
    <span className={productSelectionClassNames.singleProductBoxSwitchSliderThumb} />
  </StyledLabel>
);

/**
 * The box around the slider
 */
const StyledLabel = styled("label")(({ theme: { palette } }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "clamp(14rem, 100%, 20rem)",
  height: "100%",
  padding: "0.25rem 0.1rem",
  backgroundColor: palette.background.paper,
  border: `1px solid ${palette.divider}`,
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

    "&:hover": {
      opacity: "0.5",
    },

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
    [`&:checked + .${productSelectionClassNames.singleProductBoxSwitchSliderThumb}`]: {
      transform: "translateX( calc(100% - 8px) )",
    },
  },

  // The visible slider thumb
  [`& .${productSelectionClassNames.singleProductBoxSwitchSliderThumb}`]: {
    position: "absolute",
    top: "4px",
    bottom: "4px",
    left: "4px",

    transform: "translateX(0)",
    transition: "transform 0.4s",

    height: "calc(100% - 8px)",
    width: "50%",
    borderRadius: "0.85rem",
    backgroundColor: palette.primary.main,
    boxShadow: `inset 0rem 0rem 1rem 0.5rem ${palette.primary.dark}`,
  },
}));

export type SingleProductBoxSwitchProps = {
  checked: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};
