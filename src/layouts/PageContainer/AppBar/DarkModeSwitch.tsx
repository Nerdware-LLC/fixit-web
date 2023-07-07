import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/ModeNightSharp";
import { themeStore } from "@cache/themeStore";

export const DarkModeSwitch = () => {
  const currentTheme = themeStore.useSubToStore();

  const handleChange = () => themeStore.toggle(currentTheme);

  return (
    <Tooltip title="Toggle dark mode">
      <StyledSwitch
        checked={currentTheme === "DARK"}
        checkedIcon={<DarkModeIcon id={darkModeSwitchElementIDs.darkModeIcon} />}
        icon={<LightModeIcon />}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Tooltip>
  );
};

export const darkModeSwitchElementIDs = {
  darkModeIcon: "dark-mode-icon",
};

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: "65px",
  height: "34px",
  padding: "7px",

  [`& > .${switchClasses.switchBase}`]: {
    height: "33px",
    width: "33px",
    padding: "2.5px",
    transform: "translateX(6px)",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.primary.dark,
    },
    [`&.${switchClasses.checked}`]: {
      opacity: 1,
      transform: "translateX(30px)",
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },

    [`& > #${darkModeSwitchElementIDs.darkModeIcon}`]: {
      position: "absolute",
      top: "4px",
      left: "1px",
      height: "1.5rem",
      width: "1.5rem",
      color: theme.palette.text.primary,
      transform: "rotateZ(140deg)",
    },
  },

  [`& .${switchClasses.track}`]: {
    borderRadius: 10,
  },
}));
