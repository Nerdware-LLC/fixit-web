import { useState } from "react";
import { Error } from "./Error";
import { FetchStateContext } from "./FetchStateContext";
import { Loading } from "./Loading";

export const FetchStateContextWrapper = ({
  onDismissError,
  children,
}: FetchStateContextWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);

  const handleDismissError = () => {
    setError(null);
    if (onDismissError) onDismissError();
  };

  return (
    <FetchStateContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
      {children}
      {isLoading && <Loading />}
      {error && <Error error={error} onDismiss={handleDismissError} />}
    </FetchStateContext.Provider>
  );
};

export type FetchStateContextWrapperProps = {
  onDismissError?: () => any;
  children: React.ReactNode;
};
