import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useIsActiveNavAction } from "./helpers";
import type { AppNavActionConfig } from "@/routes/appNavActions";
import type { SetRequired } from "type-fest";

export const MobileNavBarTab = ({ label, path, icon }: MobileNavBarTabProps) => {
  const { isActive } = useIsActiveNavAction(path);

  return (
    <BottomNavigationAction
      component={Link}
      label={label}
      showLabel
      value={label}
      to={path}
      icon={icon}
      sx={({ palette }) => ({
        color: isActive ? palette.secondary.main : alpha(palette.action.active, 0.9),
      })}
    />
  );
};

export type MobileNavBarTabProps = SetRequired<AppNavActionConfig, "path" | "icon">;
