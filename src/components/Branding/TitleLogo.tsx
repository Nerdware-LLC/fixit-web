import React from "react";
import styled from "@emotion/styled";
import { Logo } from "./Logo";
import { Title } from "../Typography";

export const TitleLogo = ({
  onClick,
  styles
}: {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  styles?: {
    container?: React.CSSProperties & any;
    logo?: React.CSSProperties & any;
    title?: React.CSSProperties & any;
  };
}) => (
  <StyledTitleLogoContainer onClick={onClick} style={styles?.container ?? {}}>
    <Logo style={styles?.logo ?? {}} />
    <StyledTitle style={styles?.title ?? {}}>Fixit</StyledTitle>
  </StyledTitleLogoContainer>
);

const StyledTitleLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  vertical-align: middle;
  &:hover {
    cursor: ${(props) => (!!props.onClick ? "pointer" : "auto")};
  }
`;

const StyledTitle = styled(Title)`
  font-weight: bold;
  font-size: 4.75rem;
  margin-left: 1.25rem;
`;
