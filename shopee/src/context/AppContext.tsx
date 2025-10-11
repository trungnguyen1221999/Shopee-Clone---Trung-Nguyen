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
interface PurchaseItem {
  _id: string;
  product: any;
  buy_count: number;
  isChecked: boolean;
  isDisabled: boolean;
}
type AppContextType = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  profile: User | null;
  setProfile: Dispatch<SetStateAction<User | null>>;
  extendedPurchaseInCart: PurchaseItem[];
  setExtendedPurchaseInCart: Dispatch<SetStateAction<PurchaseItem[]>>;
};

const initialAppContext: AppContextType = {
  isLogin: Boolean(getAccessTokenFromLocalStorage()),
  setIsLogin: () => null,
  setProfile: () => null,
  profile: getProfileFromLocalStorage() as User | null,
  extendedPurchaseInCart: [],
  setExtendedPurchaseInCart: () => null,
};

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(initialAppContext.isLogin);
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );
  const [extendedPurchaseInCart, setExtendedPurchaseInCart] = useState<
    PurchaseItem[]
  >([]);
  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        profile,
        setProfile,
        extendedPurchaseInCart,
        setExtendedPurchaseInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
