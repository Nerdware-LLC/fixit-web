import { createContext } from "react";

export const FetchStateContext = createContext<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  error: Error | string | null;
  setError: (value: Error | string | null) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
});
