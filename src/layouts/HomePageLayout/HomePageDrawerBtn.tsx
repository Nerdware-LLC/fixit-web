import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

export const HomePageDrawerBtn = ({
  onClick,
  label,
  icon,
  isActive = false,
  ...props
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
} & React.ComponentProps<typeof ListItem>) => {
  const domFriendlyIsActive = isActive ? "true" : "false";

  return (
    <ListItem disablePadding {...props}>
      <ListItemButton onClick={onClick}>
        <StyledListItemIcon isactive={domFriendlyIsActive}>{icon}</StyledListItemIcon>
        <StyledListItemText primary={label} isactive={domFriendlyIsActive} />
      </ListItemButton>
    </ListItem>
  );
};

const StyledListItemIcon = styled(ListItemIcon)<{ isactive: string }>(({ theme, isactive }) => ({
  padding: "1rem",
  ...(isactive === "true" && { color: theme.palette.secondary.main })
}));

const StyledListItemText = styled(ListItemText)<{ isactive: string }>(({ theme, isactive }) => ({
  ...(isactive === "true" && { color: theme.palette.secondary.main })
}));
