import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { themeStore } from "@app";

export const DarkModeSwitch = () => {
  const currentTheme = themeStore.useSubToStore();

  const handleChange = () => themeStore.toggle(currentTheme);

  return (
    <Tooltip title="Toggle dark mode">
      <MuiStyledDarkModeSwitch
        checked={currentTheme === "DARK"}
        checkedIcon={<StyledDarkModeIcon />}
        icon={<LightModeIcon />}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Tooltip>
  );
};

const StyledDarkModeIcon = styled(DarkModeIcon)`
  transform: rotateZ(140deg) translateX(3px);
  color: ${({ theme }) => theme.palette.text.primary};
`;

const MuiStyledDarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 65,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    padding: 2.5,
    transform: "translateX(6px)",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.primary.dark
    },
    "&.Mui-checked": {
      opacity: 1,
      transform: "translateX(30px)",
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  "& .MuiSwitch-track": {
    borderRadius: 10
  }
}));
