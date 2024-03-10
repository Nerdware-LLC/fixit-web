import CircularProgress from "@mui/material/CircularProgress";

/**
 * A loading wheel for buttons to use to show loading state (e.g., for form submit btns).
 */
export const ButtonLoadingIndicator = () => (
  <CircularProgress
    color="inherit"
    size={26}
    style={{
      position: "absolute",
      top: "calc(50% - 13px)", // 13px is half the height of the CircularProgress @ size=26
      left: "calc(50% - 13px)",
    }}
  />
);
