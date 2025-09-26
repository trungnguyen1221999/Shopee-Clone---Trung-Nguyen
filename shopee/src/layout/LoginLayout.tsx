interface LoginPropType {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginPropType) => {
  return <div>{children}</div>;
};

export default LoginLayout;
