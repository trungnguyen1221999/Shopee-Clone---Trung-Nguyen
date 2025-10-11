import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Container>
      <Header>
        <h3>Set Password</h3>
        <p>
          For your account's security, do not share your password with anyone
          else
        </p>
      </Header>

      <Form>
        <Field>
          <p>New Password</p>
          <InputWrapper>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
            />
            <EyeIcon onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputWrapper>
        </Field>

        <Field>
          <p>Confirm Password</p>
          <InputWrapper>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
            />
            <EyeIcon onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputWrapper>
        </Field>

        <ButtonContainer>
          <div></div>
          <Button>Confirm</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default ChangePassword;

//
// ------------------ styled-components ------------------
//
const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  h3 {
    text-transform: capitalize;
    font-size: 20px;
    margin-bottom: 6px;
    color: #222;
  }

  p {
    color: #777;
    font-size: 14px;
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  margin: 0 auto;
  margin-top: 3rem;
`;

const Field = styled.div`
  display: flex;
  gap: 1rem;

  p {
    width: 30%;
    font-size: 14px;
    color: #444;
    margin: 0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  input {
    width: 100%;
    padding: 10px 40px 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 12px;
  color: #777;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    opacity: 0.9;
  }
`;

const Button = styled.button`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  div {
    width: 30%;
  }
`;
