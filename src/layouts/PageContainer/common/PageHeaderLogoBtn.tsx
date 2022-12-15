import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import logoSrc from "@images/fixit-icon.png";

export const PageHeaderLogoBtn = ({ style = {} }: { style?: React.CSSProperties }) => {
  const nav = useNavigate();

  const goToLanding = () => nav("/");

  return <StyledLogoImg src={logoSrc} onClick={goToLanding} style={style} />;
};

const StyledLogoImg = styled.img`
  object-fit: contain;
  height: 2.5rem;
  &:hover {
    cursor: pointer;
  }
`;
