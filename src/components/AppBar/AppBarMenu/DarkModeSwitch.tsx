import { styled } from "@mui/material/styles";
import Switch, { switchClasses as muiSwitchClasses } from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/ModeNightSharp";
import { THEME_NAMES } from "@/app/ThemeProvider/themes";
import { themeStore } from "@/stores";
import { appBarMenuElementIDs } from "./elementIDs";

export const DarkModeSwitch = () => {
  const currentTheme = themeStore.useSubToStore();

  const handleChange = () => themeStore.toggle(currentTheme);

  return (
    <Tooltip title="Toggle dark mode">
      <StyledSwitch
        id={appBarMenuElementIDs.darkModeSwitch} // <-- Chrome logs a warning if this is not set
        checked={currentTheme === THEME_NAMES.DARK}
        checkedIcon={<DarkModeIcon />}
        icon={<LightModeIcon />}
        onChange={handleChange}
        inputProps={{ "aria-label": "dark mode switch" }}
      />
    </Tooltip>
  );
};

const StyledSwitch = styled(Switch)(({ theme: { palette } }) => ({
  width: "65px",
  height: "34px",
  padding: "7px",

  [`& > .${muiSwitchClasses.switchBase}`]: {
    height: "33px",
    width: "33px",
    paddingRight: "10px", // <-- Nudges LightModeIcon to the left a bit, not aligning for some reason.
    transform: "translateX(6px)",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: palette.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    opacity: 1,
    backgroundColor: palette.primary.main,

    "&:hover": {
      opacity: 1,
      backgroundColor: palette.primary.dark,
    },

    // WHEN CHECKED:
    [`&.${muiSwitchClasses.checked}`]: {
      opacity: 1,
      transform: "translateX(30px)",
      backgroundColor: palette.primary.dark,

      "&:hover": {
        opacity: 1,
        backgroundColor: palette.primary.main,
      },

      // Styles applied to the `DarkModeIcon`:
      "& > svg": {
        position: "absolute",
        top: "4px",
        left: "1px",
        height: "1.5rem",
        width: "1.5rem",
        color: palette.text.primary,
        transform: "rotateZ(140deg)",
      },
    },
  },

  [`& .${muiSwitchClasses.track}`]: {
    borderRadius: 10,
  },
}));
