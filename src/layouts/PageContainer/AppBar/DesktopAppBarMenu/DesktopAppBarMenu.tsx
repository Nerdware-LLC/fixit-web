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
  position: "relative", // so descendents can abs-position from here
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "inherit",
  paddingTop: "1px",

  [`& > .${desktopAppBarMenuClassNames.rrdLinksContainer}`]: {
    display: "flex",
    gap: "inherit",

    [`& .${desktopAppBarMenuClassNames.rrdLink}`]: {
      padding: "0.8rem 0.75rem 0.75rem 0.75rem",
      color: theme.palette.text.primary,
      fontSize: "0.9rem",
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": {
        opacity: 0.6,
      },
    },
  },

  [`& .${avatarClasses.root}:hover`]: {
    cursor: "pointer !important",
  },
}));
