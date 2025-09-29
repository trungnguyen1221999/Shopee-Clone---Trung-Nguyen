interface MainLayoutType {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutType) => {
  return (
    <div>
      {children}
      mainlayout
    </div>
  );
};

export default MainLayout;
