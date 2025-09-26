import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import rules from "../../untils/rules";
interface DataType {
  email: string;
  password: string;
  confirmation_password: string;
}
const SigupForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<DataType>();
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
  });
  const getPassword = () => getValues("password");
  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <Title>Sign Up</Title>

        <InputWrapper>
          <Input
            type="text"
            placeholder="Email"
            {...register("email", rules.email)}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", rules.password)}
          />

          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="Confirmation Password"
            {...register(
              "confirmation_password",
              rules.confirmation_password(getPassword)
            )}
          />
          <ErrorMessage>{errors.confirmation_password?.message}</ErrorMessage>
        </InputWrapper>

        <Button type="submit">Sign up</Button>
        <ForgotPassword to="/">Forgot Password?</ForgotPassword>

        <Divider>OR</Divider>

        <SocialButtons>
          <SocialButton bg="#3b5998">Facebook</SocialButton>
          <SocialButton bg="#db4437">Google</SocialButton>
        </SocialButtons>
        <Agreement>
          <p>By signing up, you agree to Shopee's</p>
          <span>
            <Link to="/">Terms of Service</Link>&
            <Link to="/">Privacy Policy</Link>
          </span>
        </Agreement>

        <RegisterBox>
          <p>
            Have an account?
            <RegisterLink to="/login">Log In</RegisterLink>
          </p>
        </RegisterBox>
      </Form>
    </Wrap>
  );
};

export default SigupForm;

// Wrap container: căn giữa form trong container cha
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  border-radius: 1rem;
  width: 50rem;
`;

// Form chính
const Form = styled.form`
  width: 100%;
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
const Agreement = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};

  p {
    margin-bottom: 0.5rem;
  }

  span {
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
      margin: 0 0.3rem;
      &:hover {
        opacity: 0.8;
      }
    }
    &::before {
      content: "";
      margin-right: 0.2rem;
    }
    &::after {
      content: "";
      margin-left: 0.2rem;
    }
  }
`;
const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: red;
  margin-top: 0.4rem;
  height: 1.2rem; /* giữ khoảng trống dù không có lỗi */
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
