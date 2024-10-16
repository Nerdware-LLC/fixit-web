import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text, { typographyClasses } from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import type { Except } from "type-fest";

export type DemoModeStatementProps = {
  variant: "short" | "long";
  invertColor?: boolean;
} & Except<BoxProps, "children">;

export const DemoModeStatement = ({
  variant,
  invertColor,
  ...boxProps
}: DemoModeStatementProps) => (
  <StyledBox invertColor={invertColor} {...boxProps}>
    <AnnouncementIcon />
    <Text>
      You're viewing this application in "demo" mode
      {variant === "long" ? `,\nwhich is for demonstration purposes only` : ""}.
    </Text>
  </StyledBox>
);

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "invertColor",
})<Pick<DemoModeStatementProps, "invertColor">>(({ theme: { palette }, invertColor }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",

  [`& > .${typographyClasses.root}`]: {
    fontWeight: "bold",
    textAlign: "center",
    whiteSpace: "pre-line",
  },

  ...(invertColor
    ? {
        backgroundColor: palette.warning.main,
        "& *": { color: palette.getContrastText(palette.warning.main) },
      }
    : { "& *": { color: palette.warning.main } }),
}));
