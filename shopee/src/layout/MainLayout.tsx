import Header from "../components/Header";

interface MainLayoutType {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutType) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
