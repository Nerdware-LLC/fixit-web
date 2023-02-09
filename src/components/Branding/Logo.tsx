import { styled } from "@mui/material/styles";
import logoSrc from "@images/fixit-icon.png";

export const Logo = (props: React.ComponentProps<typeof StyledLogoImg> = {}) => (
  <StyledLogoImg src={logoSrc} className="fixit-logo" {...props} />
);

const StyledLogoImg = styled("img")({
  alignSelf: "center",
  objectFit: "contain",
  zIndex: 100,
  maxHeight: "12rem",
  borderRadius: "50%"
});
