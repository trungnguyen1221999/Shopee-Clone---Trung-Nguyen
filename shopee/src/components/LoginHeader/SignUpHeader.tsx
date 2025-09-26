import { Link } from "react-router-dom";
import Logo from "../Logo";
import styled from "styled-components";
import { StyledContainer } from "../Container/Container";

const SigUpHeader = () => {
  return (
    <HeaderWrapper>
      <StyledContainer>
        <FlexBox>
          <Logo />
          <LoginText>Sign up</LoginText>
        </FlexBox>
        <StyledLink to="/">Need help?</StyledLink>
      </StyledContainer>
    </HeaderWrapper>
  );
};

export default SigUpHeader;

const HeaderWrapper = styled.header`
  padding: 1rem 0;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

const LoginText = styled.h1`
  margin: 0;
  font-weight: 400;
  transform: translateY(0.3rem);
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
`;
