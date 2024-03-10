import { useContext } from "react";
import { FetchStateContext } from "./FetchStateContext";

export const useFetchStateContext = () => useContext(FetchStateContext);
