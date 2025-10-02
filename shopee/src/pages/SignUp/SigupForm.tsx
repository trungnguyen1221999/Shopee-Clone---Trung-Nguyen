import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";

// import { yupResolver } from "./../../../node_modules/@hookform/resolvers/yup/src/yup";
import { RegisterSchema, type RegisterSchemaType } from "../../untils/rules";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../apis/register.api";
import { omit } from "lodash";
import type { ErrorResponse } from "../../types/auth.type";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

type DataType = RegisterSchemaType;
const SigupForm = () => {
  const { setIsLogin } = useContext(AppContext);
  const toHomePage = useNavigate();

  const {
    register,
    handleSubmit,
    // getValues,
    setError,
    formState: { errors },
  } = useForm<DataType>({ resolver: yupResolver(RegisterSchema) });

  const registerMutation = useMutation({
    mutationFn: (body: Omit<DataType, "confirmation_password">) => {
      return registerApi(body);
    },
  });
  const onSubmit = (data: DataType) => {
    const body = omit(data, ["confirmation_password"]);
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Register successful!");
        setIsLogin(true);
        toHomePage("/");
      },
      onError: (error) => {
        // const err = error as unknown as ErrorResponse;
        // if (err.status === 422) {
        //   return setError("email", {
        //     message: err.response?.data?.data?.email,
        //   });
        // }
        const formError = (error as unknown as ErrorResponse).response?.data
          ?.data;
        if ((error as unknown as ErrorResponse).status === 422 && formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof DataType, {
              message: formError[key as keyof typeof formError],
            });
          });
        }
      },
    });
  };
  // const getPassword = () => getValues("password");
  return (
    <Wrap>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign Up</Title>

        <InputWrapper>
          <Input type="text" placeholder="Email" {...register("email")} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="Confirmation Password"
            {...register("confirmation_password")}
          />
          <ErrorMessage>{errors.confirmation_password?.message}</ErrorMessage>
        </InputWrapper>

        {!registerMutation.isPending && <Button> Register </Button>}
        {registerMutation.isPending && (
          <LoadingButton disabled> Loading... </LoadingButton>
        )}
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
  min-height: 0.8rem;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const LoadingButton = styled(Button)`
  opacity: 0.3;
  cursor: not-allowed;
`;
