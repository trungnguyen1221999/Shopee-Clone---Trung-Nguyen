import CartHeader from "../components/CartHeader/CartHeader";

interface MainLayoutType {
  children: React.ReactNode;
}

const CartLayout = ({ children }: MainLayoutType) => {
  return (
    <div>
      <CartHeader />
      {children}
    </div>
  );
};

export default CartLayout;
