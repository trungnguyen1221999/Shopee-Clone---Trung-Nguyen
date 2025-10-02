import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  getAccessTokenFromLocalStorage,
  getProfileFromLocalStorage,
} from "../untils/auth.api";
import type { User } from "../types/user.type";

type AppContextType = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  profile: User | null;
  setProfile: Dispatch<SetStateAction<User | null>>;
};

const initialAppContext: AppContextType = {
  isLogin: Boolean(getAccessTokenFromLocalStorage()),
  setIsLogin: () => null,
  setProfile: () => null,
  profile: getProfileFromLocalStorage() as User | null,
};
export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(initialAppContext.isLogin);
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );
  return (
    <AppContext.Provider value={{ isLogin, setIsLogin, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  );
};
