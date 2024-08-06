import { useState, useCallback } from "react";
import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import {
  FetchStateContext,
  type BaseFetchResponseObject,
  type FetchWithStateFn,
  type FnWrappedWithFetchState,
  type FetchStateContextError,
  type FetchStateErrorProcessor,
} from "./FetchStateContext.js";

export const FetchStateContextProvider = ({ children }: FetchStateContextProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchStateContextError>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchWithState: FetchWithStateFn = useCallback(
    async <R extends BaseFetchResponseObject>(
      wrappedFn: FnWrappedWithFetchState<R>,
      processError: FetchStateErrorProcessor = getTypeSafeError
    ) => {
      let response;

      setIsLoading(true);
      try {
        response = await wrappedFn();
      } catch (err) {
        setError(processError(err));
      } finally {
        setIsLoading(false);
      }

      return response;
    },
    []
  );

  return (
    <FetchStateContext.Provider
      value={{
        fetchWithState,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearError,
      }}
    >
      {children}
    </FetchStateContext.Provider>
  );
};

export type FetchStateContextProviderProps = {
  children: React.ReactNode;
};
