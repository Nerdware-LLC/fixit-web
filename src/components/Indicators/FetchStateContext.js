import { createContext, useContext } from "react";

export const FetchStateContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {}
});

export const useFetchStateContext = () => useContext(FetchStateContext);
