import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../Typography/Title";
import { string } from "../../types";

export const LocationInfoDisplay = ({
  title = "Location object, stringified:"
}) => {
  const locationObj = useLocation();

  alert(JSON.stringify(locationObj, null, 2));

  return (
    <StyledTitleBox>
      <StyledLargeText>{title}</StyledLargeText>
      <StyledLargeText>{JSON.stringify(locationObj, null, 2)}</StyledLargeText>
    </StyledTitleBox>
  );
};

const StyledLargeText = styled(Title)`
  font-size: 1.25rem;
  line-height: 1.35rem;
`;

const StyledTitleBox = styled.div`
  box-sizing: border-box;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 1rem;
`;

LocationInfoDisplay.propTypes = {
  title: string
};
