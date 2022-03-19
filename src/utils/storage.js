export const storage = {
  // AUTH TOKEN
  setAuthToken: str => localStorage.setItem(AUTH_TOKEN_KEY, str),
  getAuthToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
  removeAuthToken: () => localStorage.removeItem(AUTH_TOKEN_KEY)
};

const AUTH_TOKEN_KEY = "@authToken";
