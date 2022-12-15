import styled from "@emotion/styled";
import logoSrc from "@images/fixit-icon.png";

export const Logo = ({ style = {} }: { style?: React.CSSProperties }) => (
  <StyledLogoImg src={logoSrc} style={style} />
);

const StyledLogoImg = styled.img`
  object-fit: contain;
  max-height: 12rem;
  align-self: center;
  z-index: 100;
`;
