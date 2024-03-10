import { createContext } from "react";

export const FetchStateContext = createContext<{
  fetchWithState: FetchWithStateFn;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  error: FetchStateContextError;
  setError: (value: FetchStateContextError) => void;
  clearError: () => void;
}>({
  fetchWithState: async () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
  clearError: () => {},
});

export type BaseFetchResponseObject = Record<string, unknown>;

export type FetchWithStateFn = <R extends BaseFetchResponseObject>(
  wrappedFn: FnWrappedWithFetchState<R>,
  processError?: FetchStateErrorProcessor
) => Promise<R | void>;

export type FnWrappedWithFetchState<R> = () => Promise<R | void>;

export type FetchStateContextError = Error | null;

export type FetchStateErrorProcessor = <E>(err: E) => FetchStateContextError;
