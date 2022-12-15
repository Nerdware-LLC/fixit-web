import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { node } from "@types";

export const Title = ({
  variant = "primary",
  style = {},
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p"> & { variant?: "primary" | "secondary" | "disabled" }) => {
  const theme = useTheme();

  return (
    <StyledTitle style={{ color: theme.palette.text[variant], ...style }} {...props}>
      {children}
    </StyledTitle>
  );
};

const StyledTitle = styled.p`
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.25rem;
  font-weight: bold;
`;

Title.propTypes = {
  children: node.isRequired
};
