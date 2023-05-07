import Text from "@mui/material/Typography";

export const ErrorFallback = ({
  errorMessage = `Whoops! Something went wrong  :(\nPlease try again later.`,
}: ErrorFallbackProps) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      whiteSpace: "pre-wrap",
    }}
  >
    <Text>{errorMessage}</Text>
  </div>
);

export type ErrorFallbackProps = { errorMessage?: string };
