import React from "react";
import styled from "styled-components";
import logoSrc from "../../images/fixit-icon.png";

export const HeaderIcon = () => <StyledHeaderIcon src={logoSrc} />;

const StyledHeaderIcon = styled.img`
  position: absolute;
  top: -3.5rem;
  object-fit: contain;
  max-height: 7rem;
  align-self: center;
  z-index: 100;
`;
