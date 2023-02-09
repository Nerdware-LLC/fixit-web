import Text from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useWebViewContext } from "@app";

// FIXME Update PageNotFound to work with regular Web pages

export const PageNotFound = () => {
  const { webViewPostMessage } = useWebViewContext(); // <-- will this throw if context not exists? maybe always have context, set to null if not a RN webview.

  const exitWebViewWithError = () => {
    webViewPostMessage({ error: "INVALID_ROUTE" });
  };

  return (
    <div
      style={{
        height: "100%",
        padding: "30vh 15vw",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Text variant="h3">Whoops - this page doesn&apos;t seem to exist!</Text>
      <Text>❌ 404 - File or directory not found.</Text>
      <Text>
        The resource you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </Text>
      <Button onClick={exitWebViewWithError} style={{ alignSelf: "center" }} size="large">
        Take Me Back to Civilization!
      </Button>
    </div>
  );
};
