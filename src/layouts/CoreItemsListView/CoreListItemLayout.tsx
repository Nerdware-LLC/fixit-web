import React from "react";
import { styled, alpha } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { THEMES } from "@app/ThemeProvider";
import type { FixitUser } from "@types";

export const CoreListItemLayout = ({
  user,
  onClick,
  itemID,
  parentListName,
  divider = true,
  children,
  ...containerProps
}: {
  user?: FixitUser;
  onClick: React.MouseEventHandler<HTMLDivElement & HTMLLIElement>;
  itemID: string;
  parentListName?: string;
  divider?: boolean;
} & React.ComponentProps<typeof ListItem>) => (
  <StyledListItem className="list-view-item-container" divider={divider} {...containerProps}>
    <ListItemButton onClick={onClick} data-item-id={itemID} data-parent-list-name={parentListName}>
      <Box className="list-view-item-left-content-container">
        {user ? (
          <ListItemAvatar>
            <Avatar alt={user.profile?.displayName ?? "User avatar"} src={user.profile?.photoUrl}>
              {user.profile?.displayName?.charAt(0)}
            </Avatar>
          </ListItemAvatar>
        ) : (
          <ListItemIcon>
            <PersonOffIcon />
          </ListItemIcon>
        )}
      </Box>
      <Box className="list-view-item-children-content-container">{children}</Box>
    </ListItemButton>
  </StyledListItem>
);

const StyledListItem = styled(ListItem)(({ theme: { palette, variables, breakpoints } }) => {
  const listViewItemLeftContentContainerSize = variables.isMobilePageLayout ? "3rem" : "3.75rem";

  return {
    alignItems: "flex-start",
    padding: 0,
    borderColor: alpha(palette.divider, palette.mode === "dark" ? 0.05 : 0.1),

    "& *": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },

    "& > .MuiListItemButton-root": {
      padding: "0.5rem 0",
      [breakpoints.up("sm")]: { padding: "0.5rem 1rem" },

      "& > div.list-view-item-left-content-container": {
        marginRight: "1rem",
        height: listViewItemLeftContentContainerSize,
        minWidth: listViewItemLeftContentContainerSize,
        width: listViewItemLeftContentContainerSize,
        padding: "3px",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        borderRadius: "50%",
        backgroundImage: `linear-gradient(135deg, ${palette.info.dark} 15%, ${palette.info.light})`,

        // All div descendants are cicular flexboxes with centered content
        "& div": {
          display: "flex",
          placeItems: "center",
          placeContent: "center",
          textAlign: "center",
          verticalAlign: "middle",
          borderRadius: "50%",
          color: THEMES.DARK.palette.text.primary,
          backgroundImage: `linear-gradient(135deg, ${THEMES.DARK.palette.background.default} 20%, ${THEMES.DARK.palette.background.paper})`
        },

        // Set child divs' height + width to slightly less than list-view-item-left-content-container
        "& *:not(svg)": {
          display: "flex",
          placeItems: "center",
          placeContent: "center",
          height: "100%",
          width: "100%",
          minHeight: "100%",
          maxHeight: "100%",
          minWidth: "100%",
          maxWidth: "100%",
          fontSize: "2rem", // <-- for letter avatars
          borderRadius: "50%",
          objectFit: "cover"
        }
      },

      "& > div.list-view-item-children-content-container": {
        height: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }
    }
  };
});
