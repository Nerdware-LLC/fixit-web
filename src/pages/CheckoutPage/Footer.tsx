import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { StripeBadge } from "@components";

export const Footer = () => {
  const { palette } = useTheme();

  const spanStyle = {
    ...styles.span,
    backgroundColor: palette.mode === "dark" ? palette.grey[600] : palette.grey[800]
  };

  const linkStyle = {
    ...styles.links,
    color: palette.mode === "dark" ? palette.grey[500] : palette.grey[700]
  };

  return (
    <div style={styles.footerContainer}>
      <StripeBadge style={styles.stripeBadge} />
      <span style={spanStyle} />
      <Tooltip title="Fixit Terms of Service">
        <Link to="/ToS" style={linkStyle}>
          Terms
        </Link>
      </Tooltip>
      <Tooltip title="Fixit Privacy Policy">
        <Link to="/privacy" style={linkStyle}>
          Privacy
        </Link>
      </Tooltip>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footerContainer: {
    width: "100%",
    height: "2rem",
    padding: "1rem",
    marginTop: "2.5rem",
    verticalAlign: "middle",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  stripeBadge: {
    height: "2rem",
    marginTop: "0.5rem",
    marginRight: "0.5rem"
  },
  span: {
    height: "2.5rem",
    width: "1px",
    margin: "0 0.5rem",
    alignSelf: "center"
  },
  links: {
    margin: "0 0.35rem",
    fontSize: "0.75rem",
    textDecorationStyle: "dotted"
  }
};
