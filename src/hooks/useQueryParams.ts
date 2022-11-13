import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const urlSearchParams = new URLSearchParams(useLocation().search);

  return Object.fromEntries(urlSearchParams.entries());
};
