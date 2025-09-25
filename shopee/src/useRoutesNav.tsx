import { useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginLayout from "./layout/LoginLayout";
const useRoutesNav = () => {
  const NavLink = useRoutes([
    { path: "/", element: <ProductList /> },
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
