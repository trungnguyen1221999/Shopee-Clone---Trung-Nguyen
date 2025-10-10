import { Navigate, Outlet, useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginLayout from "./layout/LoginLayout";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import PATH_CONST from "./Constant/Path.Const";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CartPage from "./pages/CartPage/CartPage";
import CartLayout from "./layout/CartLayOut";
const useRoutesNav = () => {
  const { isLogin } = useContext(AppContext);
  const protectedRoute = () => {
    return isLogin ? <Outlet /> : <Navigate to={PATH_CONST.LOGIN} />;
  };
  const rejectedRoute = () => {
    return !isLogin ? <Outlet /> : <Navigate to={PATH_CONST.HOME} />;
  };
  const NavLink = useRoutes([
    {
      path: "",

      element: protectedRoute(),
      children: [
        {
          path: PATH_CONST.HOME,
          index: true,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          ),
        },
        {
          path: PATH_CONST.PROFILE,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
        {
          path: PATH_CONST.PRODUCT,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          ),
        },
        {
          path: PATH_CONST.CART,
          element: (
            <CartLayout>
              <CartPage />
            </CartLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: rejectedRoute(),
      children: [
        {
          path: PATH_CONST.LOGIN,
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          ),
        },
        {
          path: PATH_CONST.REGISTER,
          element: (
            <LoginLayout>
              <SignUp />
            </LoginLayout>
          ),
        },
      ],
    },
  ]);

  return NavLink;
};

export default useRoutesNav;
