export const saveAccessTokenToLocalStorage = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token") || "";
};

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token");
};
