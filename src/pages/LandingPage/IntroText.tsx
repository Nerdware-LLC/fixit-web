import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";

export const IntroText = () => {
  return (
    <Box
      sx={(theme) => ({
        "& > span": {
          "&:first-of-type > .MuiTypography-root": {
            color: theme.palette.secondary.main,
            fontSize: "clamp(2.8rem, 8vw, 5rem)",
            lineHeight: "clamp(3rem, 7.75vw, 5.2rem)",
            fontWeight: "bold"
          },
          "&:last-of-type": {
            "& > .MuiTypography-root": {
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              lineHeight: "clamp(1.5rem, 2.15vw, 1.9rem)",
              fontWeight: "100"
            },
            "& b": {
              color: theme.palette.primary.main
            }
          }
        }
      })}
    >
      <span>
        <Text>Getting paid for your work, made easy.</Text>
      </span>
      <br />
      <span>
        <Text>
          People who need to get things done use <b>Fixit</b> to keep in touch with customers and
          contractors, create work orders, submit invoices, and manage payments — all in one place.
        </Text>
        <br />
        <Text variant="caption">
          Whether you&apos;re a homeowner planning your next kitchen renovation, or a general
          contractor looking for a better way to submit invoices and get paid for your work,{" "}
          <b>Fixit</b> makes it easy.
        </Text>
      </span>
    </Box>
  );
};
