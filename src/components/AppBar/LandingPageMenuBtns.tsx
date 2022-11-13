import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

export const LandingPageMenuBtns = () => {
  const theme = useTheme();

  return (
    <>
      {Object.entries(MENU_BTNS).map(([label, { path, tooltip }]) => (
        <Tooltip key={`LandingPageMenuBtns:Tooltip:${label}`} title={tooltip}>
          <StyledLink
            key={`LandingPageMenuBtns:Link:${label}`}
            to={path}
            style={{ color: theme.palette.text.primary }}
          >
            {label}
          </StyledLink>
        </Tooltip>
      ))}
    </>
  );
};

const MENU_BTNS = {
  Pricing: {
    path: "/products",
    tooltip: "See pricing for Fixit products"
  },
  Privacy: {
    path: "/privacy",
    tooltip: "View our privacy policy"
  },
  Login: {
    path: "/login",
    tooltip: "User login"
  },
  "Create Account": {
    path: "/register",
    tooltip: "Create an account"
  }
};

const StyledLink = styled(Link)`
  margin: 0 0.75rem;
  font-size: 0.9rem;
  padding: 0.75rem;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    opacity: 0.6;
  }
`;
