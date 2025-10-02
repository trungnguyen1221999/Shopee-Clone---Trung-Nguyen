import { createContext, useState } from "react";
import { getAccessTokenFromLocalStorage } from "../untils/auth.api";

type AppContextType = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

const initialAppContext: AppContextType = {
  isLogin: Boolean(getAccessTokenFromLocalStorage()),
  setIsLogin: () => null,
};
export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(initialAppContext.isLogin);
  return (
    <AppContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AppContext.Provider>
  );
};
