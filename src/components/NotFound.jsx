import React from "react";
import styled from "styled-components";
import { LocationInfoDisplay } from "./Testing/LocationInfoDisplay";
import { Title, Text } from "./Typography";
import { Button } from "./Button";
import { CONFIG } from "../config";
import { func } from "../types";

export const NotFound = ({ handleClick }) => (
  <StyledNotFoundLayout>
    <Title>Whoops - this page doesn&apos;t seem to exist!</Title>
    <Text>
      <span role={"img"} aria-label={"x emoji"}>
        ❌
      </span>{" "}
      404 - File or directory not found.
    </Text>
    <Text>
      The resource you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </Text>
    {!CONFIG.IS_PROD_ENV && <LocationInfoDisplay />}
    <Button
      label={"Take Me Back to Civilization!"}
      onClick={handleClick}
      style={{ alignSelf: "center", fontWeight: "bold" }}
      variant={"contained"}
      color={"primary"}
      size={"large"}
    />
  </StyledNotFoundLayout>
);

const StyledNotFoundLayout = styled.div`
  box-sizing: border-box;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 30vh 15vw;
  align-items: center;
  justify-content: space-around;
`;

NotFound.propTypes = {
  handleClick: func.isRequired
};
