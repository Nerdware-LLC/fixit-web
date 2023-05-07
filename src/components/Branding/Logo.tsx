import { styled } from "@mui/material/styles";
import logoSrc from "@images/fixit-icon.webp";

export const Logo = ({ alt = "Fixit logo", ...props }: LogoProps = {}) => (
  <StyledImg src={logoSrc} className={logoClassNames.root} alt={alt} {...props} />
);

export const logoClassNames = {
  root: "fixit-logo",
};

const StyledImg = styled("img")({
  alignSelf: "center",
  objectFit: "contain",
  zIndex: 100,
  maxHeight: "12rem",
  borderRadius: "50%",
});

export type LogoProps = React.ComponentProps<typeof StyledImg>;
