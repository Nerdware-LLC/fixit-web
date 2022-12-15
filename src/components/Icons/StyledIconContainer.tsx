import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

export const StyledIconContainer = ({
  children,
  style = {},
  ...props
}: React.ComponentProps<typeof Avatar>) => (
  <StyledAvatar style={style} {...props}>
    {children}
  </StyledAvatar>
);

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main
}));
