import MuiButton from "@mui/material/Button";
import styled from "@emotion/styled";
import { func, string, element } from "@types";

// Docs: https://mui.com/components/buttons/

export const Button = ({
  label,
  onClick,
  variant = "contained",
  style = {},
  children,
  ...props
}: React.ComponentProps<typeof MuiButton> & { label: string }) => {
  return (
    <StyledButton
      key={`Button:${label}`}
      onClick={onClick}
      variant={variant}
      style={style}
      {...props}
    >
      {label ?? children ?? null}
    </StyledButton>
  );
};

const StyledButton = styled(MuiButton)`
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1rem;
  vertical-align: middle;
  text-decoration: none;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

Button.propTypes = {
  label: string,
  onClick: func,
  children: element
};
