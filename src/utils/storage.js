const _AUTH_TOKEN_KEY = "@authToken";

export const storage = {
  // AUTH TOKEN
  setAuthToken: str => localStorage.setItem(_AUTH_TOKEN_KEY, str),
  getAuthToken: () => localStorage.getItem(_AUTH_TOKEN_KEY),
  removeAuthToken: () => localStorage.removeItem(_AUTH_TOKEN_KEY)
};
