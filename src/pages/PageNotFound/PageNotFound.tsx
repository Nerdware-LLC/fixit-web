import styled from "@emotion/styled";
import { useWebViewContext, Title, Text, Button } from "@components";

// FIXME Update PageNotFound to work with regular Web pages

export const PageNotFound = () => {
  const { webViewPostMessage } = useWebViewContext(); // <-- will this throw if context not exists? maybe always have context, set to null if not a RN webview.

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
        The resource you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
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
  height: 100%;
  padding: 30vh 15vw;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
