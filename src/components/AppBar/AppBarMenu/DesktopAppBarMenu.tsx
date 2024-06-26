import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "@/components/Navigation";
import { DarkModeSwitch } from "./DarkModeSwitch.jsx";
import { UserAvatarMenuButton } from "./UserAvatarMenuButton.jsx";
import { appBarMenuClassNames } from "./classNames.js";
import { appBarMenuElementIDs } from "./elementIDs.js";
import { useAppBarMenuOptionConfigs } from "./useAppBarMenuOptionConfigs.js";

export const DesktopAppBarMenu = () => {
  const { appState, appStateBasedMenuOptions, authMenuOption } = useAppBarMenuOptionConfigs();

  return (
    <StyledDiv>
      {appState.isUserAuthenticated !== true && (
        <div className={appBarMenuClassNames.desktop.linksContainer}>
          {appStateBasedMenuOptions.map(({ label, path, tooltip }) =>
            // Note: all opts used when !auth'd have paths, but TS doesn't know that
            path ? (
              <Tooltip key={label} title={tooltip}>
                <NavLink to={path} className={appBarMenuClassNames.desktop.link}>
                  {label}
                </NavLink>
              </Tooltip>
            ) : null
          )}
        </div>
      )}

      <DarkModeSwitch />

      {appState.isUserAuthenticated === true && (
        <UserAvatarMenuButton
          appState={appState}
          authMenuOption={authMenuOption}
          appStateBasedMenuOptions={appStateBasedMenuOptions}
        />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  position: "relative", // so descendents can abs-position from here
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "2.5rem",

  [`& > .${appBarMenuClassNames.desktop.linksContainer}`]: {
    display: "flex",
    gap: "inherit",

    [`& > a`]: {
      color: palette.text.primary,
      fontSize: "0.9rem",
      fontWeight: "bold",
      "&:hover": {
        opacity: 0.6,
      },
    },
  },

  [`& > #${appBarMenuElementIDs.desktopUserAvatarMenuButton}`]: {
    marginLeft: "-1.5rem", // less of a "gap" when it's just the avatar + DarkModeSwitch
  },
}));
