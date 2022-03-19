import React, { useState } from "react";
import { FetchStateContext } from "./FetchStateContext";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { func, any } from "../../types";

export const FetchStateContextWrapper = ({ onDismissError, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDismissError = () => {
    setError(null);
    if (onDismissError) onDismissError();
  };

  return (
    <FetchStateContext.Provider
      value={{ isLoading, setIsLoading, error, setError }}
    >
      {children}
      {isLoading && <Loading />}
      {error && <Error error={error} onDismiss={handleDismissError} />}
    </FetchStateContext.Provider>
  );
};

FetchStateContextWrapper.propTypes = {
  onDismissError: func,
  children: any.isRequired
};
