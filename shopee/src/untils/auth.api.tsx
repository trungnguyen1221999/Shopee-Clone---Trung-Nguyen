import type { User } from "../types/user.type";

export const saveAccessTokenToLocalStorage = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token") || "";
};

export const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
};

export const saveProfileToLocalStorage = (profile: User) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfileFromLocalStorage = (): User | null => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    return JSON.parse(profile);
  }
  return null;
};
