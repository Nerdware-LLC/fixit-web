import { styled, alpha } from "@mui/material/styles";
import Avatar, { avatarClasses as muiAvatarClasses } from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/material/ListItemButton";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { coreListItemLayoutClassNames as classNames } from "./classNames";
import type { FixitUser } from "@graphql/types";

export const CoreListItemLayout = ({
  user,
  onClick,
  itemID,
  listName,
  divider = true,
  children,
  ...containerProps
}: CoreListItemLayoutProps) => (
  <StyledListItem className={classNames.root} divider={divider} {...containerProps}>
    <ListItemButton onClick={onClick} data-item-id={itemID} data-list-name={listName}>
      <div className={classNames.leftContentContainer}>
        <Avatar
          src={user?.profile?.photoUrl ?? undefined}
          className={classNames.avatar}
          alt={
            user ? user.profile?.displayName ?? "User avatar" : "Icon indicating an unassigned item"
          }
        >
          {user?.profile?.displayName?.charAt(0) ?? <PersonOffIcon />}
        </Avatar>
      </div>
      <Box className={classNames.childrenContentContainer}>{children}</Box>
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
    textOverflow: "ellipsis",
  },

  [`& > .${listItemButtonClasses.root}`]: {
    height: "100%",
    padding: "0.5rem 0",
    [breakpoints.up("sm")]: { padding: "0.5rem 1rem" },

    [`& > .${classNames.leftContentContainer}`]: {
      ...(variables.isMobilePageLayout
        ? {
            height: "3rem",
            minHeight: "3rem",
            maxHeight: "3rem",
            width: "3rem",
            minWidth: "3rem",
            maxWidth: "3rem",
            marginRight: "0.75rem",
          }
        : {
            height: "3.75rem",
            minHeight: "3.75rem",
            maxHeight: "3.75rem",
            width: "3.75rem",
            minWidth: "3.75rem",
            maxWidth: "3.75rem",
            padding: "3px",
            marginRight: "1rem",
          }),
      display: "flex",
      placeItems: "center",
      placeContent: "center",

      [`& > .${muiAvatarClasses.root}`]: {
        height: "100%",
        width: "100%",
        ...(variables.isMobilePageLayout
          ? {
              fontSize: "1.75rem",
            }
          : {
              fontSize: "2rem",
              lineHeight: "3.4rem",
            }),
        "& svg[data-testid=PersonOffIcon]": {
          transform: "translateX(1px)",
        },
      },
    },

    // Container for other list item sections provided as children:

    [`& > .${classNames.childrenContentContainer}`]: {
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
            fontSize: "1rem",
          },
          "&:not(:first-of-type)": {
            fontSize: "0.925rem",
          },
          "&:last-of-type:not(:first-of-type)": {
            color: palette.text.secondary,
          },
          [`&.${classNames.createdAtText}`]: {
            fontSize: "0.875rem",
          },
          [`&.${classNames.statusText}`]: {
            fontSize: "0.75rem",
          },
        },

        // Some list items may contain links, apply same size styles (won't be first-children)
        "& a": {
          fontSize: "0.925rem",
          lineHeight: "1.25rem",
          // Hide any list-item links on mobile
          ...(variables.isMobilePageLayout && {
            display: "none",
          }),
        },

        // Styles for only-child div sections
        "&:only-child": {
          // If there's only 1 section, make its text a little larger
          "& > .MuiTypography-root": {
            "&:first-of-type": {
              fontSize: "1.05rem",
            },
          },
        },

        // Styles for non-first div sections
        "&:not(:first-of-type)": {
          marginLeft: "0.5rem",
          textAlign: "right",
          alignItems: "flex-end",
        },
      },
    },
  },
}));

export type CoreListItemLayoutProps = {
  user?: FixitUser;
  onClick: React.MouseEventHandler<HTMLDivElement & HTMLLIElement>;
  itemID: string;
  listName?: string;
  divider?: boolean;
} & ListItemProps;
