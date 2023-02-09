import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useAppBarMenuConfigs, MENU_OPTION_CONFIGS } from "../useAppBarMenuConfigs";
import { DarkModeSwitch } from "../DarkModeSwitch";
import { UserMenu } from "./UserMenu";

export const DesktopAppBarMenu = () => {
  // prettier-ignore
  const {
    isUserAuthenticated,
    isAccountActive,
    menuOptionConfigs,
    authOptionConfig
  } = useAppBarMenuConfigs();

  return (
    <DesktopAppBarMenuContainer>
      {isUserAuthenticated !== true ? (
        <>
          <div style={{ display: "flex", marginRight: "0.5rem" }}>
            {MENU_OPTION_CONFIGS.LANDING_PAGE.map(({ label, path, tooltip }) => (
              <Tooltip key={`DesktopAppBarMenu:${label}`} title={tooltip}>
                <Link to={path} className="appbar-menu-rrd-link">
                  {label}
                </Link>
              </Tooltip>
            ))}
          </div>
          <DarkModeSwitch />
        </>
      ) : (
        <>
          <DarkModeSwitch />
          <UserMenu
            isAccountActive={isAccountActive}
            menuOptionConfigs={menuOptionConfigs}
            authOptionConfig={authOptionConfig}
          />
        </>
      )}
    </DesktopAppBarMenuContainer>
  );
};

const DesktopAppBarMenuContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "1px 1rem 0 1rem",

  "& .appbar-menu-rrd-link": {
    margin: "0 0.75rem",
    padding: "0.75rem",
    paddingTop: "0.8rem",
    color: theme.palette.text.primary,
    fontSize: "0.9rem",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": { opacity: 0.6 }
  },

  "& .MuiAvatar-root": {
    marginLeft: "1.5rem"
  }
}));
