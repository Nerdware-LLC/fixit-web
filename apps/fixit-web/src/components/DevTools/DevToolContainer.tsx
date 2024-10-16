import Box from "@mui/material/Box";
import Text, { typographyClasses } from "@mui/material/Typography";

export const DevToolContainer = ({ title, subtitle, children }: DevToolContainerProps) => (
  <Box
    sx={({ palette }) => ({
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTop: `1px solid ${palette.divider}`,
      padding: "1rem",
      [`& > .${typographyClasses.body2}`]: {
        textAlign: "center",
        lineHeight: 1.4,
        opacity: 0.75,
      },
    })}
  >
    <Text variant="h6">{title}</Text>
    {subtitle && <Text variant="body2">{subtitle}</Text>}
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {children}
    </div>
  </Box>
);

export type DevToolContainerProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};
