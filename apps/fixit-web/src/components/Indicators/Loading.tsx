import CircularProgress, {
  circularProgressClasses,
  type CircularProgressProps,
} from "@mui/material/CircularProgress";

export const Loading = ({
  color = "primary",
  size = "7rem",
  thickness = 4.5,
  sx = {},
  ...circularProgressProps
}: LoadingProps) => (
  <CircularProgress
    color={color}
    size={size}
    thickness={thickness}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100% !important",
      width: "100% !important",
      [`& > .${circularProgressClasses.svg}`]: {
        height: size,
        width: size,
      },
      ...sx,
    }}
    {...circularProgressProps}
  />
);

export type LoadingProps = CircularProgressProps;
