import styled from "styled-components";
import heroImage from "../Login/hero.png"; // đường dẫn đúng tới file
import { StyledContainer } from "../../components/Container/Container";
import SigupForm from "./SigupForm";
import SigUpHeader from "../../components/LoginHeader/SignUpHeader";

const SignUp = () => {
  return (
    <div>
      <SigUpHeader />
      <StyledHero>
        <Container>
          <img src={heroImage} alt="herobanner" />
          <SigupForm />
        </Container>
      </StyledHero>
    </div>
  );
};

export default SignUp;
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
