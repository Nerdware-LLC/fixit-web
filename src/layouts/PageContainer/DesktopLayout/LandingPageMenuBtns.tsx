import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { LANDING_PAGE_MENU_OPTS } from "../common";

export const LandingPageMenuBtns = () => {
  const theme = useTheme();

  return (
    <div style={styles.container}>
      {Object.entries(LANDING_PAGE_MENU_OPTS).map(([label, { path, tooltip }]) => (
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
    </div>
  );
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

const styles = {
  container: {
    display: "flex",
    marginRight: "0.5rem"
  }
};
