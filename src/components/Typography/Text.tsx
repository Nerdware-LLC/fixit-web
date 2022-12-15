import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { node } from "@types";

export const Text = ({
  variant = "primary",
  style = {},
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p"> & { variant?: "primary" | "secondary" | "disabled" }) => {
  const theme = useTheme();

  return (
    <StyledText style={{ color: theme.palette.text[variant], ...style }} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  margin: 0;
  line-height: 1.35rem;
`;

Text.propTypes = {
  children: node.isRequired
};
