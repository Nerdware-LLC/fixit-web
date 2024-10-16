import { styled } from "@mui/material/styles";

export const ListHeaderContainer = styled("div", {
  shouldForwardProp: (propName) => propName !== "containsMobileListHeaderTabs",
})<{ containsMobileListHeaderTabs?: boolean }>(
  ({ theme: { palette }, containsMobileListHeaderTabs = false }) => ({
    ...(containsMobileListHeaderTabs
      ? {
          height: "2.5rem",
          minHeight: "2.5rem",
          maxHeight: "2.5rem",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }
      : {
          height: "2rem",
          minHeight: "2rem",
          maxHeight: "2rem",
        }),
    marginBottom: "0.5rem",
    verticalAlign: "middle",
    backgroundColor: palette.background.paper,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  })
);

export type ListHeaderContainerProps = React.ComponentProps<typeof ListHeaderContainer>;
