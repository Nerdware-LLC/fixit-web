import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Text from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import type { Except } from "type-fest";

export const DemoModeStatement = ({ variant, ...boxProps }: DemoModeStatementProps) => (
  <StyledBox {...boxProps}>
    <AnnouncementIcon />
    <Text style={{ whiteSpace: "pre-line", textAlign: "center", fontWeight: "bold" }}>
      You're viewing this application in "demo" mode
      {variant === "long" ? `,\nwhich is for demonstration purposes only` : ""}.
    </Text>
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "0.5rem",
  "& *": {
    color: palette.warning.main,
  },
}));

export type DemoModeStatementProps = {
  variant: "short" | "long";
} & Except<BoxProps, "children">;
