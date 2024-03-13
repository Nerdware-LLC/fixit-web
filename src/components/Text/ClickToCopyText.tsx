import { styled, alpha } from "@mui/material/styles";
import ButtonBase, { buttonBaseClasses } from "@mui/material/ButtonBase";
import IconButton, { iconButtonClasses } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { THEMES } from "@/app/ThemeProvider/themes";

export const ClickToCopyText = ({
  children: textToCopy,
  stripeWhitespace = false,
  tooltipTitle = "Click to copy",
}: ClickToCopyTextProps) => {
  const handleClickCopyBtn = () =>
    window.navigator.clipboard.writeText(
      stripeWhitespace ? textToCopy.replace(/\s/g, "") : textToCopy
    );

  return (
    <StyledSpan>
      <Tooltip title={tooltipTitle}>
        <ButtonBase onClick={handleClickCopyBtn}>{textToCopy}</ButtonBase>
      </Tooltip>
      <Tooltip title={tooltipTitle}>
        <IconButton onClick={handleClickCopyBtn}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </StyledSpan>
  );
};

const StyledSpan = styled("span")(({ theme: { palette } }) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "middle",

  [`& > .${buttonBaseClasses.root}:first-of-type`]: {
    fontFamily: `source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace`,
    cursor: "pointer",
    display: "inline-block",
    margin: "0 0.25ch",
    padding: "0.1rem 0.5rem",
    borderRadius: "0.25rem",
    textAlign: "center",
    verticalAlign: "middle",
    color: THEMES.DARK.palette.text.primary,
    backgroundColor:
      palette.mode === "dark"
        ? THEMES.DARK.palette.background.paper
        : alpha(THEMES.DARK.palette.background.paper, 0.8),
  },

  [`& > .${iconButtonClasses.root}`]: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translate(100%, -10%)",
  },
}));

export type ClickToCopyTextProps = {
  children: string;
  stripeWhitespace?: boolean;
  tooltipTitle?: string;
};
