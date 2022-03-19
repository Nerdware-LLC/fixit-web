import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const searchParamEntries = searchParams.entries();
  let queryParams = {};

  for (let entry of searchParamEntries) {
    queryParams[entry[0]] = entry[1];
  }

  return { ...queryParams };
};
