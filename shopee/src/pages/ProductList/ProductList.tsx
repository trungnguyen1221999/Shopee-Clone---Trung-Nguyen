import styled from "styled-components";
import Container from "../../components/Container";
import ProductCart from "../../components/ProductCard/ProductCart";
import LeftFilter from "./LeftFilter/LeftFilter";
import TopFiler from "./TopFilter/TopFiler";

const ProductList = () => {
  return (
    <StyledContainer>
      <Wrapper>
        <LeftFilterWrapper>
          <LeftFilter />
        </LeftFilterWrapper>
        <RightSide>
          <TopFiler />
          <ProductGrid>
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <ProductCart key={index} />
              ))}
          </ProductGrid>
        </RightSide>
      </Wrapper>
    </StyledContainer>
  );
};

export default ProductList;

const StyledContainer = styled(Container)`
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
`;

const LeftFilterWrapper = styled.div`
  grid-column: span 2; /* LeftFilter chiếm 2/12 */
`;

const RightSide = styled.div`
  grid-column: span 10; /* Right chiếm 10/12 */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* mobile: 2 cột */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* tablet: 4 cột */
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(5, 1fr); /* desktop lớn: 5 cột */
  }
`;
