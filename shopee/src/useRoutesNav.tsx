import { useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginLayout from "./layout/LoginLayout";
import MainLayout from "./layout/MainLayout";
const useRoutesNav = () => {
  const NavLink = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <LoginLayout>
          <Login />
        </LoginLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <LoginLayout>
          <SignUp />
        </LoginLayout>
      ),
    },
  ]);
  return NavLink;
};

export default useRoutesNav;
