interface LoginPropType {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginPropType) => {
  return (
    <div>
      LoginLayout
      {children}
    </div>
  );
};

export default LoginLayout;
