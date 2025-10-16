import { FaRegUser } from "react-icons/fa6";
import styled from "styled-components";

const Profile = () => {
  return (
    <ProfileContainer>
      <Header>
        <h3>my profile</h3>
        <p>Manage and protect your account</p>
      </Header>

      <Content>
        <Form>
          <InputContainer>
            <p>Username</p>
            <input type="text" placeholder="abc" />
          </InputContainer>
          <InputContainer>
            <p>Name</p>
            <input type="text" placeholder="bcc" />
          </InputContainer>
          <InputContainer>
            <p>Email</p>
            <p>tr*************@gmail.com</p>
          </InputContainer>
          <InputContainer>
            <p>Phone Number</p>
            <input type="number" />
          </InputContainer>
          <InputContainer>
            <p>Address</p>
            <input type="text" />
          </InputContainer>
          <BirthDayContainer>
            <p>Date of birth</p>
            <DateForm>
              <select name="date">
                <option value="">1</option>
              </select>
              <select name="month">
                <option value="">1</option>
              </select>
              <select name="year">
                <option value="">1990</option>
              </select>
            </DateForm>
          </BirthDayContainer>
          <ButtonCotainer>
            <div></div>
            <button>Save</button>
          </ButtonCotainer>
        </Form>

        <AvatarSection>
          <div className="avatar">
            <FaRegUser />
          </div>
          <button>Select Image</button>
          <input type="file" accept=".jpg,.jpeg,.png" hidden />
          <div>
            <p>File size: maximum 1 MB</p>
            <p>File extension: .JPEG, .PNG</p>
          </div>
        </AvatarSection>
      </Content>
    </ProfileContainer>
  );
};

export default Profile;
const ProfileContainer = styled.div`
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

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Form = styled.form`
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    font-size: 14px;
    color: #444;
    margin: 0;
    width: 20%;
  }
  input {
    flex: 1;
  }
  input,
  select {
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
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
  }
`;

const AvatarSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-left: 1px solid #eee;
  padding-left: 32px;
  .avatar {
    border: 1px solid #999;
    padding: 1rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f4f4f4;
  }
  @media (max-width: 768px) {
    border-left: none;
    padding-left: 0;
    margin: 0 auto;
    margin-top: 1rem;
  }

  svg {
    font-size: 80px;
    color: #999;
    padding: 20px;
  }

  button {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: 500;
    color: #333;
    background-color: transparent;
    margin: 0 auto;
    margin-top: 1rem;
    &:hover {
      opacity: 0.9;
    }
  }

  div {
    p {
      color: #777;
      font-size: 1.25rem;
      margin: 4px 0;
    }
  }
`;
const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const BirthDayContainer = styled.div`
  display: flex;
  gap: 1rem;
  p {
    width: 20%;
  }
`;
const DateForm = styled.div`
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 1rem;
`;
const ButtonCotainer = styled.div`
  display: flex;
  gap: 1rem;
  div {
    width: 20%;
  }
`;
