import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomePageDrawerBtn } from "./HomePageDrawerBtn";

export const NavDrawerBtn = ({
  label,
  path,
  icon,
  ...props
}: {
  label: string;
  path: string;
  icon: React.ReactNode;
} & Omit<React.ComponentProps<typeof HomePageDrawerBtn>, "onClick">) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    setIsActive(path === "/home" ? pathname === path : pathname.startsWith(path));
  }, [path, pathname]);

  const handleClick = () => nav(path);

  return (
    <HomePageDrawerBtn
      onClick={handleClick}
      label={label}
      icon={icon}
      isActive={isActive}
      {...props}
    />
  );
};
