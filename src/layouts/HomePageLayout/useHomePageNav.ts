import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useHomePageNav = (path: string) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    setIsActive(path === "/home" ? pathname === path : pathname.startsWith(path));
  }, [path, pathname]);

  const handleClick = () => nav(path);

  return {
    handleClick,
    isActive,
  };
};
