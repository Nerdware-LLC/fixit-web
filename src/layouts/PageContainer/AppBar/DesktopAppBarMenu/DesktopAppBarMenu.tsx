import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { avatarClasses } from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { UserMenu } from "./UserMenu";
import { DarkModeSwitch } from "../DarkModeSwitch";
import { useAppBarMenuConfigs, MENU_OPTION_CONFIGS } from "../useAppBarMenuConfigs";

export const DesktopAppBarMenu = () => {
  // prettier-ignore
  const {
    isUserAuthenticated,
    isAccountActive,
    menuOptionConfigs,
    authOptionConfig
  } = useAppBarMenuConfigs();

  return (
    <StyledDiv>
      {isUserAuthenticated !== true ? (
        <>
          <div className={desktopAppBarMenuClassNames.rrdLinksContainer}>
            {MENU_OPTION_CONFIGS.LANDING_PAGE.map(({ label, path, tooltip }) => (
              <Tooltip key={`DesktopAppBarMenu:${label}`} title={tooltip}>
                <Link to={path} className={desktopAppBarMenuClassNames.rrdLink}>
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
    </StyledDiv>
  );
};

export const desktopAppBarMenuClassNames = {
  rrdLinksContainer: "desktop-appbar-menu-rrd-links-container",
  rrdLink: "desktop-appbar-menu-rrd-link",
};

const StyledDiv = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "1px 1rem 0 1rem",

  [`& > .${desktopAppBarMenuClassNames.rrdLinksContainer}`]: {
    display: "flex",
    marginRight: "0.5rem",

    [`& .${desktopAppBarMenuClassNames.rrdLink}`]: {
      margin: "0 0.75rem",
      padding: "0.75rem",
      paddingTop: "0.8rem",
      color: theme.palette.text.primary,
      fontSize: "0.9rem",
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": {
        opacity: 0.6,
      },
    },
  },

  [`& .${avatarClasses.root}`]: {
    marginLeft: "1.5rem",
    "&:hover": {
      cursor: "pointer !important",
    },
  },
}));
