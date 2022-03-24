import React from "react";
import styled from "@emotion/styled";
import { useWebViewContext, Title, Text, Button } from "../../components";

export const PageNotFound = () => {
  const { webViewPostMessage } = useWebViewContext();

  const exitWebViewWithError = () => {
    webViewPostMessage({ error: "INVALID_ROUTE" });
  };

  return (
    <StyledPageNotFoundLayout>
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
      <Button
        label={"Take Me Back to Civilization!"}
        onClick={exitWebViewWithError}
        style={{ alignSelf: "center", fontWeight: "bold" }}
        variant={"contained"}
        color={"primary"}
        size={"large"}
      />
    </StyledPageNotFoundLayout>
  );
};

const StyledPageNotFoundLayout = styled.div`
  box-sizing: border-box;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 30vh 15vw;
  align-items: center;
  justify-content: space-around;
`;
