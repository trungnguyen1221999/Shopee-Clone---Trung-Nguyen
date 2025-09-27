import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginSchema, type LoginSchemaType } from "../../untils/rules";
// import { LoginRules } from "../../untils/rules";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormProps = LoginSchemaType;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({ resolver: yupResolver(LoginSchema) });
  const onSubmit = handleSubmit((data: LoginFormProps) => {});
  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <Title>Log In</Title>

        <InputWrapper>
          <Input type="text" placeholder="Email" {...register("email")} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="Password"
            autoComplete="on"
            {...register("password")}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputWrapper>

        <Button>Log in</Button>
        <ForgotPassword to="/">Forgot Password?</ForgotPassword>

        <Divider>OR</Divider>

        <SocialButtons>
          <SocialButton bg="#3b5998">Facebook</SocialButton>
          <SocialButton bg="#db4437">Google</SocialButton>
        </SocialButtons>

        <RegisterBox>
          <p>
            New to Shopee?
            <RegisterLink to="/register">Sign Up</RegisterLink>
          </p>
        </RegisterBox>
      </Form>
    </Wrap>
  );
};

export default LoginForm;

// Styled Components

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 3rem;
  border-radius: 1rem;
  width: 50rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 40rem;
  background-color: #fff;
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 400;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #bdbdbd;
  border-radius: 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: #bdbdbd;
    opacity: 1;
  }
`;

const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: red;
  margin-top: 0.4rem;
  min-height: 0.8rem;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ForgotPassword = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: ${({ theme }) => theme.fontSizes.small};
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  &::before {
    margin-right: 0.8rem;
  }
  &::after {
    margin-left: 0.8rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialButton = styled(Button)<{ bg: string }>`
  background-color: ${({ bg }) => bg};
`;

const RegisterBox = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  p {
    color: #bdbdbd;
  }
`;

const RegisterLink = styled(Link)`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;
