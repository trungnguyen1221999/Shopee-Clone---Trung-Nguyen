import { Navigate, Outlet, useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginLayout from "./layout/LoginLayout";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/profile/Profile";
const useRoutesNav = () => {
  const isLogin = false;
  const protectedRoute = () => {
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
  };
  const rejectedRoute = () => {
    return !isLogin ? <Outlet /> : <Navigate to="/" />;
  };
  const NavLink = useRoutes([
    {
      path: "",

      element: protectedRoute(),
      children: [
        {
          path: "/",
          index: true,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          ),
        },
        {
          path: "profile",
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: rejectedRoute(),
      children: [
        {
          path: "login",
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          ),
        },
        {
          path: "register",
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
