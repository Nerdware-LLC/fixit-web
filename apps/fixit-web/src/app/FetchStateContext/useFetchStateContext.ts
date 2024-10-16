import { useContext } from "react";
import { FetchStateContext } from "./FetchStateContext.js";

export const useFetchStateContext = () => useContext(FetchStateContext);
