import React from "react";
import { styled, alpha } from "@mui/material/styles";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { THEMES } from "@app/ThemeProvider";
import type { FixitUser } from "@types";

export const CoreListItemLayout = ({
  user,
  onClick,
  itemID,
  listName,
  divider = true,
  children,
  ...containerProps
}: CoreListItemLayoutProps) => (
  <StyledListItem className="list-view-item-container" divider={divider} {...containerProps}>
    <ListItemButton onClick={onClick} data-item-id={itemID} data-list-name={listName}>
      <div className="list-view-item-left-content-container">
        <div className="list-view-item-left-content-circle">
          <Avatar
            src={user?.profile?.photoUrl}
            alt={
              user
                ? user.profile?.displayName ?? "User avatar"
                : "Icon indicating an unassigned item"
            }
          >
            {user?.profile?.displayName?.charAt(0) ?? <PersonOffIcon />}
          </Avatar>
        </div>
      </div>
      <Box className="list-view-item-children-content-container">{children}</Box>
    </ListItemButton>
  </StyledListItem>
);

const StyledListItem = styled(ListItem)(({ theme: { palette, variables, breakpoints } }) => ({
  alignItems: "flex-start",
  margin: 0,
  padding: 0,
  borderColor: alpha(palette.divider, palette.mode === "dark" ? 0.05 : 0.1),

  "& *": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  "& > .MuiListItemButton-root": {
    height: "100%",
    padding: "0.5rem 0",
    [breakpoints.up("sm")]: { padding: "0.5rem 1rem" },

    "& > .list-view-item-left-content-container": {
      ...(variables.isMobilePageLayout
        ? {
            height: "3rem",
            minHeight: "3rem",
            maxHeight: "3rem",
            width: "3rem",
            minWidth: "3rem",
            maxWidth: "3rem"
          }
        : {
            height: "3.75rem",
            minHeight: "3.75rem",
            maxHeight: "3.75rem",
            width: "3.75rem",
            minWidth: "3.75rem",
            maxWidth: "3.75rem"
          }),
      marginRight: "1rem",
      padding: "3px",
      display: "flex",
      placeItems: "center",
      placeContent: "center",

      // Styles for all descendant divs (circle-container and the MuiAvatar-root)
      "& div": {
        height: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        width: "100%",
        minWidth: "100%",
        maxWidth: "100%",
        borderRadius: "50%",
        placeItems: "center",
        placeContent: "center"
      },

      // Styles for all descendants (divs, img, svg)
      "& *": {
        alignSelf: "center",
        verticalAlign: "middle",
        textAlign: "center",
        overflow: "clip",
        overflowClipMargin: 0
      },

      "& > .list-view-item-left-content-circle": {
        display: "inline-flex",
        padding: "2px",
        backgroundImage: `linear-gradient(135deg, ${palette.info.dark} 15%, ${palette.info.light})`,

        "& > .MuiAvatar-root": {
          display: "inline",
          backgroundImage: `linear-gradient(135deg, ${THEMES.DARK.palette.background.default} 20%, ${THEMES.DARK.palette.background.paper})`,
          // styles for letter and icon avatars:
          color: THEMES.DARK.palette.text.primary,
          lineHeight: "calc(100% + 1.25rem)",
          ...(!variables.isMobilePageLayout && {
            fontSize: "2rem"
          }),

          "& > img, svg": {
            display: "inline-block",
            height: "100%",
            marginBottom: "0.5rem",
            "&:not(img)": {
              marginLeft: "5%"
            }
          }
        }
      }
    },

    // Container for other list item sections provided as children:

    "& > .list-view-item-children-content-container": {
      height: "100%",
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",

      // All child div sections: flex columns
      "& > div": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        // Default styles for text children:
        "& > .MuiTypography-root": {
          lineHeight: "1.25rem",

          "&:first-of-type": {
            fontSize: "1rem"
          },
          "&:not(:first-of-type)": {
            fontSize: "0.925rem"
          },
          "&:last-of-type:not(:first-of-type)": {
            color: palette.text.secondary
          },
          "&.list-item-created-at": {
            fontSize: "0.875rem"
          },
          "&.list-item-status": {
            fontSize: "0.75rem"
          }
        },

        // Some list items may contain links, apply same size styles (won't be first-children)
        "& a": {
          fontSize: "0.925rem",
          lineHeight: "1.25rem",
          // Hide any list-item links on mobile
          ...(variables.isMobilePageLayout && {
            display: "none"
          })
        },

        // Styles for only-child div sections
        "&:only-child": {
          // If there's only 1 section, make its text a little larger
          "& > .MuiTypography-root": {
            "&:first-of-type": {
              fontSize: "1.05rem"
            }
          }
        },

        // Styles for non-first div sections
        "&:not(:first-of-type)": {
          minWidth: "4.75rem",
          textAlign: "right",
          marginLeft: "0.5rem"
        }
      }
    }
  }
}));

export type CoreListItemLayoutProps = {
  user?: FixitUser;
  onClick: React.MouseEventHandler<HTMLDivElement & HTMLLIElement>;
  itemID: string;
  listName?: string;
  divider?: boolean;
} & ListItemProps;
