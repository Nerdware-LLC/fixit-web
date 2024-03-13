import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar, { avatarClasses } from "@mui/material/Avatar";
import Collapse, { collapseClasses } from "@mui/material/Collapse";
import ListItemAvatar, { listItemAvatarClasses } from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon, { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const DemoInfoListItem = ({ Icon, summary, details }: DemoInfoListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <StyledListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar style={{ width: "3.5rem", height: "3.5rem" }}>
            <Icon color="success" style={{ fontSize: "2.5rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>{summary}</ListItemText>
        <ListItemIcon
          style={{ width: "min-content", minWidth: "min-content", justifyContent: "center" }}
        >
          <ExpandMoreIcon
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s",
            }}
          />
        </ListItemIcon>
      </StyledListItemButton>
      <Collapse in={isOpen} timeout="auto">
        <ListItemText
          sx={{
            color: "text.secondary",
            [`& .${typographyClasses.root},.${svgIconClasses.root}`]: {
              fontSize: "0.875rem",
              lineHeight: 1.25,
            },
          }}
        >
          {details}
        </ListItemText>
      </Collapse>
    </>
  );
};

const StyledListItemButton = styled(ListItemButton)(({ theme: { palette } }) => ({
  gap: "1rem",

  [`& + .${collapseClasses.root}`]: {
    // The text in the Collapse-div should appear horiz-inline with the above text:
    paddingLeft: "5.5rem",
  },

  [`& > .${listItemAvatarClasses.root}`]: {
    opacity: 0.85,

    [`& > .${avatarClasses.root}`]: {
      ...(palette.mode === "light" && {
        backgroundColor: palette.background.paper,
        backgroundImage: "unset",
        border: `0.25rem solid ${palette.success.main}`,
      }),
    },
  },

  [`& .${svgIconClasses.root}`]: {
    fontSize: "1.75rem",
  },
}));

export type DemoInfoListItemProps = {
  Icon: typeof SvgIcon;
  summary: React.ReactNode;
  details: React.ReactNode;
};
