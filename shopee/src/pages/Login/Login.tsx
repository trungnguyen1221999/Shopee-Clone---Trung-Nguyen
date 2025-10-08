import styled from "styled-components";
import { StyledContainer } from "../../components/Container/Container";
import LoginHeader from "../../components/LoginHeader";
import LoginForm from "./LoginForm";
import heroImage from "./hero.png"; // đường dẫn đúng tới file

const Login = () => {
  return (
    <div>
      <LoginHeader />
      <StyledHero>
        <Container>
          <img src={heroImage} alt="herobanner" />
          <LoginForm />
        </Container>
      </StyledHero>
    </div>
  );
};

export default Login;

const StyledHero = styled.div`
  background-color: #c70400;
  margin: 1rem 0 6rem;
  width: 100%;
`;

const Container = styled(StyledContainer)`
  padding: 0 8rem;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  background-color: #c70400;
`;
